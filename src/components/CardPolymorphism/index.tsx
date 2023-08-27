import "./style.css";

const CardPolymorphism = ({ item, className }) => {
  return (
    <div className="card-polymorphism">
      <div className={`icon-container ${className}`}>
        <i className={item.icon || "fa-solid fa-bars"} />
      </div>
      <p className={`title ${className}`}>{item.title || "Titulo"}</p>
      <p className={`description ${className}`}>
        {item.description || "Descrição"}
      </p>
    </div>
  );
};

export default CardPolymorphism;
