import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideMenu = () => {
    const menuItems = [
        {
            name: "Home",
            url: "/home",
        },
        {
            name: "Coaches",
            url: "/employees",
        },
        {
            name: "Customers",
            url: "/customers",
        },
        {
            name: "Statistics",
            url: "/statistics",
        },
        {
            name: "Tips",
            url: "/tips",
        },
        {
            name: "Events",
            url: "/events",
        },
        {
          name: "Compatiblity",
          url: "/compatibility",
        },
        {
          name: "Clothes",
          url: "/clothes"
        }
    ];
    const location = useLocation();

    const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const handleMenuItemClick = (menuItemUrl) => {
      setActiveMenuItem(menuItemUrl);
    };

    const toggleNav = () => {
      setIsNavVisible(!isNavVisible)
    };

    return (
      <>
      {/* {isNavVisible && (
        <div className="list-group mt-5 pl-4">
          {menuItems.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.url}
              className={`fw-bold list-group-item list-group-item-action ${
                activeMenuItem.includes(menuItem.url) ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick(menuItem.url)}
              aria-current={
                activeMenuItem.includes(menuItem.url) ? "true" : "false"
              }
            >
              <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
            </Link>
          ))}
        </div>
      )}
      <button className="button-toggle" onClick={toggleNav}>
        {isNavVisible ? '<' : '>'}
      </button> */}
    </>
    );
  };

  export default SideMenu;