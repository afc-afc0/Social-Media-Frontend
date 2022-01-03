import React from 'react'
import ButtonWithProgress from './ButtonWithProgress';

const Modal = (props) => {
    
    const { visible, onClickCancel, message, onClickOk, pendingApiCall } = props;


    let className = "modal fade";
    if (visible) {
        className += " show d-block";
    }

    console.log(pendingApiCall);

    return (
        <div className={className} style={{backgroundColor: "#000000b0"}}  >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Post</h5>
                    </div>
                    <div className="modal-body"><p>{message}</p></div>
                    <div className="modal-footer">
                        <ButtonWithProgress 
                            className="btn btn-danger" 
                            onClick={onClickOk} 
                            pendingApiCall={pendingApiCall} 
                            disabled={pendingApiCall}
                            text={"Delete Post"} 
                        />
                        <button type="button" className="btn btn-secondary" onClick={onClickCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
