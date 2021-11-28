const ModeratorNav = props => {
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
