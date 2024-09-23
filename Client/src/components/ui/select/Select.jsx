import { cn } from "../../../utils/helpers/mergeClasses";
const Select = ({ disabled, addClassNames, labelName, nameSelected, optionData, ...props }) => {
    return (
        <div className="max-w-sm mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
            <select id="countries" class= {cn(`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 ${addClassNames}`)}>
                <option selected>{nameSelected}</option>
                {optionData.map((item) => (
                    <option value={item}>{item.item}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;