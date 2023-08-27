/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "./style.css";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { OutletContext } from "../Contexts/layoutContext";
import { useAuth } from "../hooks/Auth";

const PrivateRoute = ({ children }: any) => {
  const Auth = useAuth();
  if (!Auth?.token || !Auth?.user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

const LayoutPanel = () => {
  const [active, setActive] = React.useState(true);

  const handlerSideBar = React.useCallback(() => {
    setActive((e: boolean) => !e);
  }, []);

  return (
    <PrivateRoute>
      <Header onClickFunction={handlerSideBar} />
      <div className="layout-panel">
        <SideBar active={active} setActive={setActive} />
        <div className={`w-full container-fluid ${!active ? "active" : ""}`}>
          <OutletContext.Provider value={{ active }}>
            <Outlet />
          </OutletContext.Provider>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default LayoutPanel;
