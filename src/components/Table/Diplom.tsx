import React, { useEffect, useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import { useAppSelector } from '../../store/hook';
import "../../utils/i18next" 
import TableElemDiplom from './TableElemDiplom';
import { useTranslation } from 'react-i18next';


function DiplomTable() {

    const marks = useAppSelector(state => state.diplom)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        return () => {}
    },[])
    

    return ( 
        <section className={classes.main_wrap}>
           
            <div className={classes.container}>
                <div className={classNames(classes.table_headers, classes.diplom_row)}>
                    <div className={classNames(classes.table_item, classes.table_item_num)}>№</div>
                    <div className={classNames(classes.table_item, classes.table_item_logname)}>ФИО выпускника</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>Серия диплома</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>Номер диплома</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>Регистрационный номер диплома</div>
                    <div className={classNames(classes.table_item, classes.table_item_date)}>Дата решения ГАК</div>
                    <div className={classNames(classes.table_item, classes.table_item_name)}>Квалификация</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>С отличием/без</div>
                    <div className={classNames(classes.table_item, classes.table_item_date)}>Дата выдачи</div>
                    <div className={classNames(classes.table_item, classes.table_item_logname)}>Тема ВКР / Диплома</div>
                </div>
                {
                    marks.diplom.map((mark, i) =>{
                        return(
                            <TableElemDiplom
                                key={mark.id_diplom}
                                num = {++i}
                                diplom={mark}
                            />
                        )
                    })
                }
            </div>
        </section>
     );
}

export default DiplomTable;