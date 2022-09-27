
import classNames from 'classnames';
import classes from "./Modal.module.scss"

interface ModalDeletePropType{
    show: boolean;
}

function ModalLoading(
    {
        show,
    }:ModalDeletePropType
) {
    return ( 
        <>
            <div className={classNames(classes.section, classes.full_height)}>
                <input className={classes.modal_btn} type="checkbox" checked={show || false} id="modal-btn" name="modal-btn" onChange={() => {}}/>
                <div className={classes.modal}>		
                    <div className={classes.modal_wrap} style={{ maxWidth: '400px' }}>	
                        <p className={classes.modal_title}>
                            Идет загрузка... 
                        </p>
                    </div>			          		
                </div>		
            </div>
        </>
     );
}

export default ModalLoading;