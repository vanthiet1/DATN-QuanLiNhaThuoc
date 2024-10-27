import { useEffect } from 'react';
const useSrcollTop = (id_url_param) => {
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },[id_url_param])
};

export default useSrcollTop;