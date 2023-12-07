import React, { useEffect } from "react";
import "../index.css";
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
function Navbar() {
  const user = localStorage.getItem("user");

  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <div style={{backgroundColor : "#edf7fa"}}>
      <nav
        className="navbar navbar-expand-lg bg-blue-900"
        // style={{ backgroundColor: "#2e94b9" }}
      >
        <a class="navbar-brand animate-pulse" href="/">
          Khách sạn Vinpearl Đà Nẵng
        </a>

        <div
          class="collapse navbar-collapse justify-content-end px-4 outline-0"
          id="navbarNav"
        >
          <ul className="navbar-nav mr-4 outline-0">
            {user ? (
              <div className="outline-0">
                <div class="dropdown show">
                  <a
                    class="btn btn-secondary uppercase dropdown-toggle bg-dark"
                    href="#"
                    outline-0
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user}
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <FontAwesomeIcon icon="fas fa-user" />
                    <a class="dropdown-item" href="/profile">
                      Xem thông tin
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Đăng xuất
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link text-white bg-blue-600 mx-2 rounded-lg p-2" href="/register">
                    Đăng ký
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white bg-blue-600 rounded-lg p-2" href="/login">
                    Đăng nhập
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
