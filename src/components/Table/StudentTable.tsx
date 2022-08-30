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
                <div className={classNames(classes.table_row, classes.table_headers, classes.table_logpas_headers)}>
                    <div className={classes.table_item}>№</div>
                    <div className={classes.table_item}>П/П</div>
                    <div className={classes.table_item}>Шифр</div>
                    <div className={classes.table_item}>Ф.И.О. студента</div>
                    <div className={classes.table_item}>Логин</div>
                    <div className={classes.table_item}></div>
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