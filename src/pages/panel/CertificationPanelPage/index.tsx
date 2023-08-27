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

const CertificationPanelPage = () => {
  const states = React.useContext(OutletContext);
  const toast = ToastSingleton.toastRef;

  //States
  const [dataPage, setDataPage] = React.useState(initials.INITIAL_DATA_PAGE);
  const [dataPageErrors, setDataPageErrors] = React.useState({});

  //Handle Files Upload
  const handleAddFile = React.useCallback((file: object) => {
    setDataPage((e) => ({ ...e, background: file }));
  }, []);

  const handleDelFile = React.useCallback((INITIAL_DATA: object) => {
    setDataPage((e) => ({ ...e, background: INITIAL_DATA }));
  }, []);

  //Send Form
  const handleSubmit = React.useCallback(async () => {
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
        maxLength: 30,
        required: true,
      },
      {
        field: "title",
        value: dataPage.title,
        minLength: 4,
        required: true,
      },
    ];

    const errors = validationFields(templateValidation);

    const body = {
      section: dataPage.section,
      title: dataPage.title,
      background_img: dataPage.background._id,
    };

    if (errors.length > 0) {
      errors.forEach((item) => {
        setDataPageErrors((previousState) => ({
          ...previousState,
          [item.field]: item.message,
        }));
      });
    } else {
      // Function handle Toast Loading
      toastShowLoading(toast);

      if (dataPage.background._id) {
        const response = await api.putMethodJSON(
          "/certifications-page/" + dataPage._id,
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
          "/certifications-page/" + dataPage._id,
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
        ...data.background_img,
        url: process.env.REACT_APP_API_URL + "/" + data.background_img.url,
      },
      section: data.section,
      title: data.title,
      _id: data._id,
    };

    return treatedData;
  }, []);

  const loadData = React.useCallback(async () => {
    const response = await api.getPage("certifications-page");
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
          <Container.SaveForm
            setDataPage={setDataPage}
            handleSubmit={handleSubmit}
            INITIAL_DATA_PAGE={initials.INITIAL_DATA_PAGE}
          />
        </Container.ColInputsRegisterPage>
        {/* ViewProducts Page */}
        <ViewCertificationsPage dataPage={dataPage} active={states.active} />
      </Container.LayoutRegisterPage>
    </>
  );
};

export default CertificationPanelPage;
