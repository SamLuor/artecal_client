/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";

import CardIcon from "../../CardIcon";
import ToggleView from "../Components/ToggleView";

import * as Container from "../../Containers";
import SectionTitleView from "../Components/SectionTitleView";
import NotificationView from "../Components/NotificationView";

interface ComponentProps {
  dataPage: {
    background: any | undefined;
    section: string;
    title: string;
    cards: card[];
  };
  active: boolean;
}

interface card {
  icon: string;
  title: string;
  description: string;
}

const ViewProductPage: React.FC<ComponentProps> = ({ dataPage, active }) => {
  const [view, setView] = React.useState("desktop");

  return (
    <>
      {!active && (
        <Container.PrincipalFrame
          className={`container-principal-frame ${!active ? "active" : ""}`}
          style={{ gridTemplateRows: "5rem 1fr" }}
        >
          <ToggleView view={view} setView={setView} />
          <div
            className={`page-products-frame ${
              view == "mobile" ? "mobile" : ""
            }`}
          >
            <Container.Image dataPage={dataPage} />
            <SectionTitleView dataPage={dataPage} />
            <Container.Cards className="w-90%">
              {dataPage.cards.map((item, index) => {
                return (
                  <CardIcon item={item} key={item.title + index} className="" />
                );
              })}
            </Container.Cards>
          </div>
        </Container.PrincipalFrame>
      )}
      {active && <NotificationView />}
    </>
  );
};

export default ViewProductPage;
