import "./style.css";

const CardService = ({ dataCard, color }) => {
  const colorIcon = !color ? "text-blue-500" : color;

  return (
    <div className="card-service">
      <div className="flex gap-2 mb-2">
        <i className={colorIcon.concat(" " + dataCard.icon)}></i>
        <p className="text-xs font-medium">{dataCard.title}</p>
      </div>
      <div className="text-xxxs">{dataCard.description}</div>
    </div>
  );
};

export default CardService;
