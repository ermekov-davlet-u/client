import React, { ChangeEvent, useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import UXSelect from "../Select/index"
import { useAppSelector } from '../../store/hook';
import { ActionMeta, SingleValue } from 'react-select';
import { IUniversalSelectType } from '../../store/models/directory';
import { useEffect, useRef } from 'react';
import { queryServer } from '../../hooks/fetch';
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import "../../utils/i18next" 
import { IDiplom } from './../../store/models/student';

type TableElemPropType = {
    num: number
    diplom: IDiplom
}
type FormType = {
    num: number;
    name: string;
    seria: string;
    number: number;
    regNumber: number;
    gakDate: Date | null;
    kvalification: number;
    exalend: boolean;
    uDate: Date | null;
    theme: string;
}

function TableElemDiplom( {
    num,
    diplom
}: TableElemPropType ) {

    const { kvalification } = useAppSelector(state => state.kvalification)
    const { canChangeDopusk } = useAppSelector(state => state.studentGrade)
    const oldBallRef = useRef<any>(0)
    const oldThemeRef = useRef<string>("")
    const [ diplomForm, setdiplomForm ] = useState<FormType>({
        num: num,
        name: diplom.s_fio,
        seria: diplom.seria || "",
        number: diplom?.number || 0,
        regNumber: diplom?.regnumber || 0,
        gakDate: diplom.dataDecisionGAK? new Date(diplom.dataDecisionGAK) : null,
        kvalification: diplom.id_diploma_kval || 0,
        exalend: diplom.excellent,
        uDate: diplom.dateGive? new Date(diplom.dateGive) : null,
        theme: diplom?.themeVKR || ''
    })

    useEffect(() => {
        setdiplomForm({
            num: num,
            name: diplom.s_fio,
            seria: diplom.seria || "",
            number: diplom?.number || 0,
            regNumber: diplom?.regnumber || 0,
            gakDate: diplom.dataDecisionGAK? new Date(diplom.dataDecisionGAK) : null ,
            kvalification: diplom.id_diploma_kval || 0,
            exalend: diplom.excellent,
            uDate: diplom.dateGive? new Date(diplom.dateGive) : null,
            theme: diplom?.themeVKR || ''
        })
    }, [diplom.id_diplom])


    return ( 
        <>
             <div className={classNames(classes.table_row, classes.diplom_row)}>
                <div className={classNames(classes.table_item, classes.table_item_num)} >
                    {
                        diplomForm.num
                    }
                </div>
                <div className={classNames(classes.table_item, classes.table_item_logname)}>
                    {
                        diplomForm.name
                    }
                </div>
                <div className={classNames(classes.table_item, classes.table_item_journal)}>
                <input type="text" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => {
                        setdiplomForm({
                            ...diplomForm,
                            seria: String(e.target.value)
                        })
                    }} onBlur={async(e) => {
                        if( Number(e.target.value) == oldBallRef.current ) return;
                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_seria&newval=${e.target.value}&begval=${oldBallRef.current}`)
                        if(res.result){
                            setdiplomForm({
                                ...diplomForm,
                                seria: String(e.target.value)
                            })
                            oldBallRef.current = Number(e.target.value)
                        }else{
                            setdiplomForm({
                                ...diplomForm,
                                seria: oldBallRef.current
                            })
                        }
                    }} onFocus={(e: ChangeEvent<HTMLInputElement>) => {
                        oldBallRef.current = Number(e.target.value)
                    }} className={classNames(classes.regnumber)} value={
                        diplomForm.seria
                    } />
                </div>
                <div className={classNames(classes.table_item, classes.table_item_journal)}>
                <input type="number" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => {
                        setdiplomForm({
                            ...diplomForm,
                            number: Number(e.target.value)
                        })
                    }} onBlur={async(e) => {
                        if( Number(e.target.value) == oldBallRef.current ) return;
                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_number&newval=${e.target.value}&begval=${oldBallRef.current}`)
                        if(res.result){
                            setdiplomForm({  
                                ...diplomForm,
                                number: Number(e.target.value)
                            })
                            oldBallRef.current = Number(e.target.value)
                        }else{
                            setdiplomForm({
                                ...diplomForm,
                                number: oldBallRef.current
                            })
                        }
                    }} onFocus={(e: ChangeEvent<HTMLInputElement>) => {
                        oldBallRef.current = Number(e.target.value)
                    }} className={classNames(classes.regnumber)} value={
                        diplomForm.number
                    } />
                </div>
                <div className={classNames(classes.table_item, classes.table_item_journal)}>
                    <input type="number" min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => {
                            setdiplomForm({
                                ...diplomForm,
                                regNumber: Number(e.target.value)
                            })
                        }} onBlur={async(e) => {
                            if( Number(e.target.value) == oldBallRef.current ) return;
                            const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_regnumber&newval=${e.target.value}&begval=${oldBallRef.current}`)
                            if(res.result){
                                setdiplomForm({
                                    ...diplomForm,
                                    regNumber: Number(e.target.value)
                                })
                                oldBallRef.current = Number(e.target.value)
                            }else{
                                setdiplomForm({
                                    ...diplomForm,
                                    regNumber: oldBallRef.current
                                })
                            }
                        }} onFocus={(e: ChangeEvent<HTMLInputElement>) => {
                            oldBallRef.current = Number(e.target.value)
                        }} className={classNames(classes.regnumber)} value={
                            diplomForm.regNumber
                        } />
                </div>
                <div className={classNames(classes.table_item, classes.table_item_date)}>
                    <DatePicker disabled={false} dateFormat={"dd-MM-yyyy"} className={classes.date_picker} selected={diplomForm.gakDate} onChange={ async (date:Date) => {
                        const newDate = dayjs(date).format('YYYY-MM-D')
                        const oldDate = dayjs(diplomForm.gakDate).format('YYYY-MM-D')
                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_dataDecisionGAK&newval=${newDate}&begval=${oldDate}`)
                        if( true ){
                            setdiplomForm({
                                ...diplomForm,
                                gakDate: date
                            })
                        }
                    }} />
                </div>
                <div className={classNames(classes.table_item, classes.table_item_name)}>
                    {
                        <UXSelect dsbl={true} options={kvalification} value={kvalification.find(r => r.value == diplomForm.kvalification )!} hundleChange={async (newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                            const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_id_diploma_kval&newval=${newValue?.value || ""}&begval=${diplomForm.kvalification}`)
                            if( res.result){
                                setdiplomForm({
                                    ...diplomForm,
                                    kvalification: newValue!.value
                                })
                            }
                        }}/>
                    }
                </div>
                <div className={classNames(classes.table_item, classes.table_item_journal)}>
                    <input type="checkbox" checked={diplomForm.exalend} onChange={async(e: ChangeEvent<HTMLInputElement>) => {
                        if( e.target.checked ){
                            const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_excellent&newval=${true}&begval=${false}`)
                            if( res.result){
                                setdiplomForm({
                                    ...diplomForm,
                                    exalend: true
                                })
                            }
                        }else{
                            const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_excellent&newval=${false}&begval=${true}`)
                            if( res.result){
                                setdiplomForm({
                                    ...diplomForm,
                                    exalend: false
                                })
                            }
                        }
                    }}/>
                </div>
                <div className={classNames(classes.table_item, classes.table_item_date)}>
                    <DatePicker disabled={false} dateFormat={"dd-MM-yyyy"} className={classes.date_picker} selected={diplomForm.uDate} onChange={ async (date:Date) => {
                        const newDate = dayjs(date).format('YYYY-MM-D')
                        const oldDate = dayjs(diplomForm.uDate).format('YYYY-MM-D')
                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_dateGive&newval=${newDate}&begval=${oldDate}`)
                        if( res.result ){
                            setdiplomForm({
                                ...diplomForm,
                                uDate: date
                            })
                        }
                    }} />
                </div>
                <div className={classNames(classes.table_item, classes.table_item_logname)}>
                    <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setdiplomForm({
                            ...diplomForm,
                            theme: String(e.target.value)
                            })
                        }} onBlur={async(e) => {
                        if( e.target.value == oldThemeRef.current ) return;
                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/AddDiplom/updateDiplom?ddkey=${diplom.id_diplom}_themeVKR&newval=${e.target.value}&begval=${oldThemeRef.current}`)
                        if(res.result){
                            setdiplomForm({
                                ...diplomForm,
                                theme: String(e.target.value)
                            })
                            oldThemeRef.current = String(e.target.value)
                        }else{
                            setdiplomForm({
                                ...diplomForm,
                                theme: oldThemeRef.current
                            })
                        }
                        }} onFocus={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        oldThemeRef.current = String(e.target.value)
                        }} className={classes.theme} value={
                        diplomForm.theme
                    } />
                </div>
            </div>
        </>
     );
}

export default TableElemDiplom;