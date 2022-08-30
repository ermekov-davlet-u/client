import React, { ChangeEvent, memo, useRef, useState } from 'react';
import classes from "./Table.module.scss"
import classNames from 'classnames';
import UXSelect from "../Select/index"
import { useAppSelector } from '../../store/hook';
import { ActionMeta, SingleValue } from 'react-select';
import { IUniversalSelectType } from '../../store/models/directory';
import { useEffect } from 'react';
import { queryServer } from '../../hooks/fetch';
import "react-datepicker/dist/react-datepicker.css";
import { IStudentGrade } from '../../store/models/student';
import ModalDelete from './../Modal/ModalDelete';
import useStudQuery from '../../service/redux/main';
import DatePicker from 'react-datepicker';
import dayjs from "dayjs";

type TableElemPropType = {
    num: number
    studGrade: IStudentGrade,
}
type FormType = {
    num: number;
    semester: number;
    discipline: string;
    formControl: string;
    credit: number;
    ball: number;
    grade: number;
    statement: string;
    uDate: Date;
}

function StudGradeTableElem( {
    num,
    studGrade
}: TableElemPropType ) {

    const [modal, setModal] = useState<boolean>(false)
    const directory = useAppSelector(state => state.studentMarks)
    const oldBallRef = useRef<number>(0)
    

    const [ markForm, setMarkForm ] = useState<FormType>({
        num: num,
        semester: 0,
        discipline: "",
        formControl: "",
        credit: 0,
        ball: 0,
        grade: 0,
        statement: "",
        uDate: new Date(),
    })
    const { setNewMarksByStudent } = useStudQuery()
    useEffect(() => {
        setMarkForm({
            num: num,
            semester: studGrade.id_semester,
            discipline: studGrade.p34,
            formControl: studGrade.p30,
            credit: studGrade.kredits,
            ball: studGrade.ball,
            grade: studGrade.id_estimation,
            statement: "",
            uDate: new Date(studGrade.p36),
        })
        oldBallRef.current = studGrade.ball
    }, [])
    
    async function delMark(){
        const res: {result: boolean} = await queryServer(`http://localhost:3113/avn13/api/AVN13/Dellmm/dellMM?id_mark_mag=${studGrade.id_mark_mag}`)
        if(res.result){
            await setNewMarksByStudent(studGrade.id_group, studGrade.id_student)
        }
        setModal(false)
    }

    return ( 
        <>
        <ModalDelete semester={directory.semesters.find(r => r.value == markForm.semester)?.label || ""} discipline={markForm.discipline } show={modal} actionFunc={delMark} close={()=>{
            setModal(false)
        }} />
             <div className={classNames(classes.table_row, classes.table_row_gradestud)}>
                <div className={classes.table_item}>
                    {
                        markForm.num
                    }
                </div>
                <div className={classes.table_item}>
                    <UXSelect dsbl={true} options={directory.semesters} value={directory.semesters.find(r => r.value == markForm.semester)!} hundleChange={async(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${studGrade.id_mark_mag}_id_semester&newval=${newValue!.value}&oldval=${markForm.semester}}`)
                        if(res.result == true){
                            setMarkForm({
                                ...markForm,
                                semester: newValue!.value
                            })
                        }
                    }} />
                </div>
                <div className={classes.table_item}>
                    {
                        markForm.discipline
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        markForm.formControl
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        markForm.credit
                    }
                </div>
                <div className={classes.table_item}>
                    <input type="number" max={100} min={0} onInput={(e: ChangeEvent<HTMLInputElement>) => {
                        setMarkForm({
                            ...markForm,
                            ball: Number(e.target.value)
                        })
                    }} onBlur={async(e) => {
                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/ByStudent/updateMarks?mmkey=${studGrade.id_mark_mag}_ball&newval=${e.target.value}&oldval=${oldBallRef.current}`)
                        if(res.result == true){
                            setMarkForm({
                                ...markForm,
                                ball: Number(e.target.value)
                            })
                            oldBallRef.current = Number(e.target.value)
                        }else{
                            setMarkForm({
                                ...markForm,
                                ball: oldBallRef.current
                            })
                        }
                    }} className={classes.ball_inp} value={
                        markForm.ball
                    } />
                </div>
                <div className={classes.table_item}>
                    <UXSelect dsbl={true} options={directory.estimation} value={directory.estimation.find(r => r.value == markForm.grade)!} hundleChange={async(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${studGrade.id_mark_mag}_id_estimation&newval=${newValue!.value}&oldval=${markForm.grade}`)
                        if(res.result == true){
                            setMarkForm({
                                ...markForm,
                                grade: newValue!.value
                            })
                        }
                        }} />
                </div>
                <div className={classes.table_item}>
                    {
                        markForm.ball
                    }
                </div>
                <div className={classes.table_item}>
                    {
                        <DatePicker dateFormat={"dd-MM-yyyy"} className={classes.date_picker} selected={new Date(markForm.uDate)} onChange={ async (date:Date) => {
                            const newDate = dayjs(date).format('YYYY-MM-D')
                            const oldDate = dayjs(markForm.uDate).format('YYYY-MM-D')
                            const res = await queryServer<{result:boolean}>(
                                `http://localhost:3113/avn13/api/AVN13/formask/updateNotMarks?mmkey=${studGrade.id_mark_mag}_p36&newval=${newDate}&oldval=${oldDate}`
                                )
                            if(res.result == true ){
                                setMarkForm({
                                    ...markForm,
                                    uDate: date
                                })
                            }
                    }} />
                    }
                </div>
                <div className={classNames(classes.table_item, classes.del_btn)} onClick={() => {
                    setModal(true)
                }}>
                    Удалить
                </div>
            </div>
        </>
     );
}

export default memo(StudGradeTableElem);