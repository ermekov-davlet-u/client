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



function SelectGrade() {

    const [ modalEducAdd, setModalEducAdd ] = useState<boolean>(false)
    const [student, setStudent] = useState<IUniversalSelectType>({
        value: 0,
        label: "No Selected"
    });
    const { idGroup } = useAppSelector(state => state.students)
    const { students } = useAppSelector(state => state.students)
    const { setNewMarksByStudent, setNewEducSh } = useStudQuery()
    const [ modal, setModal ] = useState<boolean>(false)

    useEffect(() => {
        setStudent({
            value: 0,
            label: "Не выбрано"
        })
    },[idGroup])

    return ( 
        <section className={classNames(classes.selects,  )}>
            <h2 className={classNames(classes.selects_title, classes.selects_title_notitle )}>
                Оброботка оценки студентов
            </h2>
            {/* <hr className={classNames(classes.selects_line,  )}/> */}
            <div className={classes.stud_mark}>
                <UXSelect dsbl={true} value={student} options={ students } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                    setStudent(newValue!)
                    setNewMarksByStudent(idGroup.value, newValue!.value)
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
        </section>
     );
}

export default SelectGrade;