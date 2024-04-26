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
                    <img 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundSize: 'cover',
                            'backgroundImage': `url(${photoUrl})`,
                            'width': '100%' 
                        }}
                        src={photoUrl}
                    />
                </div>;
            })
            } 
        </Slide>
        </div>
    </div>;
}

export default ImageViewer;
