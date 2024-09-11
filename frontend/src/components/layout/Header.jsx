import React from "react";
import { useGetEmployeeProfileQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";

const Header = () => {
  const navigate = useNavigate();

  const { isLoading } = useGetEmployeeProfileQuery();

  const [logout, { data} ] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    logout();
    //Refresh page
    navigate(0);
  };

  return (
    <nav className="navbar row">

      <div className="col-6 col-md-3 mt-2 mt-md-0">
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {user ? (
            <Link to="/login" className="btn ms-4" id="logout_btn" onClick={logoutHandler}>
                Logout{" "}
                </Link>
        ) : (
            !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
                {" "}
                Login{" "}
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
