/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "primereact/button";
import { PropsInterfaceSaveForm } from "./interfaces";
import "./style.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import React from "react";

const SaveForm = ({
  setDataPage,
  handleSubmit,
  INITIAL_DATA_PAGE,
  disableButton,
}: PropsInterfaceSaveForm) => {
  return (
    <div className="flex justify-between mt-4">
      <Button
        label="Limpar"
        className="btn-clear"
        onClick={() =>
          setDataPage((e: any) => ({ ...INITIAL_DATA_PAGE, _id: e._id }))
        }
      />
      <Button
        label="Salvar"
        className="btn-save"
        onClick={handleSubmit}
        disabled={disableButton}
      />
    </div>
  );
};

const LayoutRegisterPage = (props: any) => {
  return <div className="layout-register-page">{props.children}</div>;
};

const ColInputsRegisterPage = (props: any) => {
  return <div className="col-inputs">{props.children}</div>;
};

const Image = ({ dataPage }: any) => {
  return (
    <div className="background-image">
      {dataPage.background && (
        <>
          <img
            src={
              typeof dataPage.background.file == "object"
                ? URL.createObjectURL(dataPage.background.file)
                : dataPage.background.url
            }
            className="image-background"
            alt=""
            srcSet=""
          />
          <div className="overlay-bg"></div>
        </>
      )}
    </div>
  );
};

const Cards = (props: any) => {
  return (
    <div className={"container-cards ".concat(String(props.className))}>
      {props.children}
    </div>
  );
};

const PrincipalFrame = (props: any) => {
  return (
    <div
      className={`container-principal-frame ${!props.active ? "active" : ""}`}
    >
      {props.children}
    </div>
  );
};

const LogosUpdate = (props: any) => {
  return <div className="container-logos-update">{props.children}</div>;
};

const BackgroundImage = (props) => {
  return (
    <div
      className={"background-container-image ".concat(props.className)}
      style={{
        backgroundImage: `url(${
          typeof props.dataPage?.file == "object"
            ? URL.createObjectURL(props.dataPage?.file)
            : props.dataPage?.url
        })`,
        aspectRatio: props.aspectRatio,
        minHeight: props.minHeight,
      }}
    >
      {props.children}
    </div>
  );
};

const LogosShow = (props) => {
  return <div className="container-logo-show p-4">{props.children}</div>;
};

const ImagesSlide = (props: any) => {
  const [images, setImages] = React.useState<any[]>([...props.images]);

  const handleList = React.useCallback(() => {
    if (props.images.length <= 6) {
      const listImages = [];

      for (let i = 0; i < 6; i++) {
        listImages.push(...props.images);
      }

      listImages.length = listImages.length > 8 ? 8 : listImages.length;

      setImages(listImages);
    } else {
      setImages([...props.images]);
    }
  }, [props.images]);

  React.useEffect(() => {
    handleList();
  }, [props.random]);

  return (
    <Swiper
      loop={true}
      freeMode={true}
      autoplay={{ delay: 400, disableOnInteraction: false }}
      slidesPerView={images.length > 4 ? 4 : images.length}
      modules={[Autoplay, FreeMode]}
    >
      {images != undefined &&
        images?.map((image, index) => {
          return (
            <SwiperSlide key={image.url.concat(String(index))}>
              <img
                src={
                  typeof image?.file == "object"
                    ? URL.createObjectURL(image?.file)
                    : image.url
                }
                className="img-slide"
              />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

const ServicesCardsSection = (props: any) => {
  return <div className="services-cards-section">{props.children}</div>;
};

const VideoAboutUs = (props: any) => {
  return (
    <div className="container-video">
      <div
        className="box-video"
        style={{
          backgroundImage: `url(${
            typeof props.video_img?.file == "object"
              ? URL.createObjectURL(props.video_img?.file)
              : props.video_img?.url
          })`,
        }}
      >
        <i className="fa-brands fa-youtube icon-play"></i>
      </div>
      <p className="description">{props.description}</p>
    </div>
  );
};

export {
  SaveForm,
  LayoutRegisterPage,
  ColInputsRegisterPage,
  Image,
  Cards,
  PrincipalFrame,
  LogosUpdate,
  BackgroundImage,
  LogosShow,
  ImagesSlide,
  ServicesCardsSection,
  VideoAboutUs,
};
