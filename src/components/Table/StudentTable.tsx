import React from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import { useAppSelector } from '../../store/hook';
import TableElemLogPass from './TableElemLogPass';

function StudentTable() {

    const studLogPass = useAppSelector(state => state.studentLogPass)

    return ( 
        <section className={classNames(classes.main_wrap, classes.main_log_pass_wrap)}>
            <div className={classes.container}>
                <div className={classNames(classes.table_headers, classes.table_logpas_headers)}>
                    <div className={classNames(classes.table_item, classes.table_item_num)}>№</div>
                    <div className={classNames(classes.table_item, classes.table_item_num)}>П/П</div>
                    <div className={classNames(classes.table_item, classes.table_item_pay)}>Шифр</div>
                    <div className={classNames(classes.table_item, classes.table_item_logname)}>Ф.И.О. студента</div>
                    <div className={classNames(classes.table_item, classes.table_item_pay)}>Логин</div>
                    <div className={classNames(classes.table_item, classes.table_item_pay)}></div>
                </div>
                {
                    studLogPass.studs.map((mark, i) =>{
                        return(
                            <TableElemLogPass stud={mark} num={i} />
                        )
                    })
                }
            </div>
        </section>
     );
}

export default StudentTable;