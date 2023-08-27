/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";

import CardIcon from "../../CardIcon";
import ToggleView from "../Components/ToggleView";
import { Button } from "primereact/button";

import * as Container from "../../Containers";
import SectionTitleView from "../Components/SectionTitleView";
import NotificationView from "../Components/NotificationView";
import CardPolymorphism from "../../CardPolymorphism";
import CardService from "../../CardService";

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

const ViewHomePage: React.FC<ComponentProps> = ({ dataPage, active }) => {
  const [view, setView] = React.useState("desktop");

  const [first, two, three, four, five, six] = dataPage.home_header.split(" ");

  return (
    <>
      {!active && (
        <Container.PrincipalFrame
          className={`container-principal-frame ${!active ? "active" : ""}`}
          style={{
            gridTemplateRows: "5rem 1fr",
          }}
        >
          <ToggleView view={view} setView={setView} />
          <div
            className={`page-home-frame ${view == "mobile" ? "mobile" : ""}`}
          >
            <Container.BackgroundImage
              dataPage={dataPage.home_background}
              className="home-background"
            >
              <div className="bg-overlay-blue p-8">
                <div className="text-white text-2xl uppercase">
                  <p>
                    <span className="font-semibold">{first}</span> {two} {three}
                  </p>
                  <p>
                    {four} {five}
                  </p>
                  <div className="header-principal-line">
                    <span className="font-semibold z-10 relative">{six}</span>
                  </div>
                </div>
              </div>
            </Container.BackgroundImage>
            <Container.LogosShow>
              <div className="text-white">
                <p className="font-semibold text-sm partners-title">
                  {dataPage.partners_title}
                </p>
                <p className="text-xxs w-4/6">
                  {dataPage.partners_description}
                </p>
              </div>
              <div className="py-3">
                <Container.ImagesSlide
                  images={dataPage.partners_logo_imgs}
                  random={Math.random()}
                />
              </div>
            </Container.LogosShow>
            <Container.BackgroundImage
              dataPage={dataPage.information_background}
              /* aspectRatio="16 / 7" */
              /*  minHeight="35%" */
            >
              <div className="bg-overlay-gradient-blue p-8 text-white">
                <p className="text-2xl font-medium uppercase justify-self-start">
                  {dataPage.information_title}
                </p>
                <p
                  className="text-xxs w-3/5 justify-self-start"
                  style={{ marginBottom: "2rem" }}
                >
                  {dataPage.information_description}
                </p>
                <Container.Cards className="w-full">
                  {dataPage.information_cards.map((card, index) => {
                    return (
                      <CardPolymorphism
                        key={"card-information-view-".concat(String(index))}
                        item={card}
                        className=""
                      />
                    );
                  })}
                </Container.Cards>
              </div>
            </Container.BackgroundImage>
            <div className="px-6 py-6 w-full text-white container-service-section">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm home-view-section">
                    {dataPage.services_section}
                  </p>
                  <p className="service-description-view ">
                    {dataPage.services_title}
                  </p>
                </div>
                <div className="circle-rotate"></div>
              </div>
              <Container.ServicesCardsSection>
                {dataPage?.services_cards?.map((item, index) => {
                  return (
                    <CardService
                      key={"Card-service-view-".concat(String(index))}
                      dataCard={item}
                    />
                  );
                })}
                <div className="center-container-word">
                  <div className="first-circle">
                    <div className="circle"></div>
                  </div>
                  <p className="center-word text-center">
                    {dataPage.services_center_word}
                  </p>
                  <div className="second-circle">
                    <div className="circle"></div>
                  </div>
                </div>
              </Container.ServicesCardsSection>
            </div>
            <div className="container-about-us-call">
              <p className="title">{dataPage.aboutUs_message_call}</p>
              <Button
                className="btn-about-us-call"
                label={dataPage.aboutUs_label_button}
              />
            </div>
            <div className="p-8 w-full container-products-home">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-white">
                  <i className="fa-solid fa-table-cells-large icon-product"></i>
                  <div>
                    <p className="home-view-section text-sm">
                      {dataPage.products_section}
                    </p>
                    <p className="home-products-view text-lg font-medium w-3/5">
                      {dataPage.products_title}
                    </p>
                  </div>
                </div>
                <Button
                  className="btn-products-home"
                  label={dataPage.products_label_button}
                  iconPos="right"
                  icon="fa-solid fa-circle-right"
                />
              </div>
            </div>
          </div>
        </Container.PrincipalFrame>
      )}
      {active && <NotificationView />}
    </>
  );
};

export default ViewHomePage;
