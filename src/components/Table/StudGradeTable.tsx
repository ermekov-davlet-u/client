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

    useEffect(() => {
        setNewEe()
    }, [student.students])
    

    return ( 
        <>
        {/* <ModalDelete show={modal.show} actionFunc={delMark} close={closeModal} /> */}
            <section className={classes.main_wrap}>
                <div className={classes.container}>
                    <div className={classNames(classes.table_headers, classes.table_row_gradestud)}>
                        <div className={classNames(classes.table_item, classes.table_item_num)}>№</div>
                        <div className={classNames(classes.table_item, classes.table_item_special)}>Семестр</div>
                        <div className={classNames(classes.table_item, classes.table_item_logname)}>Дисциплина</div>
                        <div className={classNames(classes.table_item, classes.table_item_journal)}>Форма контроля</div>
                        <div className={classNames(classes.table_item, classes.table_item_module)}>Кредиты</div>
                        <div className={classNames(classes.table_item, classes.table_item_module)}>Балл</div>
                        <div className={classNames(classes.table_item, classes.table_item_pay)}>Оценка</div>
                        <div className={classNames(classes.table_item, classes.table_item_journal)}>Форма ведомости</div>
                        <div className={classNames(classes.table_item, classes.table_item_date)}>Дата сдачи</div>
                        <div className={classNames(classes.table_item, classes.del_btn)}>Удалить</div>
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