import React, { useEffect } from "react";
import { KeyboardEvent } from "react";
import { Slide } from "react-slideshow-image";


type ImageViewerProps = {
    imageMode: boolean,
    setImageMode: (_: boolean) => void,
    photos: Array<string>,
    photoBaseUrl: string
}

const ImageViewer = ({imageMode, setImageMode, photos, photoBaseUrl}: ImageViewerProps) => {

  function handleImageViewerKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      setImageMode(false);
    }
  }

  return <div 
        className="image-viewer" 
        style={imageMode ? {} : {'visibility': 'hidden'}} 
        onKeyDownCapture={handleImageViewerKeyDown} 
        onClick={(e) => {setImageMode(false);}}
    >
        <div className="close" onCanPlay={(event) => {setImageMode(false);}}>
            <i className="fi fi-sr-x"/>
        </div>
        <div className="slide-container" onClick={(event) => {event.stopPropagation();}}>
        <Slide
            autoplay={false}
            duration={5000}
            transitionDuration={200}
            infinite= {true}
            indicators= {false}
            arrows={true}
        >
        {
            photos.map((photoFile, index)=> {
                const photoUrl = `${photoBaseUrl}/${photoFile}.jpeg`;

                return <div key={index} className="item">
                    <img className="image" src={photoUrl} />
                </div>;
            })
            } 
        </Slide>
        </div>
    </div>;
};

export default ImageViewer;
