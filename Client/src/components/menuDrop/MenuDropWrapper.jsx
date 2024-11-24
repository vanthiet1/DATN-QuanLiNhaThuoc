import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const MenuDropWrapper = ({ children, ComponentChildren, title = '', ...tippyProps }) => {
  const [visible, setVisible] = useState(false);

  const handleClickOutside = () => {
    setVisible(false);
  };

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <Tippy
      content={
        ComponentChildren ? (
          <div className=''>
            <ComponentChildren />
          </div>
        ) : (
          title
        )
      }
      interactive={true}
      visible={visible}
      onClickOutside={handleClickOutside}
      {...tippyProps}
      className='bg-white'
    >
      <div onClick={handleToggle}>{children}</div>
    </Tippy>
  );
};

export default MenuDropWrapper;
