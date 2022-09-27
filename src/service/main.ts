import { queryServer } from "../hooks/fetch";
import { IStundentLogPass } from "../store/models/directory";


export async function getLoginPassStud<T>(idGroup: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/LoginPassStudent/getLoginPassStudents?id_group=${idGroup}`)
    return res
}

export async function getStudents<T>(idGroup: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/ByStudent/getStudents?id_group=${idGroup}`)
    return res
}
export async function getMarksByStudent<T>(idGroup: number, idStudent: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/ByStudent/getMarksByStudent?id_student=${idStudent}&id_group=${idGroup}`)
    return res
}

export async function getSemesters<T>(idGroup: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/ByStudent/semester-list?id_group=${idGroup}`)
    return res
}

export async function getPhotoStud<T>(idStudent: number): Promise<any>{
    const res = await queryServer<any>(`/avn13/api/AVN13/photo/getStudentPhoto?id_student=${idStudent}`)
    if(res.photo){
        let b64encoded = await btoa(
            new Uint8Array(res.photo.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        let srcBlob = "data:image/jpeg;base64," + b64encoded; 
        return srcBlob
    }
    return ""
}

export async function getEducShDiscipline<T>(idGroup: number, idStudent: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/DiscCopyFromEducSh/getDiscFromEducSh?id_student=${idStudent}&id_group=${idGroup}`)
    return res
}

export async function getSelMarkMag<T>(idGroup: number, idSemester: number, idDiscipline: number, idFormControl: number, idEstimation: number, idStatement: number, kredit: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/AddStudByVedomost/SelMarkMagNew?id_group=${idGroup}&id_semester=${idSemester}&id_discipline=${idDiscipline}&id_examination=${idFormControl}&kredits=${kredit}&id_ebe_var=${idEstimation}&id_f_est=${idStatement}`)
    return res
}

export async function getKvalification<T>(): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/AddDiplom/getDiplomaKval`)
    return res
}

export async function getDiplomGroup<T>(idYear: number, idFaculty: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/AddDiplom/GetGroup?id_a_year=${idYear}&id_faculty=${idFaculty}`)
    return res
}

export async function getDiplomStud<T>(idGroup: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/AddDiplom/GetVypusknik?id_group=${idGroup}`)
    return res
}

export async function getJournal<T>(idYear: number, idWS: number, idFaculty: number, idRate: number): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/ByJurnal/GetInfo?id_a_year=${idYear}&id_w_s=${idWS}&id_faculty=${idFaculty}&id_rate=${idRate}`)
    return res
}

export async function getCheckInsert<T>(idYear: number, idWS: number, idFaculty: number, idRate: number, idGroup: number, idFEduc: number, idEstimation: number, poleMark: string): Promise<any>{
    const res = await queryServer<T[]>(`/avn13/api/AVN13/ByJurnal/GetCheckInsert?id_a_year=${idYear}&id_w_s=${idWS}&id_faculty=${idFaculty}&id_rate=${idRate}&id_group=${idGroup}&id_f_educ=${idFEduc}&id_ebe_var=${idEstimation}&pole_mark_mag=${poleMark}`)
    return res
}



