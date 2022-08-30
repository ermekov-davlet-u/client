
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
import { newEducSh } from '../../store/slice/educShSlice';
import { useAppDispatch } from './../../store/hook';

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

function ModalAddEducPlan(
    {   
        close,
        show,
        idGroup,
        idStud
    }:ModalDeletePropType
) {

    const { educSh } = useAppSelector(state => state.educSh)
    const dispatch = useAppDispatch()
    const { setNewDisciplines, setNewSemesters, setNewFormControl, setNewGrade, setNewStatement } = useDirectory()
    const notify = () => toast("успешно добавлено!");
    const worning = () => toast.warning("Заполните все поля!");
    const error = () => toast.error("Не удалось добавить запись!");

    
    const { setNewEducSh } = useStudQuery()

    useEffect(() => {
        setNewEducSh(idGroup, idStud)
    }, [idStud])

    async function createNew () {
        

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
                                                <input type="checkbox" onClick={() => {

                                                }} />
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