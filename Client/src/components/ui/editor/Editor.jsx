import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'ckeditor5/ckeditor5.css';
import PropTypes from 'prop-types';
import { cn } from '../../../utils/helpers/mergeClasses';

const Editor = ({ value, onChange, addClassName = '', editorLoaded = false, disabled = false }) => {
  if (!editorLoaded) return null;

  return (
    <div className={cn(`editor-container ${addClassName}`)}>
      <CKEditor
        editor={ClassicEditor}
        data={value || ''}
        disabled={disabled}
        onChange={(event, editor) => {
          const data = editor.getData();
          if (onChange) {
            console.log(data);
            onChange(data);
          }
        }}
      />
    </div>
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  addClassName: PropTypes.string,
  editorLoaded: PropTypes.bool
};

export default Editor;
