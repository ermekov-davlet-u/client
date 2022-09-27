import classNames from 'classnames';
import React, { useState } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import UXSelect from "../../components/Select";
import { useAppSelector } from '../../store/hook';
import classes from "./Selects.module.scss";
import { IUniversalSelectType } from '../../store/models/directory';
import useStudQuery from '../../service/redux/main';
import useDirectory from '../../service/redux/directory';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import ModalConfirm from './../../components/Modal/ConfirmModal';
import { queryServer } from '../../hooks/fetch';
import { getCheckInsert } from '../../service/main';

interface ISelecJournalFormType {
    year: IUniversalSelectType;
    ws: IUniversalSelectType;
    faculty: IUniversalSelectType;
    rate: IUniversalSelectType;
    educForm: IUniversalSelectType;
    group: IUniversalSelectType;
    esimate: IUniversalSelectType;
    poleStatement: IUniversalSelectType;
}

interface IJournalDates{
    dateStart: Date;
    dateEnd: Date;
}


function JournalSelect() {
    const [ modal, setModal ] = useState<{
        show: boolean;
        idUpdate: number;
        kol: number
    }>({
        show: false,
        idUpdate: 0,
        kol: 0
    })
    const [selectForm, setSelctForm] = useState<ISelecJournalFormType>({
        year: {value: 0,label: "Не выбрано" },
        ws: {value: 0,label: "Не выбрано" },
        faculty: {value: 0,label: "Не выбрано" },
        rate: {value: 0,label: "Не выбрано" },
        educForm: {value: 0,label: "Не выбрано" },
        group: {value: 0,label: "Не выбрано" },
        esimate: {value: 0,label: "Не выбрано" },
        poleStatement: {value: 0,label: "Не выбрано" },
    })
    const [ dates, setDates ] = useState<IJournalDates>({
        dateStart: new Date(),
        dateEnd: new Date(),
    }) 

    const { setNewDiplomGroup, setNewPoleStatement, setNewJournal } = useStudQuery() 
    const { setNewFaculties, setNewRates, setNewEducForm, setNewGroups, setNewEstimate } = useDirectory() 
    
    const changeDiplomSelectForm = ( selectFormKey: keyof ISelecJournalFormType, value: IUniversalSelectType  ) => {
        switch ( selectFormKey ) {
            case "year": setSelctForm({
                    [selectFormKey]: value,
                    ws: {value: 0,label: "Не выбрано" },
                    faculty: {value: 0,label: "Не выбрано" },
                    rate: {value: 0,label: "Не выбрано" },
                    educForm: {value: 0,label: "Не выбрано" },
                    group: {value: 0,label: "Не выбрано" },
                    esimate: {value: 0,label: "Не выбрано" },
                    poleStatement: {value: 0,label: "Не выбрано" },
                })
            break;
            case "ws": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    faculty: {value: 0,label: "Не выбрано" },
                    rate: {value: 0,label: "Не выбрано" },
                    educForm: {value: 0,label: "Не выбрано" },
                    group: {value: 0,label: "Не выбрано" },
                    esimate: {value: 0,label: "Не выбрано" },
                    poleStatement: {value: 0,label: "Не выбрано" },
                })
                setNewFaculties(selectForm.year.value, value.value)
                setNewFaculties(selectForm.year.value, value.value)
            break;
            case "faculty": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    rate: {value: 0,label: "Не выбрано" },
                    educForm: {value: 0,label: "Не выбрано" },
                    group: {value: 0,label: "Не выбрано" },
                    esimate: {value: 0,label: "Не выбрано" },
                    poleStatement: {value: 0,label: "Не выбрано" },
                })
                setNewDiplomGroup(selectForm.year.value, value.value)
                setNewRates()
            break;
            case "rate": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    educForm: {value: 0,label: "Не выбрано" },
                    group: {value: 0,label: "Не выбрано" },
                    esimate: {value: 0,label: "Не выбрано" },
                    poleStatement: {value: 0,label: "Не выбрано" },
                })
                setNewEducForm(selectForm.year.value, selectForm.faculty.value, value.value)
                setNewJournal(selectForm.year.value, selectForm.ws.value, selectForm.faculty.value, value.value)
            break;
            case "educForm": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    group: {value: 0,label: "Не выбрано" },
                    esimate: {value: 0,label: "Не выбрано" },
                    poleStatement: {value: 0,label: "Не выбрано" },
                })
                setNewGroups ( selectForm.faculty.value, selectForm.year.value, selectForm.rate.value, value.value )
            break;
            case "group": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    esimate: {value: 0,label: "Не выбрано" },
                    poleStatement: {value: 0,label: "Не выбрано" },
                })
                setNewEstimate()
            break;
            case "esimate": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    poleStatement: {value: 0,label: "Не выбрано" },
                })
                setNewPoleStatement(value.value)
            break;
            case "poleStatement": setSelctForm({
                ...selectForm,
                [selectFormKey]: value,
            })

        break;
        }
    } 

    const { faculties, years, ws, rates, groups, estimates, educForm, poleStatement } = useAppSelector(state => state.directory)
    
    return ( 
        <section className={classNames(classes.selects,  )}>
            <ModalConfirm title={`Вы хотите посчитать значение журнала посещения c ${dates.dateStart.toLocaleDateString()} по ${dates.dateEnd.toLocaleDateString()} для ${selectForm.faculty.label} поле ${selectForm.poleStatement.label}.
            \n Продолжить расчет? `} show={modal.show} close={() => {
                setModal({
                    show: false,
                    idUpdate: 0,
                    kol: 0
                })
            }} actionFunc={async() => {
                const res = await queryServer("http://localhost:3113/avn13/api/AVN13/ByJurnal/InsUpd", "POST", {
                    beg_date: dayjs(dates.dateStart).format('YYYY-MM-DD'),
                    end_date: dayjs(dates.dateEnd).format('YYYY-MM-DD'),
                    id_T_StudentJournalVisit_mark_mag_UPDATE: modal.idUpdate,
                    id_a_year: selectForm.year.value,
                    id_ebe_var: selectForm.esimate.value,
                    id_f_educ: selectForm.educForm.value,
                    id_faculty: selectForm.faculty.value,
                    id_group: selectForm.group.value,
                    id_rate: selectForm.rate.value,
                    id_w_s: selectForm.ws.value,
                    pole_mark_mag: selectForm.poleStatement.Kredits,
                    status: ( modal.idUpdate > 0 && modal.kol > 0)? 1 : 0
                });
                setNewJournal(selectForm.year.value, selectForm.ws.value, selectForm.faculty.value, selectForm.rate.value)
            }}/>
                <h2 className={classNames(classes.selects_title,  )}>
                    Выберите критерии
                </h2>
                <div className={classes.container}>
                    <UXSelect label='test' dsbl={true} value={selectForm.year} options={ years } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeDiplomSelectForm("year", newValue!)
                    }} />
                    <UXSelect label='test' dsbl={!!selectForm.year.value} value={selectForm.ws} options={ ws } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeDiplomSelectForm("ws", newValue!)
                    }} />
                    <UXSelect label='test' dsbl={!!selectForm.ws.value} value={selectForm.faculty} options={ faculties } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeDiplomSelectForm("faculty", newValue!)
                    }} />
                    <UXSelect label='test' dsbl={!!selectForm.year.value} value={selectForm.rate} options={ rates } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeDiplomSelectForm("rate", newValue!)
                    }} />
                    <UXSelect label='test' dsbl={!!selectForm.rate.value} value={selectForm.educForm} options={ educForm } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeDiplomSelectForm("educForm", newValue!)
                    }} />
                    <UXSelect label='test' dsbl={!!selectForm.educForm.value} value={selectForm.group} options={ groups } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeDiplomSelectForm("group", newValue!)
                    }} />
                    <UXSelect label='test' dsbl={!!selectForm.group.value} value={selectForm.esimate} options={ estimates } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeDiplomSelectForm("esimate", newValue!)
                    }} />
                    <UXSelect label='test' dsbl={!!selectForm.esimate.value} value={selectForm.poleStatement} options={ poleStatement } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                        changeDiplomSelectForm("poleStatement", newValue!)
                    }} />
                    <div className={classes.flex}>
                        <label htmlFor="" className={classes.date_label}>
                            Начало:
                        </label>
                        <DatePicker dateFormat={"dd-MM-yyyy"} selected={dates.dateStart} onChange={ async (date:Date) => {
                            setDates({
                                ...dates,
                                dateStart: date
                            })
                        }}/>
                    </div>
                    <div className={classes.flex}>
                        <label htmlFor="" className={classes.date_label}>
                            Конец:
                        </label>
                        <DatePicker dateFormat={"dd-MM-yyyy"} selected={dates.dateEnd} onChange={ async (date:Date) => {
                            setDates({
                                ...dates,
                                dateEnd: date
                            })
                        }}/>
                    </div>
                    <div className={classes.flex}>
                        <button className={classes.add_btn}  onClick={async() => {
                            const date = await getCheckInsert( selectForm.year.value, selectForm.ws.value, selectForm.faculty.value, selectForm.rate.value, selectForm.group.value, selectForm.educForm.value, selectForm.esimate.value, selectForm.poleStatement.subValue! )
                            if(date[0]){
                                await setModal({
                                    show: true,
                                    idUpdate: date[0].id_T_StudentJournalVisit_mark_mag_UPDATE || 0,
                                    kol: date[0].kol
                                })
                            }
                        }}>Добавить</button>
                    </div>
                </div>
        </section>
     );
}

export default JournalSelect;