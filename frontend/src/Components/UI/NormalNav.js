import { NavLink } from "react-router-dom";

const NormalNav = props => {
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/Home">
                Home
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={`/${props.userId}/get_products`}
              >
                MyAds
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
          </ul>
          <span className="navbar-text  d-none d-md-block  ms-auto me-5">
            Welcome {localStorage.getItem("username")}
          </span>
          <button
            className="btn btn-dark btn-outline-light"
            onClick={props.userAccess}
          >
            Log out
          </button>
        </div>
      </>
    );
}

export default NormalNav
