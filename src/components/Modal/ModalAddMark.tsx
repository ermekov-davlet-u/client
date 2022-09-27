
import classNames from 'classnames';
import { ActionMeta, SingleValue } from 'react-select';
import { IUniversalSelectType } from '../../store/models/directory';
import classes from "./Modal.module.scss"
import UXSelect from "../Select/index"
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { ChangeEvent, useEffect, useState } from 'react';
import useDirectory from '../../service/redux/directory';
import { queryServer } from '../../hooks/fetch';
import useStudQuery from '../../service/redux/main';
import { ToastContainer, toast } from 'react-toastify';
import { setLoading } from '../../store/slice/loadingSlice';

interface ModalDeletePropType{
    show: boolean;
    idGroup: number;
    idStud: number;
    close: () => void;
}

interface IFormCreateMark{
    discipline: IUniversalSelectType;
    semester: IUniversalSelectType;
    formControl: IUniversalSelectType;
    grade: IUniversalSelectType;
    statement: IUniversalSelectType;
    kredit: string;
    ball: string;
}

function ModalAddMark(
    {   
        close,
        show,
        idGroup,
        idStud
    }:ModalDeletePropType
) {

    const { semesters, disciplines, estimation, statements, formControls } = useAppSelector(state => state.studentMarks)
    const { setNewDisciplines, setNewSemesters, setNewFormControl, setNewGrade, setNewStatement } = useDirectory()
    const notify = () => toast.success("успешно добавлено!");
    const worning = () => toast.warning("Заполните все поля!");
    const error = () => toast.error("Не удалось добавить запись!");
    const dispatch = useAppDispatch();
    const [ state, setState ] = useState<IFormCreateMark>({
        discipline: {value: 0,label: "Не выбрано" },
        semester: {value: 0,label: "Не выбрано" },
        formControl: {value: 0,label: "Не выбрано" },
        grade: {value: 0,label: "Не выбрано" },
        statement: {value: 0,label: "Не выбрано" },   
        kredit: "",
        ball: ""
    })

    function changeForm( key: keyof IFormCreateMark, value: IUniversalSelectType){
        switch(key) {
            case "discipline": setState({ 
                ...state,
                discipline: value
            });
            setState({
                ...state,
                [key]: value
            })
            setNewSemesters()
            break;
            case "semester": setState({ 
                ...state,
                semester: value
                });
                setState({
                    ...state,
                    [key]: value
                })
            setNewFormControl()
            break;
            case "formControl": setState({ 
                ...state,
                formControl: value
            });
            setState({
                ...state,
                [key]: value
            })
            setNewGrade(value.value)
            break;
            case "grade": setState({ 
                ...state,
                grade: value
            });
            setState({
                ...state,
                [key]: value
            })
            setNewStatement()
            break;
            case "statement": setState({ 
                ...state,
                statement: value
            });
            break;  
        }
    }
    function changeKreditForm(e: ChangeEvent<HTMLInputElement>){
        setState({
            ...state,
            kredit: e.target.value
        })
    }
    function changeBallForm(e: ChangeEvent<HTMLInputElement>){
        setState({
            ...state,
            ball: e.target.value
        })
    }
    const { setNewMarksByStudent } = useStudQuery()

    useEffect(() => {
         setNewDisciplines()
    }, [])

    async function createNew () {
        if(
            !state.discipline.value ||
            !state.semester.value ||
            !state.formControl.value ||
            !state.grade.value ||
            !state.statement.value ||
            !state.kredit ||
            !state.ball 
        ){
            worning()
            return 
        }

        const res: { result: boolean } = await queryServer(`http://localhost:3113/avn13/api/AVN13/Addstaticmark/addStaticmark?id_group=${idGroup}&id_student=${idStud}&id_discipline=${state.discipline.value}&id_semester=${state.semester.value}&id_examination=${state.formControl.value}&id_estimation=${state.grade.value}&id_f_est=${state.statement.value}&kredits=${state.kredit}&ball=${state.ball}`, "GET")    
        await close()
        if(res.result){
            await dispatch(setLoading(true))
            await setNewMarksByStudent(idGroup, idStud)
            await setState({
                discipline: {value: 0,label: "Не выбрано" },
                semester: {value: 0,label: "Не выбрано" },
                formControl: {value: 0,label: "Не выбрано" },
                grade: {value: 0,label: "Не выбрано" },
                statement: {value: 0,label: "Не выбрано" },   
                kredit: "",
                ball: ""
            })
            await notify()
            await dispatch(setLoading(false))
        }else{
            error()
        }
    }
    

    return ( 
        <>
        <ToastContainer />
            <div className={classNames(classes.section, classes.full_height)}>
                {/* <IoMdClose className={classes.close} onClick={close} /> */}
                <input className={classes.modal_btn} type="checkbox" checked={show || false} id="modal-btn" name="modal-btn" onChange={() => {}}/>
                {/* <label htmlFor="modal-btn">Удалить <i className={classNames(classes.uil, classes.uil_expand_arrows)}></i></label> 		 */}
                <div className={classes.modal}>		
                    <div className={classes.modal_wrap}>	
                        <p className={classes.modal_title}>
                            Добавить запись
                        </p>
                        <div className={classes.slect_row}>
                            <UXSelect label="Дисциплина" dsbl={true} value={state.discipline} options={ disciplines } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                changeForm("discipline", newValue!)
                            }} />
                            <UXSelect label="Семестр" dsbl={!!state.discipline.value} value={state.semester} options={ semesters } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                changeForm("semester", newValue!)
                            }} />
                        </div>
                        <div className={classes.slect_row}>
                            <UXSelect label="Форма контроля" dsbl={!!state.semester.value} value={state.formControl} options={ formControls } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                    changeForm("formControl", newValue!)
                                }} />
                            <UXSelect label="Оценка" dsbl={!!state.formControl.value} value={state.grade} options={ estimation } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                    changeForm("grade", newValue!)
                                }} />
                        </div>
                        <div className={classes.slect_row}>
                            <UXSelect label="Форма ведомости" dsbl={!!state.grade.value} value={state.statement} options={ statements } hundleChange={(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                    changeForm("statement", newValue!)
                                }} />
                        </div>
                        <div className={classes.slect_row}>
                            <input placeholder='Количество кредитов' min={0} max={30} type="number" className={classes.modal_inp} name="" id="" value={state.kredit} onInput={changeKreditForm} />
                            <input placeholder='Балл' type="number" min={0} max={100} className={classes.modal_inp} name="" id="" value={state.ball} onInput={changeBallForm} />
                        </div>
                        <div className={classes.action_btns} style={{ justifyContent: 'flex-end' }}>
                            <button className={classNames(classes.action_btn, )} onClick={createNew}>
                                Добавить
                            </button>   
                            <button className={classNames(classes.action_btn, classes.cancel_btn)} onClick={close}>
                                Отмена
                            </button> 
                        </div>          		
                    </div>			          		
                </div>		
            </div>
        </>
     );
}

export default ModalAddMark;