import React, {  } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import "react-datepicker/dist/react-datepicker.css";
import "../../utils/i18next" 
import { IJournal } from '../../store/models/student';

type TableElemPropType = {
    num: number
    journal: IJournal
}


function TableJounalElem( {
    num,
    journal
}: TableElemPropType ) {

   



    return ( 
        <>
             <div className={classNames(classes.table_row)}>
                    <div className={classNames(classes.table_item, classes.table_item_num)}>№</div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>
                        {
                            journal.p20
                        }
                    </div>
                    <div className={classNames(classes.table_item, classes.table_item_name)}>
                        {
                            journal.p108
                        }
                    </div>
                    <div className={classNames(classes.table_item, classes.table_item_journal)}>
                        {
                            journal.id_ebe_var
                        }
                    </div>
                    <div className={classNames(classes.table_item, classes.table_item_date)}>
                        {
                            journal.name_pole
                        }
                    </div>
                    <div className={classNames(classes.table_item, classes.table_item_date)}>
                        {
                            new Date(journal.beg_date).toLocaleDateString()
                        }
                    </div>
                    <div className={classNames(classes.table_item, classes.table_item_grade)}>
                        {
                            new Date(journal.end_date).toLocaleDateString()
                        }
                    </div>
                    <div className={classNames(classes.table_item, classes.table_item_special)}>
                        {
                            new Date(journal.AVN_update).toLocaleString()
                        }
                    </div>
            </div>
        </>
     );
}

export default TableJounalElem;