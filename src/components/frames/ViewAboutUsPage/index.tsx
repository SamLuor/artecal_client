/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";

import ToggleView from "../Components/ToggleView";
import * as Container from "../../Containers";
import NotificationView from "../Components/NotificationView";
import CardService from "../../CardService";
import { Panel } from "primereact/panel";
import CardImageValue from "../Components/CardImageValue";

import Image1Value from "../../../assets/values-images/image-1.jpg";
import Image2Value from "../../../assets/values-images/image-2.png";
import Image3Value from "../../../assets/values-images/image-3.jpg";
import Image4Value from "../../../assets/values-images/image-4.jpg";
import Image5Value from "../../../assets/values-images/image-5.png";

interface ComponentProps {
  dataPage: {
    home_title: string;
    home_background_img: object;
    home_img_video: object;
    home_link_video: string;
    home_description: string;
    quality_policies_section: string;
    quality_policies_title: string;
    quality_policies_center_word: string;
    quality_policies_cards: card[];
    company_values_section: string;
    company_values_title: string;
    _id: string;
  };
  active: boolean;
}

interface card {
  icon: string;
  title: string;
  description: string;
}

const ViewAboutUsPage: React.FC<ComponentProps> = ({ dataPage, active }) => {
  const [view, setView] = React.useState("desktop");
  const [imageValue, setImageValue] = React.useState(Image1Value);

  const handleExpandAndColapse = (type: string, event: any, image?: string) => {
    if (type == "expand") {
      handleStylePanelActive(event);
      if (image) handleImageValue(image);
    } else {
      handleStylePanelActive(event);
    }
  };

  const handleImageValue = (image: string) => {
    setImageValue(image);
  };

  const handleStylePanelActive = (event: any) => {
    const isHeader: boolean =
      event.target.parentElement.parentElement.classList.contains(
        "p-panel-header"
      );

    const panelParent: HTMLDivElement = isHeader
      ? event.target.parentElement.parentNode
      : event.target.parentElement.parentNode.parentNode;

    panelParent.classList.toggle("expanded");
  };

  const values = [
    {
      header: "Crescimento com preservação ao meio ambiente",
      className: "value-toggle",
      image: Image1Value,
    },
    {
      header: "Segurança Absoluta no ambiente de trabalho",
      className: "value-toggle",
      image: Image2Value,
    },
    {
      header: "Integridade entre as relações do meio ambiente",
      className: "value-toggle",
      image: Image1Value,
    },
    {
      header: "Pessoas comprometidas e realizadas",
      className: "value-toggle",
      image: Image3Value,
    },
    {
      header: "Cliente sempre satisfeito",
      className: "value-toggle",
      image: Image4Value,
    },
    {
      header: "Rentabilidade",
      className: "value-toggle",
      image: Image5Value,
    },
  ];

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
            className={`page-about-frame ${view == "mobile" ? "mobile" : ""}`}
          >
            <Container.BackgroundImage
              dataPage={dataPage.home_background_img}
              className="about-background"
            >
              <div className="bg-overlay-blue p-8 flex flex-col gap-4">
                <div className="header-about-us">
                  <div className="circle-spin"></div>
                  <p className="text-header">{dataPage.home_title}</p>
                </div>
                <Container.VideoAboutUs
                  video_img={dataPage.home_img_video}
                  description={dataPage.home_description}
                />
              </div>
            </Container.BackgroundImage>
            <div className="px-6 py-6 w-full text-white container-policies-section">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs policies-view-section">
                    {dataPage.quality_policies_section}
                  </p>
                  <p className="text-sm service-description-view">
                    {dataPage.quality_policies_title}
                  </p>
                </div>
                <div className="circle-rotate"></div>
              </div>
              <Container.ServicesCardsSection>
                {dataPage?.quality_policies_cards?.map((item, index) => {
                  return (
                    <CardService
                      key={"Card-service-view-".concat(String(index))}
                      dataCard={item}
                      color="text-green-400"
                    />
                  );
                })}
                <div className="center-container-word">
                  <div className="first-circle">
                    <div className="circle"></div>
                  </div>
                  <p className="center-word text-center">
                    {dataPage.quality_policies_center_word}
                  </p>
                  <div className="second-circle">
                    <div className="circle"></div>
                  </div>
                </div>
              </Container.ServicesCardsSection>
            </div>
            <div className="container-value-company w-full p-6 text-white">
              <div>
                <p className="section-view">
                  {dataPage.company_values_section}
                </p>
                <p className="title">{dataPage.company_values_title}</p>
              </div>
              <div className="container-values">
                <div className="container-panels-value">
                  {Array.isArray(values) &&
                    values.map((panel, index) => {
                      return (
                        <Panel
                          header={panel.header}
                          toggleable
                          key={"panel-value-".concat(String(index))}
                          collapsed={true}
                          className="value-toggle"
                          expandIcon="fa-solid fa-arrow-down"
                          collapseIcon="fa-solid fa-arrow-up"
                          onExpand={(event) =>
                            handleExpandAndColapse("expand", event, panel.image)
                          }
                          onCollapse={(event) =>
                            handleExpandAndColapse("close", event)
                          }
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Panel>
                      );
                    })}
                </div>
                <div className="flex justify-center">
                  <CardImageValue src={imageValue} />
                </div>
              </div>
            </div>
          </div>
        </Container.PrincipalFrame>
      )}
      {active && <NotificationView />}
    </>
  );
};

export default ViewAboutUsPage;
