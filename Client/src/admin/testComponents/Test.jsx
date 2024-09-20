import React from 'react';
import Select from '../../components/ui/select/Select';
const Test = () => {
    const data = [
        {
         id:1,
         item:"văn thiết1"
       },
       {
         id:2,
         item:"văn thiết2"
       }
     ]
    return (
        <div>
              <Select addClassNames={'w-[20px]'} nameSelected={"Chọn user"} optionData={data}/>
        </div>
    );
};

export default Test;