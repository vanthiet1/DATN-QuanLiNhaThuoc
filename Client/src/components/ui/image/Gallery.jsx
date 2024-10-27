import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
const GalleryComponent = ({ images }) => {
    return ( 
        <LightGallery
            plugins={[lgZoom, lgThumbnail]}
            mode="lg-fade"
            thumbnail={true}
            elementClassNames={"gallery"}
            >
                {images?.images?.map((img, index) =>
                    img && (
                        <a key={index} href={img.url_img} data-src={img.url_img}>
                            <img
                                src={img.url_img}
                                alt={`${images.name} / ${index + 1}`}
                                className="w-[100px] cursor-pointer rounded-[7px] border-2 border-blue-500 object-cover" 
                            />
                        </a>
                    ) 
                )}
        </LightGallery>
    );
    
    
};

export default GalleryComponent;
