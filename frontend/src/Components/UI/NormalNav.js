import { NavLink, withRouter } from "react-router-dom";


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
              Ads
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to={`/orders`}>
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to={`/requests/sent/${props.userId}`}
            >
              Track requests
            </NavLink>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
        </ul>

        <span className="navbar-text  d-none d-md-block  ms-auto me-5">
          Welcome {localStorage.getItem("username")}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <button
          className="btn btn-dark btn-outline-light"
          onClick={() => {
            props.history.push('/cart')
          }}
        >
          Cart
        </button>
        <button
          className="btn btn-dark btn-outline-light"
          onClick={props.userAccess}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default withRouter(NormalNav);
