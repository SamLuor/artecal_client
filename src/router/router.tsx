import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/login/LoginPage";
import LayoutPanel from "../layoutPanel";
import ProductsPanelPage from "../pages/panel/productsPanelPage";
import React from "react";
import ToastSingleton from "../singletons/toast.ts";
import { Toast } from "primereact/toast";
import CertificationPanelPage from "../pages/panel/CertificationPanelPage/index.tsx";
import HomePanelPage from "../pages/panel/HomePanelPage/index.tsx";
import AboutUsPanelPage from "../pages/panel/AboutUsPanelPage/index.tsx";

export const Routers = () => {
  const toastRef = React.useRef(null);

  React.useEffect(() => {
    ToastSingleton.setToastRef(toastRef);
  }, [toastRef]);

  return (
    <BrowserRouter>
      <Toast ref={toastRef} />
      <Routes>
        <Route path="/panel/*" element={<LayoutPanel />}>
          <Route index path="products-page" element={<ProductsPanelPage />} />
          <Route index path="about-us-page" element={<AboutUsPanelPage />} />
          <Route
            path="certification-page"
            element={<CertificationPanelPage />}
          />
          <Route
            path="home-page"
            element={<HomePanelPage />}
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
