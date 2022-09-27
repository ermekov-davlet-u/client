import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import UXSelect from "../../components/Select";
import { useAppSelector } from '../../store/hook';
import classes from "./Selects.module.scss";
import { IDisciplinesType, IUniversalSelectType } from '../../store/models/directory';
import useStudQuery from '../../service/redux/main';
import { newGroupId } from '../../store/slice/studentSlice';
import { useAppDispatch } from '../../store/hook';

interface ISelectDiplomFormType {
    faculty: IUniversalSelectType,
    year: IUniversalSelectType,
    group: IUniversalSelectType,
}


function DiplomSelect() {

    const [selectForm, setSelctForm] = useState<ISelectDiplomFormType>({
        faculty: {value: 0,label: "Не выбрано" },
        year: {value: 0,label: "Не выбрано" },
        group: {value: 0,label: "Не выбрано" },
    })

    const { setNewDiplomGroup, setNewDiplomStud } = useStudQuery() 
    
    const changeJournalSelectForm = ( selectFormKey: keyof ISelectDiplomFormType, value: IUniversalSelectType  ) => {
        switch ( selectFormKey ) {
            case "faculty": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    group: {value: 0,label: "Не выбрано" },
                })
                setNewDiplomGroup(selectForm.year.value, value.value)
            break;
            case "year": setSelctForm({
                    [selectFormKey]: value,
                    faculty: {value: 0,label: "Не выбрано" },
                    group: {value: 0,label: "Не выбрано" },
                })
            break;
                
            case "group": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                })
            
            break;
        }
    } 
    const dispatch = useAppDispatch()

    const { faculties, years, rates, groups, semesters, disciplines, formControls, estimates, statements } = useAppSelector(state => state.directory)
    const { kvalification, diplomGroup } = useAppSelector(state => state.kvalification)
    const { setNewLoginPassStud, setNewStudents } = useStudQuery()

    return ( 
        <section className={classNames(classes.selects,  )}>
                <h2 className={classNames(classes.selects_title,  )}>
                    Выберите критерии
                </h2>
                <div className={classes.container}>
                    <UXSelect dsbl={true} value={selectForm.year} options={ years } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeJournalSelectForm("year", newValue!)
                    }} />
                    <UXSelect dsbl={!!selectForm.year.value} value={selectForm.faculty} options={ faculties } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeJournalSelectForm("faculty", newValue!)
                    }} />
                    <UXSelect dsbl={!!selectForm.faculty.value} value={selectForm.group} options={ diplomGroup } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeJournalSelectForm("group", newValue!)
                        setNewDiplomStud(newValue!.value)
                        dispatch(newGroupId(newValue!))
                    }} />
            </div>
        </section>
     );
}

export default DiplomSelect;