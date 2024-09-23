import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { cn } from '../../../utils/helpers/mergeClasses';

const Editor = ({ addClassName, width, height, titleStart,onChange, ...props }) => {
    const [content, setContent] = useState('');
    console.log(content);

    return (
        <div
            className={cn(`${addClassName}`)}
        >
            <CKEditor
                editor={ClassicEditor}
                data={titleStart}
                onChange={onChange}
            />
         
        </div>
    );
};

export default Editor;
