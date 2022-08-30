import { queryServer } from "../hooks/fetch";
import { IUniversalSelectType, IDisciplinesType, IMarks, IEstCinfig, IRrnPermission, GradeType } from './../store/models/directory';

export async function getFaculty(){
    const faculty = await queryServer<IUniversalSelectType[]>("http://localhost:3113/avn13/api/AVN13/formask/getFacultyes")
    return faculty
}

export async function getYears(){
    const years = await queryServer<IUniversalSelectType[]>("http://localhost:3113/avn13/api/AVN13/formask/getYears")
    return years
}

export async function getRate(){
    const res = await queryServer<IUniversalSelectType[]>("http://localhost:3113/avn13/api/AVN13/formask/getRates")
    return res
}

export async function getGroups( idFaculty:number, idYear: number, idRate: number ){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getGroups?id_faculty=${idFaculty}&id_a_year=${idYear}&id_rate=${idRate}`)
    return res
}

export async function getSemesters( idRate: number ){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getSemesters?id_rate=${idRate}`)
    return res
}

export async function getAllSemesters(){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/ByStudent/getSemesters`)
    return res
}

export async function getDisciplines( idGroup: number, idSemester: number ){
    const res = await queryServer<IDisciplinesType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getDisciplines?id_group=${idGroup}&id_semester=${idSemester}`)
    return res
}

export async function getAllDisciplines(){
    const res = await queryServer<IDisciplinesType[]>(`http://localhost:3113/avn13/api/AVN13/Addstaticmark/getDisciplines`)
    return res
}

export async function getExaminations( idGroup: number, idDisciplines: number, idSemester: number, idKredits: number){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getExaminations?id_discipline=${idDisciplines}&id_semester=${idSemester}&id_group=${idGroup}&Kredits=${idKredits}`)
    return res
}

export async function getAllExaminations(){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/Addstaticmark/getExaminations`)
    return res
}

export async function getRrnkPps(idDisciplines: number, idYear: number){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getRrnkPps?id_discipline=${idDisciplines}&id_a_year=${idYear}`)
    return res
}

export async function getEbevars(idDisciplines: number, idExaminations: number, idGroup: number, idSemester: number){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getEbevars?id_discipline=${idDisciplines}&id_examination=${idExaminations}&id_group=${idGroup}&id_semester=${idSemester}`)
    return res
}

export async function getEstbegend(idExaminations: number, idEbevar: number){
    const res = await queryServer<GradeType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getEstbegend?id_examination=${idExaminations}&id_ebe_var=${idEbevar}`)
    return res
}

export async function getEstimations(){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/Addstaticmark/getEstimations?id_examination=2`)
    return res
}

export async function getEstOther(idEbevar: number){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getEstOther?id_ebe_var=${idEbevar}`)
    return res
}

export async function getFests(idExaminations: number, idGroup: number, idSemester: number, idDisciplines: number) {
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getFests?id_group=${idGroup}&id_semester=${idSemester}&id_discipline=${idDisciplines}&id_examination=${idExaminations}`)
    return res
}

export async function getAllFests() {
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/ByStudent/getFests`)
    return res
}


export async function getEstconfig(idEbevar: number, idFests: number){
    const res = await queryServer<IEstCinfig[]>(`http://localhost:3113/avn13/api/AVN13/formask/getEstconfig?id_ebe_var=${idEbevar}&id_f_est=${idFests}`)
    return res
}

export async function getRrnkPermis(idDiscipline: number, idYear: number){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getRrnkPps?id_discipline=${idDiscipline}&id_a_year=${idYear}`)
    return res
}

export async function getMarks(idExaminations: number, idEbevar: number, idGroup: number, idSemester: number, idKredits: number, idYear: number, idDiscipline: number, idStatement: number){
    const res = await queryServer<IMarks[]>(`http://localhost:3113/avn13/api/AVN13/formask/getMarks?id_group=${idGroup}&id_examination=${idExaminations}&id_discipline=${idDiscipline}&id_semester=${idSemester}&id_f_est=${idStatement}&kredits=${idKredits}&id_a_year=${idYear}&id_ebe_var=${idEbevar}`)
    return res
}

export async function getCanChangeDopusk(){
    const res = await queryServer<boolean>(`http://localhost:3113/avn13/api/AVN13/formask/getCanChangeDopusk`)
    return res
}

export async function getDiplomPermis(idEbevar: number, idFests: number){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getDiplomPermis`)
    return res
}

export async function getEe(idEbevar: number, idFests: number){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/formask/getEe`)
    return res
}

export async function getAllEe(){
    const res = await queryServer<IUniversalSelectType[]>(`http://localhost:3113/avn13/api/AVN13/ByStudent/getEe`)
    return res
}
