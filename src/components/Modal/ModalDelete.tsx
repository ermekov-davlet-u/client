
import classNames from 'classnames';
import classes from "./Modal.module.scss"
import { IoMdClose } from "react-icons/io"

interface ModalDeletePropType{
    show: boolean;
    actionFunc: () => void;
    close: ()=> void;
    semester: string;
    discipline: string;
}

function ModalDelete(
    {
        show,
        actionFunc,
        close,
        semester,
        discipline,
    }:ModalDeletePropType
) {
    return ( 
        <>
            <div className={classNames(classes.section, classes.full_height)}>
                {/* <IoMdClose className={classes.close} onClick={close} /> */}
                <input className={classes.modal_btn} type="checkbox" checked={show || false} id="modal-btn" name="modal-btn" onChange={() => {}}/>
                {/* <label htmlFor="modal-btn">Удалить <i className={classNames(classes.uil, classes.uil_expand_arrows)}></i></label> 		 */}
                <div className={classes.modal}>		
                    <div className={classes.modal_wrap} style={{ maxWidth: '400px' }}>	
                        <p className={classes.modal_title}>
                            Удалить запись
                        </p>
                        <p className={classes.line}>
                            {
                                discipline
                            }
                        </p>
                        <p className={classes.line}>
                            {
                                semester
                            }
                        </p>	
                        <div className={classes.action_btns}>
                            <button className={classNames(classes.action_btn, classes.del_btn)} onClick={actionFunc}>
                                Удалить
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

export default ModalDelete;