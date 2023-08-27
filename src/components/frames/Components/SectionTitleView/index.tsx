import './style.css'

const SectionTitleView = ({ dataPage }: any) => {
  return (
    <div className="content-text">
      <div className="section-page">{dataPage.section || "Digite um nome"}</div>
      <div className="title-page">{dataPage.title || "Digite um titulo"}</div>
    </div>
  );
};

export default SectionTitleView;
