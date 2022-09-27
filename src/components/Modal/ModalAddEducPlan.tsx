
import classNames from 'classnames';
import classes from "./Modal.module.scss"
import { useAppSelector } from '../../store/hook';
import { ChangeEvent, useEffect, useState } from 'react';
import { queryServer } from '../../hooks/fetch';
import useStudQuery from '../../service/redux/main';
import { ToastContainer, toast } from 'react-toastify';
import { newEducSh } from '../../store/slice/educShSlice';
import { useAppDispatch } from './../../store/hook';
import { IEducSh } from './../../store/models/student';
import { setLoading } from '../../store/slice/loadingSlice';

interface ModalDeletePropType{
    show: boolean;
    idStud: number;
    idGroup: number;
    close: () => void;
}

interface IFormCreate{
    id_group: number;
    id_student: number;
    newVals: IEducSh[];
}

function ModalAddEducPlan(
    {   
        close,
        show,
        idGroup,
        idStud
    }:ModalDeletePropType
) {

    const [ form, setForm ] = useState<IFormCreate>({
        id_group: 0,
        id_student: 0,
        newVals: []
    })
    const { educSh } = useAppSelector(state => state.educSh)
    const dispatch = useAppDispatch()
    const notify = () => toast.success("успешно добавлено!");
    const worning = () => toast.warning("Заполните все поля!");
    const error = () => toast.error("Не удалось добавить запись!");
    
    const { setNewEducSh, setNewMarksByStudent } = useStudQuery()

    useEffect(() => {
        setNewEducSh(idGroup, idStud)
        setForm({
            id_student: idStud,
            id_group: idGroup,
            newVals: []
        })
    }, [idStud])

    async function createNew () {
        const res: { result: string } = await queryServer("http://localhost:3113/avn13/api/AVN13/DiscCopyFromEducSh/addDiscfromeducsh", "post", form)
        close()
        if(res.result){
            await dispatch(setLoading(true))
            await setForm({
                ...form,
                newVals: []
            })
            await dispatch(newEducSh([]))
            await notify()
            await setNewMarksByStudent(idGroup, idStud)
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
                        <ul className={classes.list}>
                            {
                                educSh.map( item => {
                                    return <li className={classes.list_item}>
                                                <input type="checkbox" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if( e.target.checked ){
                                                        const newval: IEducSh = item
                                                        setForm({
                                                            ...form,
                                                            newVals:[
                                                                ...form.newVals,
                                                                newval
                                                            ]
                                                        })
                                                    }else{
                                                        const  newVals =  form.newVals.filter(elem => elem.id_discipline !== item.id_discipline)
                                                        setForm({
                                                            ...form,
                                                            newVals: newVals
                                                        })
                                                    }
                                                }}/>
                                                {
                                                    item.p34
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
                                close();
                                dispatch(newEducSh([]))
                                setForm({
                                    ...form,
                                    newVals: []
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

export default ModalAddEducPlan;