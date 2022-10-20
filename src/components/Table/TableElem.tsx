import React, { ChangeEvent, useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import UXSelect from "../Select/index"
import { useAppSelector } from '../../store/hook';
import { ActionMeta, SingleValue } from 'react-select';
import { FormType, IEstCinfig, IUniversalSelectType } from '../../store/models/directory';
import { useEffect, useRef } from 'react';
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

function TableElem( {
    num,
    mark
}: TableElemPropType ) {

    const directory = useAppSelector(state => state.directory)
    const { canChangeDopusk, estConfig, canaccessfest } = useAppSelector(state => state.studentGrade)
    const [ totalBall, setTotalBall ] = useState<number>(0)
    const oldBallRef = useRef<number>(0)
    const [ markForm, setMarkForm ] = useState<FormType>({
        num: num,
        dopusk: mark.primech,
        journal: mark.primech,
        studName: mark.s_fio,
        teacher: mark.id_teacher,
        uDate: mark.u_date,
        grade: mark.id_estimation,
        specialGrade: mark.estimation_other,
        m1: 0,
        m2: 0,
        m3: 0,
        m4: 0,
        m5: 0,
        m6: 0,
        m7: 0,
        m8: 0,
        m9: 0,
        m10: 0,
        m11: 0,
        m12: 0,
        dop: 0,
        dop2: 0,
        ball1: 0,
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
            specialGrade: mark.id_estimation_other,
            m1: mark.m1,
            m2: mark.m2,
            m3: mark.m3,
            m4: mark.m4,
            m5: mark.m5,
            m6: mark.m6,
            m7: mark.m7,
            m8: mark.m8,
            m9: mark.m9,
            m10: mark.m10,
            m11: mark.m11,
            m12: mark.m12,
            dop: mark.dop,
            dop2: mark.dop2,
            ball1: 0
        })
    }, [mark])

    async function createNewMark (newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) {
        const res = await queryServer<{result:boolean}>(
            `http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${mark.id_mark_mag}_id_teacher&newval=${newValue!.value}&oldval=${markForm.teacher}`)
        if(res.result == true){
            setMarkForm({
                ...markForm,
                teacher: newValue!.value
            })
        }
    }

    const dopusk: IUniversalSelectType[] = [
        {
            value: 0,
            label: "д"
        },
        {
            value: 1,
            label: "н/д"
        }
    ]

    const [grade, setGrade] = useState<IUniversalSelectType[]>([
        {
            value: 25,
            label: "н/п"
        }
    ])

    useEffect(() => {
        setGrade([
            directory.grades.find(r => r.value == markForm.grade )!,
            {
                value: 25,
                label: "н/п"
            }
        ])
    }, [totalBall])

    useEffect(() => {
        const aw: any = markForm
        const item = estConfig[estConfig.length - 1];
        const v: any[] = estConfig.map((item) => {
            return {
                name: item.pole_mark_mag,
                value: aw[item.pole_mark_mag]
            }
        })
        let ad = item?.formula
        if(ad){
            for (let i = 0; i < v.length - 1; i++) {
                if (v[i]) {
                    ad = ad.replace(v[i].name , v[i].value)
                }
            }
            setTotalBall(eval(ad));
        }
    }, [markForm])

    
    


    return ( 
        <>
             <div className={classNames(classes.table_row)} >
                <div className={classNames(classes.table_item, classes.table_item_num)} >
                    {
                        markForm.num
                    }
                </div>
                <div className={classNames(classes.table_item, classes.table_item_journal)}>
                    {
                        <UXSelect dsbl={canChangeDopusk} options={dopusk} value={dopusk.find(r => r.label == markForm.dopusk )!} hundleChange={async (newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                            const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${mark.id_mark_mag}_primech&newval=${newValue!.label}&oldval=${markForm!.dopusk}`)
                            if(res.result == true){
                                setMarkForm({
                                    ...markForm,
                                    dopusk: newValue!.label
                                })
                            }
                        }}/>
                    }
                </div>
                <div className={classNames(classes.table_item, classes.table_item_journal)}>
                    {
                        markForm.journal
                    }
                </div>
                <div className={classNames(classes.table_item, classes.table_item_name)}>
                    {
                        markForm.studName
                    }
                </div>
                <div className={classNames(classes.table_item, classes.table_item_date)}>
                    {
                        <UXSelect dsbl={markForm.grade !== 25 && (canaccessfest == 1)} options={directory.rrnkPermis} value={directory.rrnkPermis.find(r => r.value == markForm.teacher)!} hundleChange={createNewMark} />
                    }
                </div>
                {
                    estConfig.map((item: IEstCinfig, i) => {
                        if(i == estConfig.length - 1 || item.info_or_value == 0 && item?.formula) {
                            const aw: any = markForm
                            const v: any[] = estConfig.map((item) => {
                                return {
                                    name: item.pole_mark_mag,
                                    value: aw[item.pole_mark_mag]
                                }
                            })
                            let ad = item?.formula
                            for (let i = 0; i < v.length - 1; i++) {
                                if (v[i]) {
                                    ad = ad.replace(v[i].name , v[i].value)
                                }
                            }
                            return  <div key={item.id_est_config} className={classNames(classes.table_item, classes.table_item_module)}>
                                {
                                    totalBall
                                }
                            </div>
                        }
                        return <div key={item.id_est_config} className={classNames(classes.table_item, classes.table_item_module)}>
                            <input disabled={markForm.grade == 25 || !(canaccessfest == 1)} max={item.max} type="number" min={item.min} onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                if(Number(e.target.value) < oldBallRef.current){
                                    setMarkForm({
                                        ...markForm,
                                        [item.pole_mark_mag]: Number(e.target.value)
                                    })
                                }
                                if(totalBall < 100){
                                    setMarkForm({
                                        ...markForm,
                                        [item.pole_mark_mag]: Number(e.target.value)
                                    })
                                }
                                }} onBlur={async(e) => {
                                if(Number(e.target.value) == oldBallRef.current) return;
                                const newEstimate = await directory.grades.find( item => {
                                    return item.beg_bal < totalBall && item.end_bal > totalBall 
                                } )
                                const res = await queryServer<{result:boolean}>(
`http://localhost:3113/avn13/api/AVN13/formask/updateMarks?mmkey=${mark.id_mark_mag}_${item.pole_mark_mag}&newval=${e.target.value}&beg_val=${oldBallRef.current}&id_estimation=${newEstimate?.id_estimation}&beg_ball=${mark.dop2}&end_ball=${mark.ball}`)
                                if(res.result){
                                    setMarkForm({
                                        ...markForm,
                                        [item.pole_mark_mag]: Number(e.target.value),
                                        grade: newEstimate!.id_estimation
                                    })
                                    oldBallRef.current = Number(e.target.value)
                                    
                                }else{
                                    setMarkForm({
                                        ...markForm,
                                        [item.pole_mark_mag]: Number(e.target.value)
                                    })
                                }
                            }} onFocus={(e: ChangeEvent<HTMLInputElement>) => {
                                oldBallRef.current = Number(e.target.value)
                            }} className={classNames(classes.ball_inp)} value={
                                Number(markForm[item.pole_mark_mag])
                            } />
                        </div>
                    })
                }
                <div className={classNames(classes.table_item, classes.table_item_date)}>
                    {
                        <DatePicker disabled={markForm.grade == 25 || !(canaccessfest == 1)} dateFormat={"dd-MM-yyyy"} className={classes.date_picker} selected={new Date(markForm.uDate)} onChange={ async (date:Date) => {
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
                <div className={classNames(classes.table_item, classes.table_item_grade)}>
                    {
                        <UXSelect dsbl={markForm.grade !== 25 && (canaccessfest == 1)} options={grade} value={directory.grades.find(r => r.value == markForm.grade ) || {
                            value: 25,
                            label: "н/п"
                        }} hundleChange={async (newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
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
                <div className={classNames(classes.table_item, classes.table_item_special)}>
                    <UXSelect dsbl={ true } options={directory.estOther} value={directory.estOther.find(r => r.value == markForm.specialGrade )!} hundleChange={async (newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                            const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${mark.id_mark_mag}_id_estimation_other&newval=${newValue!.value}&oldval=${markForm!.grade}`)
                            if(res.result == true){
                                setMarkForm({
                                    ...markForm,
                                    specialGrade: newValue!.value
                                })
                            }
                        }}/>
                </div>
            </div>
        </>
     );
}



export default TableElem;