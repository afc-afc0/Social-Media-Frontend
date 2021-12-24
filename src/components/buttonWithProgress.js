
const ButtonWithProgress = (props) => {
    const {onClick, pendingApiCall, disabled, text, className} = props;

    return (
        <button className={className || "btn btn-secondary"} onClick={onClick} disabled={disabled}>
            {pendingApiCall && (<span className="spinner-border spinner-border-sm"></span>)} {" "} {text} 
        </button>
    );
}

export default ButtonWithProgress;