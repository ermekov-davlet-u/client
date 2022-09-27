import React, { useEffect, useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import { useAppSelector } from '../../store/hook';
import TableElem from './TableElem';
import { useTranslation } from 'react-i18next';
// import "../../utils/i18next" 


function TableWrap() {

    const { marks, estConfig } = useAppSelector(state => state.studentGrade)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        return () => {}
    },[])
    

    return ( 
        <section className={classes.main_wrap}>
           
            <div className={classes.container}>
                <div className={classNames(classes.table_headers)}>
                    <div className={classNames(classes.table_item, classes.table_item_num)}>№</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>{ t("st:payment") }</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>Журнал</div>
                    <div className={classNames(classes.table_item, classes.table_item_name)}>Ф.И.О. студентов</div>
                    <div className={classNames(classes.table_item, classes.table_item_date)}>Преподаватель</div>
                    {
                        estConfig.map(config => {
                            return (
                                <div className={classNames(classes.table_item, classes.table_item_module)}>
                                    {
                                        config.name_pole
                                    }
                                </div>
                            )
                        })
                    }
                    <div className={classNames(classes.table_item, classes.table_item_date)}>Дата сдачи</div>
                    <div className={classNames(classes.table_item, classes.table_item_grade)}>Оценка</div>
                    <div className={classNames(classes.table_item, classes.table_item_special)}>Особая оценка</div>
                </div>
                {
                    marks.map((mark, i) =>{
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