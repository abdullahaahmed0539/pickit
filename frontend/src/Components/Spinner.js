const Spinner = props => {
    return <div className="d-flex justify-content-center" style={{marginTop:'25%'}}>
        <div style={{marginRight:'4px'}}>{props.text}</div>
        <div className="spinner-border" role="status">
    </div>
</div>
}

export default Spinner;