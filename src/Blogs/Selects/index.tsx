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



function Selects() {

    const {selectForm,
        changeSelectForm} = useSelect()
        const dispatch = useAppDispatch()
    const [ modal, setModal ] = useState<boolean>(false)

    const { faculties, years, rates, groups, semesters, disciplines, formControls, estimates, statements } = useAppSelector(state => state.directory)
    const { setNewLoginPassStud, setNewStudents } = useStudQuery()
    const navidate = useLocation()

    
    
    const { idGroup } = useAppSelector(state => state.students)

    return ( 
        <section className={classNames(classes.selects,  )}>
            <h2 className={classNames(classes.selects_title,  )}>
                Выберите критерии
            </h2>
            {/* <hr className={classNames(classes.selects_line,  )}/> */}
            <div className={classes.container}>
                <UXSelect dsbl={true} value={selectForm.faculty} options={ faculties } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                    changeSelectForm("faculty", newValue!)
                }} />
                <UXSelect dsbl={!!selectForm.faculty.value} value={selectForm.year} options={ years } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                    changeSelectForm("year", newValue!)
                }} />
                <UXSelect dsbl={!!selectForm.year.value} value={selectForm.rate} options={ rates } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                    changeSelectForm("rate", newValue!)
                }} />
                <UXSelect dsbl={!!selectForm.rate.value} value={selectForm.group} options={ groups } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                    changeSelectForm("group", newValue!)
                    setNewLoginPassStud(newValue!.value)
                    setNewStudents(newValue!.value)
                    dispatch(newGroupId(newValue!))
                }} />
                {
                    navidate.pathname == "/" &&
                <>
                    <UXSelect dsbl={!!selectForm.group.value} value={selectForm.semester} options={ semesters } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeSelectForm("semester", newValue!)
                    }} />
                    <UXSelect dsbl={!!selectForm.semester.value} value={selectForm.discipline} options={ disciplines } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeSelectForm("discipline", newValue!)
                    }} />
                    <UXSelect dsbl={!!selectForm.discipline.value} value={selectForm.formControl} options={ formControls } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeSelectForm("formControl", newValue!)
                    }} />
                    <UXSelect dsbl={!!selectForm.formControl.value} value={selectForm.estimate} options={ estimates } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeSelectForm("estimate", newValue!)
                    }} />
                    <UXSelect dsbl={!!selectForm.estimate.value} value={selectForm.statement} options={ statements } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeSelectForm("statement", newValue!)
                    }} />
                    {
                        !!selectForm.statement.value && 
                        <button className={classes.add_btn}  onClick={() => {
                            setModal(true)
                        }}>Добавить</button>
                    }
                </>
            }   
                <ModalAddstudByStatement selectValue={selectForm} idGroup={idGroup.value} show={modal} close={() => {setModal(false)}} />

            </div>
        </section>
     );
}

export default Selects;