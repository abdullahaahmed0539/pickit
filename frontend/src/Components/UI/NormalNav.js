import { NavLink } from "react-router-dom";

const NormalNav = props => {
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
          <ul class="navbar-nav">
            <li class="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/Home">
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={`/${props.userId}/get_products`}
              >
                MyAds
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Profile
              </NavLink>
            </li>
          </ul>
          <span class="navbar-text  d-none d-md-block  ms-auto me-5">
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
