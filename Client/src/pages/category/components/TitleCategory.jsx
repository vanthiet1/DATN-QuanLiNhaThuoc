import AppIcons from '../../../components/ui/icon/index'
import { Link } from 'react-router-dom';
const TitleCategory = ({ nameCategory }) => {
    return (
        <div className="flex gap-2 items-center">
        <Link to={'/'}>
             <AppIcons.HomeIcon addClassNames='text-[#757575]'/>
        </Link>
        <AppIcons.ArrowRight addClassNames='text-[#757575]'/>
        <span className='text-[16px] text-[#757575] font-semibold hover:text-[#2563eb] duration-150'>{nameCategory}</span>
        </div>
    );
};

export default TitleCategory;