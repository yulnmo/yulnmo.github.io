import React, { useState, MouseEvent } from "react";

type MapProps = {
    assetsBaseUrl: string
};

const Map = ({assetsBaseUrl}: MapProps) => {
    const [isMapApi, setIsMapApi] = useState(true);

    function handleToggleMap() {
      setIsMapApi(!isMapApi);
    }

    function handleClickLink(e: MouseEvent<HTMLDivElement>) {
      switch (e.currentTarget.getAttribute('data-name')) {
        case 'navermap':
          window.open('https://naver.me/IgDjfpX3');
          break;
        case 'kakaonavi':
          window.open('https://kko.to/u3xEZWI-dj');
          break;
        case 'tmap':
          window.open('https://poi.tmap.co.kr/sharing/positionSharing.do?contents=dHlwZT0yJnBrZXk9NTM4OTExMTAxJnBvaUlkPTUzODkxMTEmbmF2U2VxPTEmcG9pTmFtZT3rnbzruYTrkZDsiqQg7KO87LCo7J6lJmNlbnRlclg9NDU3MTkyMyZjZW50ZXJZPTEzNTE5MzYmdGltZT0yMDI064WEIDTsm5QgMjbsnbwgMjoxJnRlbD0wMi0yMjY1LTcwMDAmYWRkcj3shJzsmrgg7KSR6rWsIO2VhOuPmTPqsIAgNjItMTU=&tailParam=%7B%22reqMode%22:%221100%22,%22reqType%22:%221100%22,%22extra%22:%22112%22%7D');
          break;
        default:
          break;
      }
    }

    return <div className="maps">
      <div className="controls">
        <input type="button" value={isMapApi ? "약도보기" : "지도보기"} onClick={handleToggleMap} />
      </div>
      <div id="map" className="map" style={!isMapApi ? {'display': 'none'} : {}} />
      <div className="map-simple" style={isMapApi ? {'display': 'none'} : {}} >
        <img src={`${assetsBaseUrl}/map.jpg`} />
      </div>
      <div className="links">
        <div className="link" style={{'flex': '3 0'}} data-name="navermap" onClick={handleClickLink}>
          <div className="image"><div className="inner"><img src={`${assetsBaseUrl}/navermap.png`}/></div></div>
          <div className="vendor">네이버 지도</div>
        </div>
        <div className="divider"><div className="stroke"></div></div>
        <div className="link" style={{'flex': '3 0'}} data-name="kakaonavi" onClick={handleClickLink}>
          <div className="image"><div className="inner"><img src={`${assetsBaseUrl}/kakaonavi.png`}/></div></div>
          <div className="vendor">카카오맵</div>
        </div>
        <div className="divider"><div className="stroke"></div></div>
        <div className="link" style={{'flex': '2 0'}}  data-name="tmap" onClick={handleClickLink}>
          <div className="image"><div className="inner"><img src={`${assetsBaseUrl}/tmap.png`}/></div></div>
          <div className="vendor">티맵</div>
        </div>
      </div>
    </div>;
};

export default Map;
