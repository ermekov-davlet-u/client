
import classNames from 'classnames';
import { ActionMeta, SingleValue } from 'react-select';
import { IUniversalSelectType } from '../../store/models/directory';
import classes from "./Modal.module.scss"
import UXSelect from "../Select/index"
import { useAppSelector } from '../../store/hook';
import { ChangeEvent, useEffect, useState } from 'react';
import useDirectory from '../../service/redux/directory';
import { queryServer } from '../../hooks/fetch';
import useStudQuery from '../../service/redux/main';
import { ToastContainer, toast } from 'react-toastify';
import { ISelectFormType } from '../../hooks/select';
import { useAppDispatch } from './../../store/hook';
import { newSelMarkMag } from '../../store/slice/selMerkMagSlice';
import { setLoading } from '../../store/slice/loadingSlice';

interface ModalDeletePropType{
    show: boolean;
    idGroup: number;
    close: () => void;
    selectValue: ISelectFormType
}



interface ISelMarkMag{
    ball: number
    id_f_est: number
    id_mark_mag: number
    id_student: number
    isChecked: number
    s_fio: string
}

interface IForm {
    id_ebe_var: number
    id_f_estSelect: IUniversalSelectType
    id_f_est: number
    newvals: ISelMarkMag[],
}

function ModalAddstudByStatement(
    {   
        close,
        show,
        selectValue
    }:ModalDeletePropType
) {
    const dispatch = useAppDispatch()
    const { selMarkMag } = useAppSelector(state => state.selMarkMag)
    const { statements } = useAppSelector(state => state.studentMarks)
    const [ state, setState ] = useState<IForm>({
        id_ebe_var: 0,
        id_f_estSelect: {value: 0,label: "Не выбрано"},
        id_f_est: 0,
        newvals:[]
    })

    const { setNewMarks, setNewStatement } = useDirectory()
    const notify = () => toast("успешно добавлено!");
    const worning = () => toast.warning("Заполните все поля!");
    const error = () => toast.error("Не удалось добавить запись!");
    
    const { setNewSelMarkMag } = useStudQuery()

    useEffect(() => {
        setNewStatement()
        setState({
            ...state,
            id_ebe_var: selectValue.estimate.value
        })
    }, [])

    async function createNew () {
        if(!state.id_f_est){
            return
        }
        const res: { result: boolean } = await queryServer("http://localhost:3113/avn13/api/AVN13/AddStudByVedomost/addStudentByVedomost", "POST", state)
        close()
        if(res.result){
            await dispatch(setLoading(true))
            await setNewMarks( selectValue.formControl.value, selectValue.estimate.value, selectValue.group.value, selectValue.semester.value, selectValue.discipline.Kredits, selectValue.year.value, selectValue.discipline.value, selectValue.statement.value)
            await notify()
            await dispatch(newSelMarkMag([]))
            await setState({
                id_ebe_var: 0,
                id_f_estSelect: {value: 0,label: "Не выбрано"},
                id_f_est:0,
                newvals:[]
            })
            setNewStatement(selectValue.formControl.value, selectValue.group.value, selectValue.semester.value, selectValue.discipline.value)
            await dispatch(setLoading(false))
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
                    <div className={classes.modal_wrap} style={{minHeight: "450px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between"}}>	
                        <div className={classes.slect_row} style={{flexDirection: "column", alignItems: "flex-start"}}>
                            <p className={classes.modal_title} style={{marginBottom: "18px"}}>
                                Добавить запись
                            </p>
                            <UXSelect label="Форма ведомости" dsbl={true} value={state.id_f_estSelect} options={ statements } hundleChange={async(newValue: SingleValue<IUniversalSelectType>, actionMeta: ActionMeta<IUniversalSelectType> ) => {
                                await dispatch(newSelMarkMag([]))
                                if(newValue){
                                    setNewSelMarkMag( selectValue.group.value , 
                                        selectValue.semester.value , 
                                        selectValue.discipline.value, 
                                        selectValue.formControl.value, 
                                        selectValue.estimate.value, 
                                        newValue.value, 
                                        selectValue.discipline.Kredits )
                                    setState({
                                        ...state,
                                        id_f_est: newValue.value,
                                        id_f_estSelect: newValue,
                                        newvals:[]
                                    })
                                }
                            }} />
                        </div>
                        <ul className={classes.list}>
                            {
                                selMarkMag.map( item => {
                                    return <li className={classes.list_item}>
                                                <input type="checkbox" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if( e.target.checked ){
                                                        const newval: ISelMarkMag = {
                                                            ball: item.ball ,
                                                            id_f_est: item.id_f_est,
                                                            id_mark_mag: item.id_mark_mag,
                                                            id_student: item.id_student,
                                                            isChecked: item.isChecked,
                                                            s_fio: item.s_fio
                                                        }
                                                        setState({
                                                            ...state,
                                                            newvals:[
                                                                ...state.newvals,
                                                                newval
                                                            ]
                                                        })
                                                    }else{
                                                        const  newVals =  state.newvals.filter(elem => elem.id_student !== item.id_student)
                                                        setState({
                                                            ...state,
                                                            newvals: newVals
                                                        })
                                                    }
                                                }} />
                                                {
                                                    item.s_fio
                                                }
                                            </li>
                                } )
                            }
                        </ul>
                        <div className={classes.action_btns} style={{ justifyContent: 'flex-end' }}>
                            <button className={classNames(classes.action_btn, )} onClick={createNew}>
                                Добавить
                            </button>   
                            <button className={classNames(classes.action_btn, classes.cancel_btn)} onClick={() => {
                                    close()
                                    dispatch(newSelMarkMag([]))
                                    setState({
                                            id_ebe_var: 0,
                                            id_f_estSelect: {value: 0,label: "Не выбрано"},
                                            id_f_est:0,
                                            newvals:[]
                                        })
                                }}>
                                Отмена
                            </button> 
                        </div>          		
                    </div>			          		
                </div>		
            </div>
        </>
     );
}

export default ModalAddstudByStatement;