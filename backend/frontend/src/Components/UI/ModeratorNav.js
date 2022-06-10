const ModeratorNav = props => {
  return (
    <>
      <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbar">
        <button
          className="btn btn-dark btn-outline-light ms-auto mt-auto"
          onClick={props.userAccess}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default ModeratorNav;
