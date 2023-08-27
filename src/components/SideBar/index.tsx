import React from "react";
import "./style.css";

import LogoMobile from "../../assets/logos/logo-mobile.png";

import { NavLink } from "react-router-dom";

import { Sidebar } from "primereact/sidebar";

const SideBar = ({ active, setActive }) => {
  const item = [
    {
      section: "Páginas",
      items: [
        { label: "Produtos", to: "products-page" },
        { label: "Certificações", to: "certification-page" },
        { label: "Sobre nós", to: "about-us-page" },
        { label: "Home", to: "home-page" },
      ],
    },
    { section: "Items", items: [{ label: "Produtos", to: "products" }] },
  ];

  const customHeader = (
    <img src={LogoMobile} alt="" srcSet="logo artecal" className="w-12" />
  );

  return (
    <>
      <div className={`container-side-bar ${active ? "active" : ""}`}>
        {item.map((item) => {
          return (
            <div key={item.section} className="mb-2">
              <p className="section">{item.section}</p>
              <div className="grid gap-2">
                {item.items.map((link) => {
                  return (
                    <NavLink
                      key={item.section + link.label}
                      to={link.to}
                      className={({ isActive }) =>
                        isActive ? "active-nav-link" : "link"
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Sidebar
        visible={!active}
        onHide={() => setActive((e: boolean) => !e)}
        maskClassName="sidebar-mobile"
        icons={customHeader}
      >
        {item.map((item) => {
          return (
            <div key={item.section} className="mb-2">
              <p className="section">{item.section}</p>
              <div className="grid gap-2">
                {item.items.map((link) => {
                  return (
                    <NavLink
                      key={item.section + link.label}
                      to={link.to}
                      className={({ isActive }) =>
                        isActive ? "active-nav-link" : "link"
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Sidebar>
    </>
  );
};

export default SideBar;
