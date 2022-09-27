
import classNames from 'classnames';
import classes from "./Modal.module.scss"

interface ModalConformPropType{
    show: boolean;
    actionFunc: () => void;
    close: ()=> void;
    title?: string
}

function ModalConfirm(
    {
        show,
        actionFunc,
        close,
        title = ""
    }:ModalConformPropType
) {
    return ( 
        <>
            <div className={classNames(classes.section, classes.full_height)}>
                <input className={classes.modal_btn} type="checkbox" checked={show || false} id="modal-btn" name="modal-btn" onChange={() => {}}/>
                <div className={classes.modal}>		
                    <div className={classes.modal_wrap} style={{ maxWidth: '400px' }}>	
                        <p className={classes.modal_title}>
                            Подтвердите действия
                        </p>
                        <p>
                            {
                                title
                            }
                        </p>
                        <div className={classes.action_btns}>
                            <button className={classNames(classes.action_btn, classes.cancel_btn)} onClick={async() => {
                                await actionFunc()
                                close()
                            }}>
                                Подтвердить
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

export default ModalConfirm;