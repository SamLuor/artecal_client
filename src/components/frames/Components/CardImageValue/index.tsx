import "./style.css";

const CardImageValue = ({ src }: any) => {
  return (
    <div className="cardImageValue" style={{ background: `url(${src})` }}>
      <div className="overlay"></div>
    </div>
  );
};

export default CardImageValue;
