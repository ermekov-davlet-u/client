import React, { useEffect, useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import { useAppSelector } from '../../store/hook';
import UXSelect from "../Select/index"
import { IUniversalSelectType } from '../../store/models/directory';
import { ActionMeta, SingleValue } from 'react-select';
import TableElem from './TableElem';
import ModalAddstudByStatement from './../Modal/ModalAddstudByStatement';
import useStudQuery from '../../service/redux/main';
import { useTranslation } from 'react-i18next';
import "../../utils/i18next" 


function TableWrap() {

    const marks = useAppSelector(state => state.studentGrade)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        console.log(45984);
        
        return () => {}
    },[])
    
    const { setNewMarksByStudent } = useStudQuery()

    return ( 
        <section className={classes.main_wrap}>
           
            <div className={classes.container}>
                <div className={classNames(classes.table_row, classes.table_headers)}>
                    <div className={classes.table_item}>№</div>
                    <div className={classes.table_item}>{ t("st:payment") }</div>
                    <div className={classes.table_item}>Журнал</div>
                    <div className={classes.table_item}>Ф.И.О. студентов</div>
                    <div className={classes.table_item}>Преподаватель</div>
                    <div className={classes.table_item}>Дата сдачи</div>
                    <div className={classes.table_item}>Оценка</div>
                    <div className={classes.table_item}>Особая оценка</div>
                </div>
                {
                    marks.marks.map((mark, i) =>{
                        return(
                            <TableElem
                                key={mark.id_mark_mag}
                                num = {++i}
                                mark={mark}
                            />
                        )
                    })
                }
            </div>
        </section>
     );
}

export default TableWrap;