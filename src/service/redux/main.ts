
import { IStundentLogPass, IUniversalSelectType } from '../../store/models/directory';
import { newEducSh } from '../../store/slice/educShSlice';
import { newSelMarkMag } from '../../store/slice/selMerkMagSlice';
import { newStudLogPass } from '../../store/slice/studentLogPassSlice';
import { newStudentMarks } from '../../store/slice/studentMark';
import { newStudents } from '../../store/slice/studentSlice';
import { getEducShDiscipline, getLoginPassStud, getMarksByStudent, getSelMarkMag, getStudents } from '../main';
import { useAppDispatch } from './../../store/hook';
import { IEducSh, ISelMarkMag, IStudentGrade, IStudentType } from './../../store/models/student';



export default function useStudQuery() {

    const dispatch = useAppDispatch()

    async function setNewLoginPassStud(idGroup: number){
        const loginPass: IStundentLogPass[] = await getLoginPassStud<IStundentLogPass[]>(idGroup)
        dispatch(newStudLogPass(loginPass))
    }

    async function setNewStudents(idGroup: number){
        const students: IUniversalSelectType[] = await getStudents<IUniversalSelectType[]>(idGroup)
        dispatch(newStudents(students))
    }

    async function setNewMarksByStudent(idGroup: number, idStudent: number){
        const students: IStudentGrade[] = await getMarksByStudent<IStudentGrade[]>(idGroup, idStudent)
        dispatch(newStudentMarks(students))
    }

    async function setNewEducSh(idGroup: number, idStudent: number){
        const disciplines: IEducSh[] = await getEducShDiscipline<IEducSh[]>(idGroup, idStudent)
        dispatch(newEducSh(disciplines))
    }

    async function setNewSelMarkMag(idGroup: number, idSemester: number, idDiscipline: number, idFormControl: number, idEstimation: number, idStatement: number, kredit: number){
        const res = await getSelMarkMag<ISelMarkMag[]>(idGroup, idSemester, idDiscipline, idFormControl, idEstimation, idStatement, kredit)
        dispatch(newSelMarkMag(res))
    }

    return {
        setNewLoginPassStud,
        setNewStudents,
        setNewMarksByStudent,
        setNewEducSh,
        setNewSelMarkMag
    }
} 