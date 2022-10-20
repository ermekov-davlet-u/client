import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import UXSelect from "../../components/Select";
import { useAppSelector } from '../../store/hook';
import classes from "./Selects.module.scss";
import { IDisciplinesType, IUniversalSelectType } from './../../store/models/directory';
import { getFaculty, getYears } from '../../service/directory';
import useDirectory from './../../service/redux/directory';
import useSelect from '../../hooks/select';
import { useGetDirectoryNameQuery } from '../../store/api/directory';
import useStudQuery from '../../service/redux/main';
import { newGroupId } from '../../store/slice/studentSlice';
import { useAppDispatch } from './../../store/hook';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalAddstudByStatement from './../../components/Modal/ModalAddstudByStatement';
import { setLoading } from '../../store/slice/loadingSlice';
import { queryServer } from '../../hooks/fetch';
import dayjs from "dayjs";
import DatePicker from 'react-datepicker';
import { newCanaccessfest } from '../../store/slice/studentGradeSlice';
import { toast } from 'react-toastify';



function Selects() {

    const {selectForm,
        changeSelectForm} = useSelect()
    const dispatch = useAppDispatch()
    const [ modal, setModal ] = useState<boolean>(false)
    const [newDate, setNewDate] = useState<Date>( new Date() )
    const { faculties, years, rates, groups, semesters, disciplines, formControls, estimates, statements } = useAppSelector(state => state.directory)
    const { setNewLoginPassStud, setNewStudents } = useStudQuery()
    const navidate = useLocation()
    const { idGroup } = useAppSelector(state => state.students)
    const { photo } = useAppSelector(state => state.studentGrade)

    return ( 
    <>
        {
            (navidate.pathname !== "/avn13/diplom" && navidate.pathname !== "/avn13/journal") &&
            <div className={classes.wrap}>
                <section className={classNames(classes.selects,  )}>
                        <h2 className={classNames(classes.selects_title,  )}>
                            Выберите критерии
                        </h2>
                        <div className={classes.container}>
                            <UXSelect label="Факультет" dsbl={true} value={selectForm.faculty} options={ faculties } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                changeSelectForm("faculty", newValue!)
                            }} />
                            <UXSelect label="Учебный год" dsbl={!!selectForm.faculty.value} value={selectForm.year} options={ years } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                changeSelectForm("year", newValue!)
                            }} />
                            <UXSelect label="Курс" dsbl={!!selectForm.year.value} value={selectForm.rate} options={ rates } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                changeSelectForm("rate", newValue!)
                            }} />
                            <UXSelect label="Группа" dsbl={!!selectForm.rate.value} value={selectForm.group} options={ groups } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                changeSelectForm("group", newValue!)
                                setNewLoginPassStud(newValue!.value)
                                setNewStudents(newValue!.value)
                                dispatch(newGroupId(newValue!))
                            }} />
                            {
                                (navidate.pathname == "/avn13" || navidate.pathname == "/avn13/") &&
                                <>
                                    <UXSelect label="Семестр" dsbl={!!selectForm.group.value} value={selectForm.semester} options={ semesters } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                        changeSelectForm("semester", newValue!)
                                    }} />
                                    <UXSelect label="Дисциплина" dsbl={!!selectForm.semester.value} value={selectForm.discipline} options={ disciplines } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                        changeSelectForm("discipline", newValue!)
                                    }} />
                                    <UXSelect label="Форма контроля" dsbl={!!selectForm.discipline.value} value={selectForm.formControl} options={ formControls } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                        changeSelectForm("formControl", newValue!)
                                    }} />
                                    <UXSelect label="Правило оценок" dsbl={!!selectForm.formControl.value} value={selectForm.estimate} options={ estimates } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                        changeSelectForm("estimate", newValue!)
                                    }} />
                                    <UXSelect label="Форма ведомости" dsbl={!!selectForm.estimate.value} value={selectForm.statement} options={ statements } hundleChange={async(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                        await dispatch(setLoading(true))
                                        await changeSelectForm("statement", newValue!)
                                        await dispatch(setLoading(false))
                                        await dispatch(newCanaccessfest(newValue!.canaccessfest!))
                                    }} />
                                    {
                                        !!selectForm.statement.value  && selectForm.statement.canaccessfest == 1 && 
                                        <>
                                            <div className={classes.btn_wrap}>
                                                <button className={classes.add_btn} style={{width: 180, margin: 0}} onClick={() => {
                                                    setModal(true)
                                                }}>Добавить</button>
                                            </div>
                                            <div className={classes.date_all}>
                                                <label htmlFor="" className={classes.date_label}>
                                                    Изменить дату сдачи для всех
                                                </label>
                                                <div className={classes.date_chane}>
                                                    <DatePicker dateFormat={"dd-MM-yyyy"} selected={newDate} onChange={async (date:Date) => {
                                                        const newDate = dayjs(date).format('YYYY-MM-D')
                                                        setNewDate(new Date(newDate))
                                                    }} />
                                                    <button className={classes.add_btn} style={{width: 180}}  onClick={async () => {
                                                        const res = await queryServer<{result:boolean}>(`http://localhost:3113/avn13/api/AVN13/formask/updateDateForAllMarks`, "POST", {
                                                            u_date : new Date(newDate),
                                                            id_group: selectForm.group.value,
                                                            id_semester: selectForm.semester.value,
                                                            id_discipline: selectForm.discipline.value,
                                                            id_examination: selectForm.formControl.value,
                                                            id_f_est: selectForm.statement.value
                                                        })
                                                        if(res.result){
                                                            await changeSelectForm("statement", selectForm.statement )
                                                            toast.success("Изменен!")
                                                        }
                                                    }}>Изменить</button>
                                                </div>
                                            </div>
                                        </>
                                    }

                                </>
                            }   
                            <ModalAddstudByStatement selectValue={selectForm} idGroup={idGroup.value} show={modal} close={() => {setModal(false)}} />
                        </div>
                </section>
                {
                    ( photo && navidate.pathname == "/avn13/stud-grade") && <div className={classes.photo_wrap}>
                        <img src={photo} className={classes.photo} alt="Не найдено"/>                 
                </div>
                }
            </div>
        }
    </>
     );
}

export default Selects;