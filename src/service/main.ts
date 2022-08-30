import { queryServer } from "../hooks/fetch";
import { IStundentLogPass } from "../store/models/directory";


export async function getLoginPassStud<T>(idGroup: number): Promise<any>{
    const res = await queryServer<T[]>(`http://localhost:3113/avn13/api/AVN13/LoginPassStudent/getLoginPassStudents?id_group=${idGroup}`)
    return res
}

export async function getStudents<T>(idGroup: number): Promise<any>{
    const res = await queryServer<T[]>(`http://localhost:3113/avn13/api/AVN13/ByStudent/getStudents?id_group=${idGroup}`)
    return res
}
export async function getMarksByStudent<T>(idGroup: number, idStudent: number): Promise<any>{
    const res = await queryServer<T[]>(`http://localhost:3113/avn13/api/AVN13/ByStudent/getMarksByStudent?id_student=${idStudent}&id_group=${idGroup}`)
    return res
}

export async function getEducShDiscipline<T>(idGroup: number, idStudent: number): Promise<any>{
    const res = await queryServer<T[]>(`http://localhost:3113/avn13/api/AVN13/DiscCopyFromEducSh/getDiscFromEducSh?id_student=${idStudent}&id_group=${idGroup}`)
    return res
}

export async function getSelMarkMag<T>(idGroup: number, idSemester: number, idDiscipline: number, idFormControl: number, idEstimation: number, idStatement: number, kredit: number): Promise<any>{
    const res = await queryServer<T[]>(`http://localhost:3113/avn13/api/AVN13/AddStudByVedomost/SelMarkMagNew?id_group=${idGroup}&id_semester=${idSemester}&id_discipline=${idDiscipline}&id_examination=${idFormControl}&kredits=${kredit}&id_ebe_var=${idEstimation}&id_f_est=${idStatement}`)
    return res
}