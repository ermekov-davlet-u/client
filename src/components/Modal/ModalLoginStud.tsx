
import classNames from 'classnames';
import classes from "./Modal.module.scss"
import { IoMdClose } from "react-icons/io"
import { ChangeEvent, useEffect, useState } from 'react';

interface ModalLoginStudPropType{
    show: boolean;
    actionFunc: (form: IFormStud) => void;
    close: ()=> void;
    name: string;
    login: string
}
export interface IFormStud{
    login: string;
    password: string;
}

function ModalLoginStud(
    {
        show,
        actionFunc,
        close,
        name,
        login,
    }:ModalLoginStudPropType
) {

    const [ form, setForm ] = useState<IFormStud>({
        login: "",
        password: "",
    })

    useEffect(() => {
        setForm({
            ...form,
            login: login
        })
    }, [])

    function hundleChangeForm(e: ChangeEvent<HTMLInputElement>){
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    return ( 
        <>
            <div className={classNames(classes.section, classes.full_height)}>
                {/* <IoMdClose className={classes.close} onClick={close} /> */}
                <input className={classes.modal_btn} type="checkbox" checked={show || false} id="modal-btn" name="modal-btn" onChange={() => {}}/>
                {/* <label htmlFor="modal-btn">Удалить <i className={classNames(classes.uil, classes.uil_expand_arrows)}></i></label> 		 */}
                <div className={classes.modal}>		
                    <div className={classes.modal_wrap} style={{ maxWidth: '440px' }}>	
                        <p className={classes.modal_title}>
                            Изменить пароль
                        </p>
                        <p className={classes.line}>
                            <span>
                                ФИО:
                            </span> { name }
                        </p>
                        <p className={classes.line}>
                            <span>
                                Логин:
                            </span>
                        </p>	
                        <input type="text" id='login' name='login' className={classes.modal_inp} value={form.login} onInput={hundleChangeForm}/>
                        <p className={classes.line}>
                            <span>
                                Пароль:
                            </span>
                        </p>	
                        <input placeholder='Новый пароль' type="text" id='pass' name="password" className={classes.modal_inp} value={form.password} onInput={hundleChangeForm}/>
                        <div className={classes.action_btns}>
                            <button className={classNames(classes.action_btn)} onClick={() => {
                                actionFunc(form)
                            }}>
                                Сохранить
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

export default ModalLoginStud;