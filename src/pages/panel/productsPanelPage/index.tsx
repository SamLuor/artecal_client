import React from "react";
import "./style.css";

import * as api from "../../../api";
import { initials } from "./interfaces-initialData";
import ToastSingleton from "../../../singletons/toast";
import {
  validationFields,
  toastShowLoading,
  toastShowRequest,
} from "../../../helper";

import { OutletContext } from "../../../Contexts/layoutContext";

import * as Container from "../../../components/Containers";
import UploadImage from "../../../components/FormsComponents/UploadImage";
import CardIconRegister from "../../../components/cardIconRegister";
import ViewProductPage from "../../../components/frames/ViewProductPage";
import { InputText } from "../../../components/FormInputs";

const ProductsPanelPage = () => {
  const states = React.useContext(OutletContext);
  const toast = ToastSingleton.toastRef;

  //States
  const [dataPage, setDataPage] = React.useState(initials.INITIAL_DATA_PAGE);
  const [dataPageErrors, setDataPageErrors] = React.useState({});
  const [imagesDelete, setImagesDelete] = React.useState([]);

  //Handle Files Upload
  const handleAddFile = React.useCallback((file: object) => {
    setDataPage((e) => ({ ...e, background: file }));
  }, []);

  const handleDelFile = React.useCallback((INITIAL_DATA: object) => {
    setDataPage((e) => ({ ...e, background: INITIAL_DATA }));
  }, []);

  //Handle cards
  const handleUpdateCard = React.useCallback((data: any, index: number) => {
    setDataPage((e) => {
      const cardsUpdated = [...e.cards];
      cardsUpdated[index] = data;
      return { ...e, cards: cardsUpdated };
    });
  }, []);

  //Send Form
  const handleSubmit = React.useCallback(async () => {
    // Function handle Toast Loading
    toastShowLoading(toast);

    const templateValidation = [
      {
        field: "background",
        value: dataPage.background,
        required: true,
      },
      {
        field: "section",
        value: dataPage.section,
        minLength: 4,
        maxLength: 25,
        required: true,
      },
      {
        field: "title",
        value: dataPage.title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-icon-0",
        value: dataPage.cards[0].icon,
        minLength: 8,
        required: true,
      },
      {
        field: "card-title-0",
        value: dataPage.cards[0].title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-description-0",
        value: dataPage.cards[0].description,
        minLength: 10,
        required: true,
      },
      {
        field: "card-icon-1",
        value: dataPage.cards[1].icon,
        minLength: 8,
        required: true,
      },
      {
        field: "card-title-1",
        value: dataPage.cards[1].title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-description-1",
        value: dataPage.cards[1].description,
        minLength: 10,
        required: true,
      },
      {
        field: "card-icon-2",
        value: dataPage.cards[2].icon,
        minLength: 8,
        required: true,
      },
      {
        field: "card-title-2",
        value: dataPage.cards[2].title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-description-2",
        value: dataPage.cards[2].description,
        minLength: 10,
        required: true,
      },
      {
        field: "card-icon-3",
        value: dataPage.cards[3].icon,
        minLength: 8,
        required: true,
      },
      {
        field: "card-title-3",
        value: dataPage.cards[3].title,
        minLength: 4,
        required: true,
      },
      {
        field: "card-description-3",
        value: dataPage.cards[3].description,
        minLength: 10,
        required: true,
      },
    ];

    const errors = validationFields(templateValidation);

    const body = {
      section: dataPage.section,
      title: dataPage.title,
      background_img: dataPage.background._id,
      cards: dataPage.cards,
    };

    if (errors.length > 0) {
      errors.forEach((item) => {
        setDataPageErrors((previousState) => ({
          ...previousState,
          [item.field]: item.message,
        }));
      });
    } else {
      if (dataPage.background._id) {
        const response = await api.putMethodJSON(
          "/products-page/" + dataPage._id,
          body
        );

        // Function Handle Toast Request
        toastShowRequest(
          response.status,
          response?.errorData?.message || "",
          toast
        );
      } else {
        const responseIMG = await api.postImageMethodForm(
          "images-upload",
          dataPage,
          "background"
        );

        body.background_img = responseIMG.dataResponse._id;

        const response = await api.putMethodJSON(
          "/products-page/" + dataPage._id,
          body
        );

        toastShowRequest(
          response.status,
          response?.errorData?.message || "",
          toast
        );
      }
    }
  }, [dataPage]);

  //Function handle receive data
  const treatData = React.useCallback((data: any) => {
    const treatedData = {
      background: {
        ...data?.background_img,
        url: process.env.REACT_APP_API_URL + "/" + data?.background_img?.url,
      },
      section: data.section,
      title: data.title,
      cards: data.cards,
      _id: data._id,
    };

    return treatedData;
  }, []);

  const loadData = React.useCallback(async () => {
    const response = await api.getPage("products-page");
    const treatedData = treatData(response.dataResponse);

    setDataPage(treatedData);
  }, []);

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Container.LayoutRegisterPage>
        <Container.ColInputsRegisterPage>
          {/* Upload Input */}
          <div>
            <p className="text-label">Background Image</p>
            <UploadImage
              file={dataPage.background}
              handleAddFile={handleAddFile}
              handleDelFile={handleDelFile}
              setImagesDelete={setImagesDelete}
              type="background"
            />
          </div>
          {/* Inputs Text */}
          <InputText
            field="section"
            placeholder="Digite o nome da seção da página"
            value={dataPage.section || ""}
            setValue={setDataPage}
            error={dataPageErrors.section}
            errors={dataPageErrors}
            setErrors={setDataPageErrors}
          />
          <InputText
            field="title"
            placeholder="Digite o nome do titulo da página"
            value={dataPage.title || ""}
            setValue={setDataPage}
            error={dataPageErrors.title}
            errors={dataPageErrors}
            setErrors={setDataPageErrors}
          />
          {dataPage?.cards?.map((item, index) => {
            return (
              <div
                className="grid mt-2"
                key={index.toString().concat("-card-register")}
              >
                <p className="text-label">Card {index}</p>
                <CardIconRegister
                  functionChangeCard={handleUpdateCard}
                  stateError={dataPageErrors}
                  setStateError={setDataPageErrors}
                  index={index}
                  data={item}
                />
              </div>
            );
          })}
          <Container.SaveForm
            setDataPage={setDataPage}
            handleSubmit={handleSubmit}
            INITIAL_DATA_PAGE={initials.INITIAL_DATA_PAGE}
            disableButton={!dataPage.background}
          />
        </Container.ColInputsRegisterPage>
        {/* ViewProducts Page */}
        <ViewProductPage dataPage={dataPage} active={states.active} />
      </Container.LayoutRegisterPage>
    </>
  );
};

export default ProductsPanelPage;
