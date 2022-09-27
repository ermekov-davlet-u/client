import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import UXSelect from "../../components/Select";
import { useAppSelector } from '../../store/hook';
import classes from "./Selects.module.scss";
import { IDisciplinesType, IUniversalSelectType } from './../../store/models/directory';
import useStudQuery from '../../service/redux/main';
import ModalAddMark from './../../components/Modal/ModalAddMark';
import ModalAddEducPlan from './../../components/Modal/ModalAddEducPlan';
import { useAppDispatch } from './../../store/hook';
import { setLoading } from '../../store/slice/loadingSlice';
import { newStudentMarks } from '../../store/slice/studentMark';
import { IStudentGrade } from '../../store/models/student';



function SelectGrade() {

    const [ modalEducAdd, setModalEducAdd ] = useState<boolean>(false)
    const [student, setStudent] = useState<IUniversalSelectType>({
        value: 0,
        label: "Не выбрано"
    });
    const [semester, setSemester] = useState<IUniversalSelectType>({
        value: 0,
        label: "Все"
    });
    const { idGroup } = useAppSelector(state => state.students)
    const { students } = useAppSelector(state => state.students)
    const studMarks = useAppSelector(state => state.studentMarks)
    const { setNewMarksByStudent, setNewEducSh, setNewPhotoByStudent, getSemestersByStudent } = useStudQuery()
    const [ modal, setModal ] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    

    useEffect(() => {
        setStudent({
            value: 0,
            label: "Не выбрано"
        })

        return () => {
            setNewPhotoByStudent(0)
        }
    },[idGroup])

    return ( 
        <section className={classNames(classes.selects,  )}>
            <h2 className={classNames(classes.selects_title, classes.selects_title_notitle )}>
                Оброботка оценки студентов
            </h2>
            {/* <hr className={classNames(classes.selects_line,  )}/> */}
            <div className={classes.stud_mark}>
                <UXSelect dsbl={true} value={student} options={ students } hundleChange={async(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                    await dispatch(setLoading(true))
                    await setStudent(newValue!)
                    await setNewMarksByStudent(idGroup.value, newValue!.value)
                    await dispatch(setLoading(false))
                    await setNewPhotoByStudent(newValue!.value)
                    getSemestersByStudent(idGroup.value)
                }} />
                <UXSelect dsbl={!!student.value} value={semester} options={ studMarks.semesters } hundleChange={async(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                    await dispatch(setLoading(true))
                    await setNewMarksByStudent(idGroup.value, student.value, newValue!.value)
                    await dispatch(setLoading(false))
                    setSemester(newValue!)
                }} />
                <div className={classes.grade_btns}>
                    <button className={classes.add_btn} style={{ opacity: student.value }} disabled={!student.value} onClick={() => {
                        setModal(true)
                    }}>Добавить</button>
                    <button className={classes.add_btn} style={{ opacity: student.value }} disabled={!student.value} onClick={() => {
                        setNewEducSh(idGroup.value, student.value)
                        setModalEducAdd(true)
                    }}>Копировать дисциплины из учебного плана</button>
                </div>
                
                <ModalAddMark idGroup={idGroup.value} idStud={student.value} show={modal} close={() => {setModal(false)}} />
                <ModalAddEducPlan idGroup={idGroup.value} idStud={student.value} show={modalEducAdd} close={() => {setModalEducAdd(false)}}/>
            </div>
            <div className={classes.grade_color}>
                <div className={classes.mark_color}>
                    <div className={classNames(classes.color, classes.color_first)}>

                    </div>
                    <p className={classes.color_label}>
                        - По учебному плану
                    </p>
                </div>
                <div className={classes.mark_color}>
                    <div className={classNames(classes.color, classes.color_second)}>

                    </div>
                    <p className={classes.color_label}>
                        - Не по учебному плану
                    </p>
                </div>
                <div className={classes.mark_color}>
                    <div className={classNames(classes.color, classes.color_thrist)}>

                    </div>
                    <p className={classes.color_label}>
                        - Запись необходимо уточнить
                    </p>
                </div>
                <div className={classes.mark_color}>
                    <div className={classNames(classes.color, classes.color_fourst)}>

                    </div>
                    <p className={classes.color_label}>
                        - Дополнительный предмет
                    </p>
                </div>
            </div>
        </section>
     );
}

export default SelectGrade;