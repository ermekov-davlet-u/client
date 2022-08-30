import React, { useEffect, useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import { useAppSelector } from '../../store/hook';
import StudGradeTableElem from './StudGradeTableElem';
import useDirectory from './../../service/redux/directory';
import { useAppDispatch } from './../../store/hook';
import { newStudentMarks } from '../../store/slice/studentMark';


function StudGradeTable() {

    const student = useAppSelector(state => state.studentMarks)
    const dispatch = useAppDispatch()
    const { setNewSemesters, setNewStatement, setNewEe } = useDirectory() 
    const [modal, setModal] = useState<{
        show: boolean, 
        idMark: number
    }>({
        show: false, 
        idMark: 0
    })

    function closeModal(){
        setModal({
            show: false,
            idMark: 0
        })
    }

    useEffect(() => {
        setNewSemesters()
        setNewStatement()
        setNewEe()
        return () =>{
            dispatch(newStudentMarks([]))
        }
    }, [])
    

    return ( 
        <>
        {/* <ModalDelete show={modal.show} actionFunc={delMark} close={closeModal} /> */}
            <section className={classes.main_wrap}>
                <div className={classes.container}>
                    <div className={classNames(classes.table_row, classes.table_headers, classes.table_row_gradestud)}>
                        <div className={classes.table_item}>№</div>
                        <div className={classes.table_item}>Семестр</div>
                        <div className={classes.table_item}>Дисциплина</div>
                        <div className={classes.table_item}>Форма контроля</div>
                        <div className={classes.table_item}>Кредиты</div>
                        <div className={classes.table_item}>Балл</div>
                        <div className={classes.table_item}>Оценка</div>
                        <div className={classes.table_item}>Форма ведомости</div>
                        <div className={classes.table_item}>Дата сдачи</div>
                        <div className={classes.table_item}>Удалить</div>
                    </div>
                    {
                        student.students.map((mark, i) =>{
                            return(
                                <StudGradeTableElem
                                    key={mark.id_mark_mag}
                                    num = {++i}
                                    studGrade={mark}
                                />
                            )
                        })
                    }
                </div>
            </section>
        </>
     );
}

export default StudGradeTable;