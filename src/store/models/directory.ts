

export interface IYearType{
    
}

export interface IUniversalSelectType{
    value: number,
    label: string,
    disabled?: boolean
    Kredits?: number
}

export interface GradeType extends IUniversalSelectType{
    beg_bal: number
    end_bal: number
    id_estimation: number
    id_examination: number
    p31: string
}

export interface IRrnPermission {
    id_teacher: number
    s_t_fio: string
    t_fio: string
}

export interface IDisciplinesType extends IUniversalSelectType{
    Kredits: number
}

export interface IEstCinfig{
    formula: string
    id_ebe_var: number
    id_est_config: number
    id_f_est: number
    info_or_value: number
    max: number
    min: number
    min_start: null
    name_pole: string
    order_pole: number
    pole_mark_mag: string
}

export interface IMarks {
    AVN_update: Date
    AVN_user: string
    ball: number
    dop: number
    dop2: number
    dopusk_izm: boolean
    estimation_other: null
    id_a_year: number
    id_bk: number
    id_discipline: number
    id_ebe_var: number
    id_estimation: number
    id_estimation_other: null
    id_examination: number
    id_f_est: number
    id_faculty: number
    id_group: number
    id_mark_mag: number
    id_poseshal: number
    id_semester: number
    id_student: number
    id_teacher: number
    isStaticDiscipline: boolean
    isStudying: true
    k_count: number
    kredits: number
    m1: number
    m2: number
    m3: number
    m4: number
    m5: number
    m6: number
    m7: number
    m8: number
    m9: number
    m10: number
    m11: number
    m12: number
    oper: string
    otkuda: any
    p31: string
    p35: string
    p36: string
    primech: string
    s_fio: string
    s_t_fio: string
    u_date: Date
}

export interface IStundentLogPass {
    id_student: number
    idid: string
    login: string
    s_fio: string
} 