import { getgroups } from "process";
import { GradeType, IEstCinfig, IMarks, IUniversalSelectType } from "../../store/models/directory";
import { newDisciplines, newEducForm, newEstimates, newEstOthers, newFacultiesList, newFormControls, newGrades, newGroup, newRates, newRrnkPermission, newSemesters, newStatements, newWS, newYears } from "../../store/slice/directorySlice";
import { newCanChangeDopusk, newEstConfig, newMarks } from "../../store/slice/studentGradeSlice";
import { newEstimationMarks, newSemestersMarks, newStatmentsMarks, newDisciplineMarks, newFormControlsMarks } from "../../store/slice/studentMark";
import { getDisciplines, 
    getEbevars, 
    getEstbegend, 
    getExaminations, 
    getFaculty, 
    getFests, 
    getGroups, 
    getRate, 
    getSemesters, 
    getYears, 
    getEstOther, 
    getEstconfig, 
    getMarks, 
    getCanChangeDopusk, 
    getRrnkPermis,
    getAllSemesters,
    getAllFests,
    getAllEe,
    getEstimations,
    getAllDisciplines,
    getAllExaminations,
    getWS,
    getJournalFaculty,
    getEducForm,
    getJournalGroup,
    getJournalEbevars} from "../directory";
import { useAppDispatch } from './../../store/hook';
import { IDisciplinesType, IRrnPermission } from './../../store/models/directory';


export default function useDirectory(){

    const dispatch = useAppDispatch()
    
    async function setNewFaculties(id_a_year?: number, id_w_s?: number){
        if( id_a_year && id_w_s ){
            const res: IUniversalSelectType[] = await getJournalFaculty(id_a_year, id_w_s)
            dispatch( newFacultiesList(res))
            return
        }
        const res: IUniversalSelectType[] = await getFaculty()
        dispatch( newFacultiesList(res))
    }
    async function setNewYears(){
        const res: IUniversalSelectType[] = await getYears()
        dispatch( newYears(res))
    }
    async function setNewRates(){
        const res: IUniversalSelectType[] = await getRate()
        dispatch( newRates(res))
    }
    async function setNewGroups(idFaculty: number , idYear: number, idRate: number, idEducForm?: number){
        if(idEducForm){
            const res: IUniversalSelectType[] = await getJournalGroup(idFaculty, idYear, idRate, idEducForm)
            dispatch( newGroup(res) )
            return
        }
        const res: IUniversalSelectType[] = await getGroups(idFaculty, idYear, idRate)
        dispatch( newGroup(res) )
    }
    async function setNewSemesters(idRate?: number){
        if(idRate){
            const res: IUniversalSelectType[] = await getSemesters(idRate)
            dispatch( newSemesters(res) )
            return
        }
        const res: IUniversalSelectType[] = await getAllSemesters()
        dispatch( newSemestersMarks(res) )
    }
    async function setNewDisciplines(idGroup?: number, idSemester?: number){
        if(idGroup && idSemester){
            const res: IDisciplinesType[] = await getDisciplines(idGroup, idSemester)
            dispatch( newDisciplines(res) )
        }
        else{
            const res: IDisciplinesType[] = await getAllDisciplines()
            dispatch( newDisciplineMarks(res) )
        }
    }
    async function setNewFormControl(idGroup?: number , idDisciplines?: number, idSemester?: number, idKredits?: number){
        if( idGroup && idDisciplines && idSemester && idKredits){
            const res: IUniversalSelectType[] = await getExaminations(idGroup, idDisciplines, idSemester, idKredits )
            dispatch( newFormControls(res) )
        }else{
            const res: IUniversalSelectType[] = await getAllExaminations()
            dispatch( newFormControlsMarks(res) )
        }
    }
    async function setNewRrnkPermission( idDisciplines: number, idYear: number){
        const res: IUniversalSelectType[] = await getRrnkPermis( idDisciplines, idYear )
        dispatch( newRrnkPermission(res) )
    }
    async function setNewEstimate(idDisciplines?: number, idExaminations?: number, idGroup?: number, idSemester?: number){
        if( idDisciplines && idGroup && idSemester &&idExaminations){
            const res: IUniversalSelectType[] = await getEbevars(idDisciplines, idExaminations, idGroup, idSemester)
            dispatch( newEstimates(res) )
            return
        }
        const res: IUniversalSelectType[] = await getJournalEbevars()
        dispatch( newEstimates(res) )
    }
    async function setNewStatement(idExaminations?: number, idGroup?: number, idSemester?: number, idDisciplines?: number){
        if( idExaminations && idGroup && idSemester && idDisciplines){
            const res: IUniversalSelectType[] = await getFests(idExaminations, idGroup, idSemester, idDisciplines)
            dispatch( newStatements(res) )
            return
        }
        const res: IUniversalSelectType[] = await getAllFests()
        dispatch( newStatmentsMarks(res) )
    }
    async function setNewGrade(idExaminations?: number, idEbevar?: number){
        if(idExaminations && idEbevar){
            const res: GradeType[] = await getEstbegend(idExaminations, idEbevar)
            dispatch( newGrades(res) )
        }else if(idExaminations && !idEbevar){
            const res: IUniversalSelectType[] = await getEstimations(idExaminations)
            dispatch( newEstimationMarks(res) )
        }
    }
    async function setNewGradeOther( idEbevar: number ){
        const res: IUniversalSelectType[] = await getEstOther(idEbevar)
        dispatch( newEstOthers(res) )
    }
    async function setNewEstconfig( idEbevar: number, idFests: number){
        const res: IEstCinfig[] = await getEstconfig(idEbevar, idFests)
        dispatch( newEstConfig(res) )
    }
    async function setNewMarks( idExaminations: number, idEbevar: number, idGroup: number, idSemester: number, idKredits: number, idYear: number, idDiscipline: number, idStatement: number ){
        const res: IMarks[] = await getMarks( idExaminations
            ,idEbevar
            ,idGroup
            ,idSemester
            ,idKredits
            ,idYear
            ,idDiscipline,
            idStatement
             )
        dispatch( newMarks(res) )
    }
    async function setNewCanChangeDopusk(){
        const res: boolean = await getCanChangeDopusk()
        dispatch( newCanChangeDopusk(res) )
    }
    async function setNewEe(){
        const res: IUniversalSelectType[] = await getAllEe()
        dispatch( newEstimationMarks(res) )
    }
    async function setNewWS(){
        const res: IUniversalSelectType[] = await getWS()
        dispatch(newWS(res))
    }

    async function setNewEducForm(idYear: number, idFaculty: number, idRate: number){
        const res: IUniversalSelectType[] = await getEducForm(idYear, idFaculty, idRate)
        dispatch(newEducForm(res))
    }

    return {
        setNewYears,
        setNewFaculties,
        setNewRates,
        setNewSemesters,
        setNewDisciplines,
        setNewFormControl,
        setNewEstimate,
        setNewGroups,
        setNewStatement,
        setNewGrade,
        setNewGradeOther,
        setNewEstconfig,
        setNewMarks,
        setNewCanChangeDopusk,
        setNewRrnkPermission,
        setNewEe,
        setNewWS,
        setNewEducForm
    }
}

