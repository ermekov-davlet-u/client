
import { IStundentLogPass, IUniversalSelectType } from '../../store/models/directory';
import { newEducSh } from '../../store/slice/educShSlice';
import { newDiplomGroup, newKvalification } from '../../store/slice/kvalification';
import { newSelMarkMag } from '../../store/slice/selMerkMagSlice';
import { newStudLogPass } from '../../store/slice/studentLogPassSlice';
import { newSemestersMarks, newStudentMarks } from '../../store/slice/studentMark';
import { newStudents } from '../../store/slice/studentSlice';
import { newDiplom } from "../../store/slice/diplomSlice"
import { getDiplomGroup, getDiplomStud, getEducShDiscipline, getJournal, getKvalification, getLoginPassStud, getMarksByStudent, getPhotoStud, getSelMarkMag, getSemesters, getStudents } from '../main';
import { useAppDispatch } from './../../store/hook';
import { IDiplom, IEducSh, ISelMarkMag, IStudentGrade } from './../../store/models/student';
import { getPoleStatement } from '../directory';
import { newPoleStatement } from '../../store/slice/directorySlice';
import { newJournal } from '../../store/slice/journalSlice';
import { newStudPhoto } from '../../store/slice/studentGradeSlice';



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

    async function setNewMarksByStudent(idGroup: number, idStudent: number, idSemester?: number) {
        if(idSemester){
            const students: IStudentGrade[] = await getMarksByStudent<IStudentGrade[]>(idGroup, idStudent)
            const newStudents = await students.filter(student => student.id_semester == idSemester)
            dispatch(newStudentMarks(newStudents))
            return
        }
        const students: IStudentGrade[] = await getMarksByStudent<IStudentGrade[]>(idGroup, idStudent)
        dispatch(newStudentMarks(students))
    }

    async function getSemestersByStudent(idGroup: number){
        const res: IUniversalSelectType[] = await getSemesters(idGroup)
        dispatch(newSemestersMarks(res))
    }

    async function setNewPhotoByStudent(idStudent: number){
        const photo: any = await getPhotoStud<any>(idStudent)
        dispatch(newStudPhoto(photo))
    }

    async function setNewEducSh(idGroup: number, idStudent: number){
        const disciplines: IEducSh[] = await getEducShDiscipline<IEducSh[]>(idGroup, idStudent)
        dispatch(newEducSh(disciplines))
    }

    async function setNewSelMarkMag(idGroup: number, idSemester: number, idDiscipline: number, idFormControl: number, idEstimation: number, idStatement: number, kredit: number){
        const res = await getSelMarkMag<ISelMarkMag[]>(idGroup, idSemester, idDiscipline, idFormControl, idEstimation, idStatement, kredit)
        dispatch(newSelMarkMag(res))
    }

    async function setNewKvalification(){
        const res = await getKvalification<IUniversalSelectType[]>()
        dispatch(newKvalification(res))
    }

    async function setNewDiplomGroup(idYear: number, idFaculty: number){
        const res = await getDiplomGroup<IUniversalSelectType[]>(idYear, idFaculty)
        dispatch(newDiplomGroup(res))
    }

    async function setNewDiplomStud( idGroup: number ) {
        const res = await getDiplomStud<IDiplom>(idGroup)
        dispatch(newDiplom(res))
    }
    async function setNewPoleStatement(idEbevar: number){
        const res = await getPoleStatement(idEbevar)
        dispatch(newPoleStatement(res))
    }
    async function setNewJournal(idYear: number, idWS: number, idFaculty: number, idRate: number) {
        const res = await getJournal(idYear, idWS, idFaculty, idRate)
        dispatch(newJournal(res))
    }

    return {
        setNewLoginPassStud,
        setNewStudents,
        setNewMarksByStudent,
        getSemestersByStudent,
        setNewPhotoByStudent,
        setNewEducSh,
        setNewSelMarkMag,
        setNewKvalification,
        setNewDiplomGroup,
        setNewDiplomStud,
        setNewPoleStatement,
        setNewJournal
    }
} 