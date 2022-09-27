import { useEffect, useState } from "react"
import { IUniversalSelectType } from "../store/models/directory"
import { setLoading } from "../store/slice/loadingSlice";
import { newMarks } from "../store/slice/studentGradeSlice";
import useDirectory from './../service/redux/directory';
import { useAppDispatch } from './../store/hook';

export interface ISelectFormType {
    faculty: IUniversalSelectType,
    year: IUniversalSelectType,
    rate: IUniversalSelectType,
    group: IUniversalSelectType,
    semester: IUniversalSelectType,
    discipline: any,
    formControl: IUniversalSelectType,
    estimate: IUniversalSelectType,
    statement: IUniversalSelectType,

}

export default function useSelect(){
    const {
        setNewYears,
        setNewFaculties,
        setNewRates,
        setNewSemesters,
        setNewDisciplines,
        setNewFormControl,
        setNewEstimate,
        setNewStatement,
        setNewGroups,
        setNewGrade,
        setNewEstconfig,
        setNewMarks,
        setNewCanChangeDopusk,
        setNewRrnkPermission,
        setNewGradeOther
    } = useDirectory()

    const [selectForm, setSelctForm] = useState<ISelectFormType>({
        faculty: {value: 0,label: "Не выбрано" },
        year: {value: 0,label: "Не выбрано" },
        rate: {value: 0,label: "Не выбрано" },
        group: {value: 0,label: "Не выбрано" },
        semester: {value: 0,label: "Не выбрано" },
        discipline: {value: 0,label: "Не выбрано" },
        formControl: {value: 0,label: "Не выбрано" },
        estimate: {value: 0,label: "Не выбрано" },
        statement: {value: 0,label: "Не выбрано" },
    })
    const dispatch = useAppDispatch()
    
    const changeSelectForm = async  ( selectFormKey: keyof ISelectFormType, value: IUniversalSelectType  ) => {
        switch ( selectFormKey ) {
            case "faculty": setSelctForm({
                    [selectFormKey]: value,
                    year: {value: 0,label: "Не выбрано" },
                    rate: {value: 0,label: "Не выбрано" },
                    group: {value: 0,label: "Не выбрано" },
                    semester: {value: 0,label: "Не выбрано" },
                    discipline: {value: 0,label: "Не выбрано" },
                    formControl: {value: 0,label: "Не выбрано" },
                    estimate: {value: 0,label: "Не выбрано" },
                    statement: {value: 0,label: "Не выбрано" }
                })
            break;
            case "year": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    rate: {value: 0,label: "Не выбрано" },
                    group: {value: 0,label: "Не выбрано" },
                    semester: {value: 0,label: "Не выбрано" },
                    discipline: {value: 0,label: "Не выбрано" },
                    formControl: {value: 0,label: "Не выбрано" },
                    estimate: {value: 0,label: "Не выбрано" },
                    statement: {value: 0,label: "Не выбрано" }
                })
            break;
            case "rate": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    group: {value: 0,label: "Не выбрано" },
                    semester: {value: 0,label: "Не выбрано" },
                    discipline: {value: 0,label: "Не выбрано" },
                    formControl: {value: 0,label: "Не выбрано" },
                    estimate: {value: 0,label: "Не выбрано" },
                    statement: {value: 0,label: "Не выбрано" }
                })
                setNewGroups( selectForm.faculty.value, selectForm.year.value, value.value )
            break;
            case "group": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    semester: {value: 0,label: "Не выбрано" },
                    discipline: {value: 0,label: "Не выбрано" },
                    formControl: {value: 0,label: "Не выбрано" },
                    estimate: {value: 0,label: "Не выбрано" },
                    statement: {value: 0,label: "Не выбрано" }
                })
                setNewSemesters(selectForm.rate.value)
            break;
            case "semester": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    discipline: {value: 0,label: "Не выбрано" },
                    formControl: {value: 0,label: "Не выбрано" },
                    estimate: {value: 0,label: "Не выбрано" },
                    statement: {value: 0,label: "Не выбрано" }
                })
                setNewDisciplines(selectForm.group.value, value.value)
            break;
            case "discipline": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    formControl: {value: 0,label: "Не выбрано" },
                    estimate: {value: 0,label: "Не выбрано" },
                    statement: {value: 0,label: "Не выбрано" }
                })
                setNewFormControl( selectForm.group.value, value.value, selectForm.semester.value, value.Kredits! )
                setNewRrnkPermission( value.value, selectForm.year.value )
            break;
            case "formControl": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                    estimate: {value: 0,label: "Не выбрано" },
                    statement: {value: 0,label: "Не выбрано" }
                })
                setNewEstimate(selectForm.discipline.value, value.value, selectForm.group.value, selectForm.semester.value)
            break;
            case "estimate": setSelctForm({
                    ...selectForm,
                    [selectFormKey]: value,
                })
                setNewStatement(selectForm.formControl.value, selectForm.group.value, selectForm.semester.value, selectForm.discipline.value)
                setNewGrade(selectForm.formControl.value, value.value)
                setNewGradeOther(value.value)
            break;
            case "statement": setSelctForm({
                ...selectForm,
                statement: value
                })
                await dispatch(setLoading(true));
                await setNewEstconfig(selectForm.estimate.value, value.value)
                await setNewMarks( selectForm.formControl.value, selectForm.estimate.value, selectForm.group.value, selectForm.semester.value, selectForm.discipline.Kredits, selectForm.year.value, selectForm.discipline.value, value.value)
                await setNewCanChangeDopusk()
                await dispatch(setLoading(false));
            break;
        }
    } 

    useEffect(() => {
        setNewYears()
        setNewFaculties()
        setNewRates()
    },[])
    useEffect(() => {
        if(selectForm.formControl.value == 0){
            dispatch(newMarks([]))
        }
    }, [selectForm.statement.value])
    
    return {
        selectForm,
        changeSelectForm
    }
}