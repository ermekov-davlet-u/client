

export interface IStudentType{
    id_student: number
    s_fio: string
}

export interface IStudentGrade{
    N: number
    ball: number
    byDFS: number
    byEducSh: number
    dopusk_izm: boolean
    id_discipline: number
    id_ebe_var: number
    id_estimation: number
    id_examination: number
    id_f_est: number
    id_group: number
    id_mark_mag: number
    id_poseshal: number
    id_semester: number
    id_student: number
    id_teacher: number
    isStaticDiscipline: boolean
    k_count: number
    kredits: number
    p30: string
    p34: string
    p36: string
    primech: string
}

export interface IEducSh{
    id_a_year: number
    id_bk: number
    id_discipline: number
    id_ebe_var: number
    id_examination: number
    id_faculty: number
    id_group: number
    id_rate: number
    id_semester: number
    id_student: number
    isChecked: number
    krdt: number
    p34: string
    semXXdiscXXexamXXkrdt: string
}

export interface ISelMarkMag{
    ball: number
    id_f_est: number
    id_mark_mag: number
    id_student: number
    isChecked: number
    s_fio: string
}

export interface IDiplom{
    dataDecisionGAK: Date | null
    dateGive: Date | null
    excellent: boolean
    id_diplom: number
    id_diploma_kval: number | null
    id_group: number
    id_student: number
    number: number | null
    regnumber: number | null
    s_fio: string
    seria: string | null
    themeVKR: string | null
}

export interface IJournal{
    AVN_update: Date
    beg_date: Date
    end_date: Date
    id_ebe_var: number
    name_pole: string
    p20: string
    p108: string
}