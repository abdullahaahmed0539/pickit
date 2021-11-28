const LoginNav = props => {
    return (
      <>
        <button
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="navbar">
          <button
            className="btn btn-dark btn-outline-light ms-auto"
            onClick={props.userAccess}
          >
            Log In
          </button>
        </div>
      </>
    );
}

export default LoginNav
