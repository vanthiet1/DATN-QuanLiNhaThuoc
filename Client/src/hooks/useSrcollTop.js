import { useEffect } from 'react';
const useSrcollTop = (param) => {
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },[param])
};

export default useSrcollTop;