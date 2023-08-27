/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./style.css";

import * as api from "../../../api";
import { initials } from "./interfaces-initialData.ts";
import ToastSingleton from "../../../singletons/toast";
import {
  validationFields,
  toastShowLoading,
  toastShowRequest,
} from "../../../helper";

import { OutletContext } from "../../../Contexts/layoutContext";

import * as Container from "../../../components/Containers";
import UploadImage from "../../../components/FormsComponents/UploadImage";
import { InputText } from "../../../components/FormInputs";
import ViewCertificationsPage from "../../../components/frames/ViewCertificationsPage/index.tsx";
import CardIconRegister from "../../../components/cardIconRegister/index.tsx";
import ViewHomePage from "../../../components/frames/ViewHomePage/index.tsx";

const HomePanelPage = () => {
  const states = React.useContext(OutletContext);
  const toast = ToastSingleton.toastRef;

  //States
  const [dataPage, setDataPage] = React.useState(initials.INITIAL_DATA_PAGE);
  const [dataPageErrors, setDataPageErrors] = React.useState({});
  const [imagesDelete, setImagesDelete] = React.useState<[string]>([]);

  //Handle Files Upload
  const handleAddFile = (
    file: object,
    fieldObject: string,
    type?: string,
    index?: number
  ) => {
    if (type == "other") {
      setDataPage((prev) => {
        prev[fieldObject][index] = file;
        return { ...prev };
      });
    } else {
      setDataPage((e) => {
        return { ...e, [fieldObject]: file };
      });
    }
  };

  const handleDelFile = React.useCallback(
    (
      INITIAL_DATA: object,
      fieldObject: string,
      type: string,
      index?: number
    ) => {
      if (type == "background")
        setDataPage((e) => ({ ...e, [fieldObject]: INITIAL_DATA }));
      else
        setDataPage((e) => {
          e[fieldObject]?.splice(index, 1);

          return { ...e };
        });
    },
    []
  );

  const handleAddImageLogo = React.useCallback(() => {
    setDataPage((prev: any) => {
      prev.partners_logo_imgs.push({
        file: "",
        _id: "",
        name: "",
        description: "",
        principal: false,
        filename: "",
        url: "",
      });

      return { ...prev };
    });
  }, [dataPage.partners_logo_imgs]);

  //
  const handleUpdateCardInformation = React.useCallback(
    (data: any, index: number) => {
      setDataPage((e) => {
        const cardsUpdated = [...e.information_cards];
        cardsUpdated[index] = data;
        return { ...e, information_cards: cardsUpdated };
      });
    },
    []
  );
  const handleUpdateCardServices = React.useCallback(
    (data: any, index: number) => {
      setDataPage((e) => {
        const cardsUpdated = [...e.services_cards];
        cardsUpdated[index] = data;
        return { ...e, services_cards: cardsUpdated };
      });
    },
    []
  );

  //Send Form
  const handleSubmit = React.useCallback(async () => {
    const templateValidation = [
      {
        field: "home_header",
        value: dataPage.home_header,
        required: true,
        maxLength: 55,
      },
      {
        field: "home_background",
        value: dataPage.home_background,
        required: true,
      },
      {
        field: "partners_title",
        value: dataPage.partners_title,
        minLength: 4,
        maxLength: 60,
        required: true,
      },
      {
        field: "partners_description",
        value: dataPage.partners_description,
        minLength: 4,
        maxLength: 207,
        required: true,
      },
      {
        field: "partners_logo_imgs",
        value: dataPage.partners_logo_imgs,
        minLength: 2,
        minMessage: "No mínimo de 2 logos",
        required: true,
      },
      {
        field: "information_title",
        value: dataPage.information_title,
        minLength: 4,
        maxLength: 22,
        required: true,
      },
      {
        field: "information_description",
        value: dataPage.information_description,
        minLength: 4,
        maxLength: 208,
        required: true,
      },
      {
        field: "information_background",
        value: dataPage.information_background,
        required: true,
      },
      {
        field: "information_cards",
        value: dataPage.information_cards,
        minLength: 4,
        required: true,
      },
      {
        field: "services_section",
        value: dataPage.services_section,
        minLength: 4,
        maxLength: 16,
        required: true,
      },
      {
        field: "services_title",
        value: dataPage.services_title,
        minLength: 4,
        maxLength: 66,
        required: true,
      },
      {
        field: "services_center_word",
        value: dataPage.services_center_word,
        minLength: 4,
        maxLength: 18,
        required: true,
      },
      {
        field: "services_cards",
        value: dataPage.services_cards,
        minLength: 4,
        required: true,
      },
      {
        field: "aboutUs_message_call",
        value: dataPage.aboutUs_message_call,
        minLength: 4,
        maxLength: 33,
        required: true,
      },
      {
        field: "aboutUs_label_button",
        value: dataPage.aboutUs_label_button,
        minLength: 4,
        maxLength: 12,
        required: true,
      },
      {
        field: "products_section",
        value: dataPage.products_section,
        minLength: 4,
        maxLength: 14,
        required: true,
      },
      {
        field: "products_title",
        value: dataPage.products_title,
        minLength: 4,
        maxLength: 40,
        required: true,
      },
      {
        field: "products_label_button",
        value: dataPage.products_label_button,
        minLength: 4,
        maxLength: 16,
        required: true,
      },
    ];

    const errors = validationFields(templateValidation);

    const body = {
      home: {
        header: dataPage.home_header,
        background_img: dataPage.home_background._id,
      },
      partners: {
        title: dataPage.partners_title,
        description: dataPage.partners_description,
        logo_imgs: dataPage.partners_logo_imgs.map((item) => item._id),
      },
      information: {
        title: dataPage.information_title,
        description: dataPage.information_description,
        background_img: dataPage.information_background._id,
        cards: dataPage.information_cards,
      },
      services: {
        section: dataPage.services_section,
        title: dataPage.services_title,
        center_word: dataPage.services_center_word,
        cards: dataPage.services_cards,
      },
      callAboutUs: {
        message_call: dataPage.aboutUs_message_call,
        label_button: dataPage.aboutUs_label_button,
      },
      products: {
        section: dataPage.products_section,
        title: dataPage.products_title,
        label_button: dataPage.products_label_button,
      },
    };

    if (errors.length > 0) {
      errors.forEach((item) => {
        setDataPageErrors((previousState) => ({
          ...previousState,
          [item.field]: item.message,
        }));
      });
    } else {
      toastShowLoading(toast);

      ["home_background", "information_background"].forEach(
        async (item: string) => {
          if (dataPage[item]._id.length == 0 && dataPage[item].file) {
            const responseIMG = await api.postImageMethodForm(
              "images-upload",
              dataPage,
              item
            );
            if (item == "home_background") {
              body.home.background_img = responseIMG.dataResponse._id;
            } else {
              body.information.background_img = responseIMG.dataResponse._id;
            }
          }
        }
      );

      const logosImgs = await Promise.all(
        dataPage.partners_logo_imgs.map(async (logo, index) => {
          if (!logo.url && logo.file) {
            const responseIMG = await api.postImageMethodForm(
              "images-upload",
              logo
            );
            return responseIMG.dataResponse._id;
          } else {
            return logo._id;
          }
        })
      );

      body.partners.logo_imgs = logosImgs;

      const response = await api.putMethodJSON(
        "/homepage/" + dataPage._id,
        body
      );

      toastShowRequest(
        response.status,
        response?.errorData?.message || "",
        toast
      );
    }
  }, [dataPage]);

  //Function handle receive data
  const treatData = React.useCallback((data: any) => {
    const treatedData = {
      home_header: data.home.header,
      home_background: {
        ...data?.home?.background_img,
        url:
          process.env.REACT_APP_API_URL + "/" + data?.home?.background_img?.url,
      },
      partners_title: data.partners.title,
      partners_description: data.partners.description,
      partners_logo_imgs: data.partners.logo_imgs.map((logo) => ({
        ...logo,
        url: process.env.REACT_APP_API_URL + "/" + logo.url,
      })),
      information_title: data.information.title,
      information_description: data.information.description,
      information_background: {
        ...data.information.background_img,
        url:
          process.env.REACT_APP_API_URL +
          "/" +
          data?.information?.background_img?.url,
      },
      information_cards: [...data.information.cards],
      services_section: data.services.section,
      services_title: data.services.title,
      services_center_word: data.services.center_word,
      services_cards: [...data.services.cards],
      aboutUs_message_call: data.callAboutUs.message_call,
      aboutUs_label_button: data.callAboutUs.label_button,
      products_section: data.products.section,
      products_title: data.products.title,
      products_label_button: data.products.label_button,
      _id: data._id,
    };

    return treatedData;
  }, []);

  const loadData = React.useCallback(async () => {
    const response = await api.getPage("homepage");
    const treatedData = treatData(response.dataResponse);

    setDataPage(treatedData);
  }, []);

  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    console.log(dataPage.partners_logo_imgs);
  }, [dataPage.partners_logo_imgs]);

  return (
    <>
      <Container.LayoutRegisterPage>
        <Container.ColInputsRegisterPage>
          <h2 className="text-slate-800 font-semibold">Home</h2>
          <div className="p-2">
            {/* Upload Input */}
            <div>
              <p className="text-label">Background Image</p>
              <UploadImage
                file={dataPage?.home_background}
                handleAddFile={handleAddFile}
                handleDelFile={handleDelFile}
                setImagesDelete={setImagesDelete}
                type="background"
                fieldObject="home_background"
              />
            </div>
            {/* Inputs Text */}
            <InputText
              label="Titulo"
              field="home_header"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.home_header || ""}
              setValue={setDataPage}
              error={dataPageErrors?.home_home_header}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
          </div>
          <h2 className="text-slate-800 font-semibold pt-4">Parceiros</h2>
          <div className="p-2">
            <InputText
              label="Titulo"
              field="partners_title"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.partners_title || ""}
              setValue={setDataPage}
              error={dataPageErrors?.partners_title}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Descrição"
              field="partners_description"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.partners_description || ""}
              setValue={setDataPage}
              error={dataPageErrors?.partners_description}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <div>
              <p className="text-label translate-y-2">Logos Images</p>
              <Container.LogosUpdate>
                {Array.isArray(dataPage?.partners_logo_imgs) ? (
                  dataPage?.partners_logo_imgs?.map((logo, index) => {
                    return (
                      <UploadImage
                        key={"upload-card-".concat(String(index))}
                        file={logo}
                        handleAddFile={handleAddFile}
                        handleDelFile={handleDelFile}
                        fieldObject="partners_logo_imgs"
                        type="other"
                        index={index}
                        setImagesDelete={setImagesDelete}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
                <div className="card-add-image" onClick={handleAddImageLogo}>
                  <i className="fa-solid fa-plus"></i>
                </div>
              </Container.LogosUpdate>
            </div>
          </div>
          <h2 className="text-slate-800 font-semibold pt-4">Informações</h2>
          <div className="p-2">
            <InputText
              label="Titulo"
              field="information_title"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.information_title || ""}
              setValue={setDataPage}
              error={dataPageErrors?.information_title}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Descrição"
              field="information_description"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.information_description || ""}
              setValue={setDataPage}
              error={dataPageErrors?.information_description}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <div>
              <p className="text-label">Background Image</p>
              <UploadImage
                file={dataPage?.information_background}
                handleAddFile={handleAddFile}
                handleDelFile={handleDelFile}
                type="background"
                fieldObject="information_background"
                setImagesDelete={setImagesDelete}
              />
            </div>
            {dataPage?.information_cards?.map((item, index) => {
              return (
                <div
                  className="grid mt-2"
                  key={index.toString().concat("-card-register")}
                >
                  <p className="text-label">Card {index}</p>
                  <CardIconRegister
                    functionChangeCard={handleUpdateCardInformation}
                    stateError={dataPageErrors}
                    setStateError={setDataPageErrors}
                    index={index}
                    data={item}
                  />
                </div>
              );
            })}
          </div>
          <h2 className="text-slate-800 font-semibold pt-4">Serviços</h2>
          <div className="p-2">
            <InputText
              label="Seção"
              field="services_section"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.services_section || ""}
              setValue={setDataPage}
              error={dataPageErrors?.services_section}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Titulo"
              field="services_title"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.services_title || ""}
              setValue={setDataPage}
              error={dataPageErrors?.services_title}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Palavra central"
              field="services_center_word"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.services_center_word || ""}
              setValue={setDataPage}
              error={dataPageErrors?.services_center_word}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            {dataPage?.services_cards?.map((item, index) => {
              return (
                <div
                  className="grid mt-2"
                  key={index.toString().concat("-card-register")}
                >
                  <p className="text-label">Card {index}</p>
                  <CardIconRegister
                    functionChangeCard={handleUpdateCardServices}
                    stateError={dataPageErrors}
                    setStateError={setDataPageErrors}
                    index={index}
                    data={item}
                  />
                </div>
              );
            })}
          </div>
          <h2 className="text-slate-800 font-semibold pt-4">Sobre nós</h2>
          <div className="p-2">
            <InputText
              label="Mensagem de chamada"
              field="aboutUs_message_call"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.aboutUs_message_call || ""}
              setValue={setDataPage}
              error={dataPageErrors?.aboutUs_message_call}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Mensagem no botão"
              field="aboutUs_label_button"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.aboutUs_label_button || ""}
              setValue={setDataPage}
              error={dataPageErrors?.services_center_word}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
          </div>
          <h2 className="text-slate-800 font-semibold pt-4">Produtos</h2>
          <div className="p-2">
            <InputText
              label="Seção"
              field="products_section"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.products_section || ""}
              setValue={setDataPage}
              error={dataPageErrors?.products_section}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="title"
              field="products_title"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.products_title || ""}
              setValue={setDataPage}
              error={dataPageErrors?.products_title}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
            <InputText
              label="Mensagem do botão"
              field="products_label_button"
              placeholder="Digite o titulo da seção da página"
              value={dataPage.products_label_button || ""}
              setValue={setDataPage}
              error={dataPageErrors?.products_label_button}
              errors={dataPageErrors}
              setErrors={setDataPageErrors}
            />
          </div>
          <Container.SaveForm
            disableButton={false}
            setDataPage={setDataPage}
            handleSubmit={handleSubmit}
            INITIAL_DATA_PAGE={initials.INITIAL_DATA_PAGE}
          />
        </Container.ColInputsRegisterPage>
        {/* ViewProducts Page */}
        <ViewHomePage dataPage={dataPage} active={states.active} />
      </Container.LayoutRegisterPage>
    </>
  );
};

export default HomePanelPage;
