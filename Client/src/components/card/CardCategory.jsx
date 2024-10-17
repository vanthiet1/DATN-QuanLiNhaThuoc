import { Link } from "react-router-dom";
const CardCategory = ({ name, description, image, categoriesId }) => {
    return (
        <Link to={`/danh-muc/${categoriesId}`}>
            <div className="flex bg-red-100 rounded-[5px] justify-between p-2 h-[100px] overflow-hidden">
                <div>
                    <span className="block font-bold text-[17px]">{name}</span>
                    <span className="block">{description}</span>
                </div>
                <div>
                    <img className="w-[100px]" src={image} alt={image || "danh mục"} />
                </div>
            </div>
        </Link>
    );
};

export default CardCategory;