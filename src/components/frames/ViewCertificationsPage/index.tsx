/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";

import ToggleView from "../Components/ToggleView";

import * as Container from "../../Containers";
import SectionTitleView from "../Components/SectionTitleView";
import NotificationView from "../Components/NotificationView";

interface ComponentProps {
  dataPage: {
    background: any | undefined;
    section: string;
    title: string;
  };
  active: boolean;
}

const ViewCertificationsPage: React.FC<ComponentProps> = ({ dataPage, active }) => {
  const [view, setView] = React.useState("desktop");

  return (
    <>
      {!active && (
        <Container.PrincipalFrame>
          <ToggleView view={view} setView={setView} />
          <div
            className={`page-certifications-frame ${
              view == "mobile" ? "mobile" : ""
            }`}
          >
            <Container.Image dataPage={dataPage} />
            <SectionTitleView dataPage={dataPage} />
          </div>
        </Container.PrincipalFrame>
      )}
      {active && <NotificationView />}
    </>
  );
};

export default ViewCertificationsPage;
