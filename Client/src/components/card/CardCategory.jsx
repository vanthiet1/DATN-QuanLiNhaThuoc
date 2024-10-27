import { Link } from "react-router-dom";
const CardCategory = ({ name, description, image, categoriesId }) => {
    return (
        <Link to={`/danh-muc/${categoriesId}`}>
            <div className="flex bg-gradient-to-l from-blue-500 to-blue-700  rounded-[5px] justify-between p-2 h-[100px] overflow-hidden">
                <div>
                    <span className="block font-bold text-[17px] text-[#fff]">{name}</span>
                    <span className="block text-[#fff]">{description}</span>
                </div>
                <div>
                {image?.map((img, index) => (
                        <img 
                            key={index} 
                            className="w-[100px] h-[80px]  rounded-[10px] object-cover" 
                            src={img || "https://res.cloudinary.com/dddz1buyw/image/upload/v1728484850/nhathuoc/products/0ed6c2a7040b49319cd4074de6021f46.png"} 
                            alt={name || "danh mục"} 
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default CardCategory;