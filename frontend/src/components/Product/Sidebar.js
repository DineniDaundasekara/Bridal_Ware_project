
import { NavLink } from "react-router-dom";
import { FaAngleDown, FaBars, FaHome, FaUser, FaLock, FaMoneyBill , FaBox ,FaClipboardList} from "react-icons/fa";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { BsPeopleFill,BsClipboardPlusFill } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { LuMessagesSquare } from "react-icons/lu";

import React, { useState, useEffect, useRef } from 'react';
import MSRLogo from '../../res/MSRLogo.png';


const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const routes = [
  {
    path: "/AdminDashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  
  {
    path: "/user/dashboard",
    name: "Users",
    icon: <FaUser />,
    exact: true,
    subRoutes: [{
       path: "/user/dashboard",
        name: "Dashboard",
        icon: <FaHome />,
    },
      {
        path: "/user/all",
        name: "Customer Accounts",
        icon: <FaBox />,
      },
      {
        path: "/employee/allAccounts",
        name: "Employee Accounts",
        icon: <FaLock />,
      },
    ],
  },
  {
    path: "/product/dashboard",
    name: "Product",
    icon: <BsClipboardPlusFill />,
    exact: true,
    subRoutes: [{
       path: "/product/dashboard",
        name: "Dashboard",
        icon: <FaHome />,
    },
      {
        path: "/product/add",
        name: "Add Product ",
        icon: <FaBox />,
      },
      {
        path: "/product/all",
        name: "Preview All",
        icon: <FaLock />,
      },
      // {
      //   path: "/product/generate-report",
      //   name: "Report",
      //   icon: <FaClipboardList />,
      // },
    ],
  },

  {
    path: "/ReportOrder",
    name: "Orders & Rentals",
    icon: <BsCartCheck />,
    exact: true,
    subRoutes: [
      {
        path: "/ReportOrder",
        name: "Dashboard",
        icon: <FaHome />,
      },
      {
        path: "/AddOrderNewUser",
        name: "Add",
        icon: <FaBox />,
      },
      {
        path: "/ManageOrder",
        name: "Manage",
        icon: <FaLock />,
      },
      {
        path: "/ReportOrder",
        name: "Report",
        icon: <FaClipboardList />,
      },
    ],
  },
  {
    path: "/inquiry/dashboard",
    name: "Inquiries",
    icon: <LuMessagesSquare />,
    exact: true,
    subRoutes: [{
       path: "/inquiry/dashboard",
        name: "Dashboard",
        icon: <FaHome />,
    },
      {
        path: "/inquiry/hradmin/inquiries",
        name: "View Inquiries ",
        icon: <FaBox />,
      },

      {
        path: "/inquiry/report",
        name: "Report",
        icon: <FaClipboardList />,
      },
    ],
  },
  {
    path: "/inventory/dashboard",
    name: "Inventory",
    icon: <BiSolidSpreadsheet />,
    exact: true,
    subRoutes: [{
       path: "/inventory/dashboard",
        name: "Dashboard",
        icon: <FaHome />,
    },
      {
        path: "/inventory/all",
        name: "Manage Inventory",
        icon: <FaBox />,
      },

      {
        path: "/inventory/addinventory",
        name: "Add Inventory",
        icon: <FaBox />,
      },

      {
        path: "/inventory/report",
        name: "Report",
        icon: <FaClipboardList />,
      },
    ],
  },
  {
    path: "/employee/dashboard",
    name: "Employees",
    icon: <BsPeopleFill />,
    exact: true,
    subRoutes: [{
       path: "/employee/dashboard",
        name: "Dashboard",
        icon: <FaHome />,
    },
      
      {
        path: "/employee/add",
        name: "Add Employees",
        icon: <FaClipboardList />,
      },

      {
        path: "/employee/all",
        name: "All Employees List",
        icon: <FaClipboardList />,
      },

      {
        path: "/employee/admin/leave",
        name: "All Leaves",
        icon: <FaBox />,
      },
                 {
        path: "/employee/salary",
        name: "Salary Details",
        icon: <FaBox />,
      },
      
      {
        path: "/employee/addBonus",
        name: "Add Bonus Salary",
        icon: <FaClipboardList />,
      },
      
      // {
      //   path: "/employee/report",
      //   name: "Salary Report",
      //   icon: <FaBox />,
      // },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  

  return (
    <>
    
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
          style={{backgroundColor:"#5B3E31"}}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                 Menu
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
         
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <> 
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="link_text"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <NavLink to={subRoute.path} className="link">
                  <div className="icon">{subRoute.icon}</div>
                  <motion.div className="link_text">{subRoute.name}</motion.div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

    





export default SideBar;
