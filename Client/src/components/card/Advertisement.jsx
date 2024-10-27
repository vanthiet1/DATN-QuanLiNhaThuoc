
const Advertisement = ({ image, title, description }) => {
    return (
        <div>
            <div>
              <div className="flex justify-center">
              <img className="w-[50px]" src={image} alt="" />
              </div>
                <div className="w-full text-center py-2">
                <span className="font-semibold">{title}</span>
                </div>
                <p className="w-[200px] text-center text-[14px]">{description}</p>
            </div>
        </div>
    );
};

export default Advertisement;