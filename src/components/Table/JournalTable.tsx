import React, { useEffect, useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import { useAppSelector } from '../../store/hook';
import { useTranslation } from 'react-i18next';
import "../../utils/i18next" 
import TableJounalElem from './JournalTableItem';


function TableJournalWrap() {

    const { journal } = useAppSelector(state => state.journal)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        return () => {}
    },[])
    

    return ( 
        <section className={classes.main_wrap}>
            <div className={classes.container}>
                <div className={classNames(classes.table_headers)}>
                    <div className={classNames(classes.table_item, classes.table_item_num)}>№</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>Группа</div>
                    <div className={classNames(classes.table_item, classes.table_item_name)}>Форма обучения</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>Шкала оценок</div>
                    <div className={classNames(classes.table_item, classes.table_item_date)}>Поле ведомости</div>
                    <div className={classNames(classes.table_item, classes.table_item_date)}>Начальная точка	</div>
                    <div className={classNames(classes.table_item, classes.table_item_grade)}>Конечная точка</div>
                    <div className={classNames(classes.table_item, classes.table_item_special)}>Дата подсчета</div>
                </div>
                {
                    journal.map((journal, i) =>{
                        return(
                            <TableJounalElem
                                key={i}
                                num = {++i}
                                journal={journal}
                            />
                        )
                    })
                }
            </div>
        </section>
     );
}

export default TableJournalWrap;