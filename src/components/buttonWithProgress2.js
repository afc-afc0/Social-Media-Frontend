
const ButtonWithProgress2 = (props) => {
    const {onClick, loading, disabled, text} = props;
    
    return (
        <div className="text-center">
            <button className="btn btn-secondary" onClick={onClick} disabled={disabled}>
            {loading && <span className="spinner-border spinner-border-sm"></span>} {text} 
            </button>
        </div>
    );
}

export default ButtonWithProgress2;