import React, { useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import UXSelect from "../Select/index"
import { useAppSelector } from '../../store/hook';
import { ActionMeta, SingleValue } from 'react-select';
import { IUniversalSelectType } from '../../store/models/directory';
import { useEffect } from 'react';
import { queryServer } from '../../hooks/fetch';
import { IMarks } from './../../store/models/directory';
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import "../../utils/i18next" 

type TableElemPropType = {
    num: number
    mark: IMarks
}
type FormType = {
    num: number;
    dopusk: string;
    journal: string;
    studName: string;
    teacher: number;
    uDate: Date;
    grade: number;
    specialGrade: string;
}

function TableElem( {
    num,
    mark
}: TableElemPropType ) {

    const directory = useAppSelector(state => state.directory)
    const { canChangeDopusk } = useAppSelector(state => state.studentGrade)
    
    const [ markForm, setMarkForm ] = useState<FormType>({
        num: num,
        dopusk: mark.primech,
        journal: mark.primech,
        studName: mark.s_fio,
        teacher: mark.id_teacher,
        uDate: mark.u_date,
        grade: mark.id_estimation,
        specialGrade: ""
    })

    useEffect(() => {
        setMarkForm({
            num: num,
            dopusk: mark.primech,
            journal: mark.primech,
            studName: mark.s_fio,
            teacher: mark.id_teacher,
            uDate: mark.u_date,
            grade: mark.id_estimation,
            specialGrade: ""
        })
    }, [mark.id_teacher, mark.id_estimation])

    async function createNewMark (newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) {
        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${mark.id_mark_mag}_id_teacher&newval=${newValue!.value}&oldval=${markForm.teacher}`)
        if(res.result == true){
            setMarkForm({
                ...markForm,
                teacher: newValue!.value
            })
        }
    }

    return ( 
        <>
             <div className={classNames(classes.table_row)}>
                <div className={classes.table_item} onClick={() => {console.log(canChangeDopusk);
                }}>
                    {
                        markForm.num
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        markForm.dopusk
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        markForm.journal
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        markForm.studName
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        <UXSelect dsbl={canChangeDopusk} options={directory.rrnkPermis} value={directory.rrnkPermis.find(r => r.value == markForm.teacher)!} hundleChange={createNewMark} />
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        <DatePicker disabled={!canChangeDopusk} dateFormat={"dd-MM-yyyy"} className={classes.date_picker} selected={new Date(markForm.uDate)} onChange={ async (date:Date) => {
                            const newDate = dayjs(date).format('YYYY-MM-D')
                            const oldDate = dayjs(markForm.uDate).format('YYYY-MM-D')
                            const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${mark.id_mark_mag}_p36&newval=${newDate}&oldval=${oldDate}`)
                            if(res.result == true ){
                                setMarkForm({
                                    ...markForm,
                                    uDate: date
                                })
                            }
                    }} />
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        <UXSelect dsbl={canChangeDopusk} options={directory.grades} value={directory.grades.find(r => r.value == markForm.grade )!} hundleChange={async (newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                            const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${mark.id_mark_mag}_id_estimation&newval=${newValue!.value}&oldval=${markForm!.grade}`)
                            if(res.result == true){
                                setMarkForm({
                                    ...markForm,
                                    grade: newValue!.value
                                })
                            }
                        }}/>
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        markForm.specialGrade
                    }
                </div>
            </div>
        </>
     );
}

export default TableElem;