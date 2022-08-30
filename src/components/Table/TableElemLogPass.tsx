import React, { useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import { useAppSelector } from '../../store/hook';
import { IStundentLogPass, IUniversalSelectType } from '../../store/models/directory';
import { FiEdit } from "react-icons/fi"

import "react-datepicker/dist/react-datepicker.css";
import ModalLoginStud, { IFormStud } from './../Modal/ModalLoginStud';
import { queryServer } from '../../hooks/fetch';
import useStudQuery from '../../service/redux/main';

type TableElemPropType = {
    num: number
    stud: IStundentLogPass
}


function TableElemLogPass( {
    num,
    stud
}: TableElemPropType ) {

    const { setNewLoginPassStud } = useStudQuery()
    const { idGroup } = useAppSelector(state => state.students )
    const [modal, setModal] = useState<boolean>(false)
    async function delMark( form:  IFormStud){
        const res: {result: boolean} = await queryServer(`http://localhost:3113/avn13/api/AVN13/LoginPassStudent/updateLoginPassStudents?id_student=${stud.id_student}&login=${form.login}&password=${form.password}`)
        if(res.result){
            setNewLoginPassStud(idGroup.value)
        }
        setModal(false)
    }
    return ( 
        <>
            <ModalLoginStud name={stud.s_fio} login={stud.login} show={modal} actionFunc={delMark} close={()=>{
                setModal(false)
            }}/>
             <div className={classNames(classes.table_row, classes.stud_logpass)}>
                <div className={classes.table_item}>
                    {
                        num
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        num
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        stud.idid
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        stud.s_fio
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        stud.login
                    }
                </div>
                <div className={classNames(classes.del_btn, classes.table_item)} onClick={() => {
                    setModal(true)
                }}>
                    {
                        <FiEdit/>
                    }
                </div>
            </div>
        </>
     );
}

export default TableElemLogPass;