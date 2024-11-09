import NotFoundImage from '../../assets/images/logo/NotFound.jpg'
const NotFound = () => {
    return (
        <div>
            <div className="flex justify-center">
             <img className='object-cover w-1/2' src={NotFoundImage} alt="" />
            </div>
        </div>
    );
};

export default NotFound;
