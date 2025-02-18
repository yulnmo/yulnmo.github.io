import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import MyClipboard from '../service/MyClipboard';
import '../styles/App.css';
import Attendance from './Attendance';
import Contacts from './Contacts';
import GuestBook from './GuestBook';
import ImageViewer from './ImageViewer';
import Map from './Map';
import Toast, { ToastLevel } from './Toast';
import WithLove from './WithLove';

declare const naver: any;
declare const Kakao: any;
declare const Sakura: any;

function App() {

  const searchParams = new URLSearchParams(window.location.search);

  const quoteText = "최고의 사랑은 영혼을 일깨우고\n" +
    "더 많이 소망하게 하고\n" +
    "가슴에 열정을, 마음에 평화를 주지.\n" +
    "네게서 그걸 얻었고\n" +
    "너에게 영원히 주고 싶어.";
  const quoteReference = "영화 《노트북》 中";

  const invitationText = (searchParams.get('type')?.toLowerCase() !== 'b' ?
    "소중하고 따뜻한 두 사람이 만나​\n" +
    "함께하는 일곱 번째 푸르른 여름날\n" +
    "연인에서 부부로 새로운 시작을 합니다.\n \n" +
    "귀한 발걸음 하시어 축복해 주시면\n" +
    "더 없는 격려와 기쁨으로 간직하겠습니다." :
    "항상 귀댁의 평안과 행복을 기원드립니다\n" +
    "눈부시게 푸르른 여름날 저희 아들이 결혼을 합니다\n" +
    "예쁘게 키워온 사랑으로 아름다운 가정을 이루는\n" +
    "뜻깊은 자리에 소중한 분들을 모시고자 합니다\n" +
    "\n" +
    "귀한 발걸음으로 따뜻한 축복의 박수를 보내주시면\n" +
    "더 없는 격려와 기쁨으로 간직하겠습니다\n" +
    "\n" +
    "신랑 석모군 부모 유승정·강미옥 拜上"
  );
  const invitationReference = "석모 • 지율 올림";

  const informations = [
    ["도보", ["충무로역 1번 출구에서 약 10분(약 615m)"]],
    ["지하철", ["3, 4호선 충무로역 1번 출구 앞", "셔틀버스 이용(3분 간격)\n오전 10시 30분부터 오전 11시 30분까지 운행"]],
    ["버스", ["104, 421, 463, 507", "남산순환버스 01A, 01B, 6001(공항버스)"]],
    ["주차", ["라비두스 별관 주차장(3시간 무료)"]],
    ...(searchParams.get('type')?.toLowerCase() === 'b' ? [
      ["전세 버스(세종 출발)", ["오전 7시 20분 금남 대평시장 공영주차장"]],
      ["전세 버스(대전 출발)", ["오전 8시 대전 엑스포 남문광장"]]
    ] : [])
  ];

  const baseUrl = 'https://yulnmo.github.io';
  const photos = [...new Array(34).keys()].map(it => (it + 1).toString().padStart(3, "0")).filter(it => !["006", "011"].includes(it));
  const photosContinuable: Array<string> = [];
  const assetsBaseUrl = "/assets";
  const photoBaseUrl = `${assetsBaseUrl}/photos`;
  const introImageUrl = `${photoBaseUrl}/018.jpg`;
  const bridgeImageUrl = `${photoBaseUrl}/031.jpg`;
  const kakaoThumbnailImageUrl = `${baseUrl}${photoBaseUrl}/007.jpg`;
  const shareUrl = baseUrl + (searchParams.get('type')?.toLowerCase() === 'b' ? '/?type=b' : '');

  const photoRows = 2;
  const photoColumns = 16;
  const targetDate = new Date(2024, 6 - 1, 22);
  const days = (() => {
    const nextMonth = new Date(targetDate.getTime());
    nextMonth.setMonth(targetDate.getMonth() + 1);
    return Math.floor((nextMonth.getTime() - targetDate.getTime()) / 86400000);
  })();

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [imageMode, setImageMode] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [contactsVisible, setContactsVisible] = useState(false);

  useEffect(() => {
    init();
    new Sakura('.intro');
  }, []);

  useEffect(() => {
    const body = document.querySelector('body')!;
    if (imageMode) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [imageMode]);

  /*
  useEffect(() => {
    const root = document.querySelector('#root') as HTMLElement;
    const contacts = document.querySelector('.contacts') as HTMLElement;
    if (root && contacts && contactsVisible) {
      root!.classList.add('no-scroll');
      scrollToContactsCenter();
    } else {
      root?.classList.remove('no-scroll');
    }
  }, [contactsVisible]);
  */

  function init() {
    logEnv();
    initAudio();
    play();
    map();
    kakao();
  }

  function logEnv() {
    console.log(`%cenv %c${process.env.REACT_APP_ENV}`, "color: skyblue;", "color: inherit;");
  }

  function initAudio() {
    window.onbeforeunload = () => {
      stop();
    };
    document.onvisibilitychange = (_) => {
      if (document.visibilityState !== "visible") {
        stop();
      }
    };
    if (audioRef.current) {
      audioRef.current!.onpause = () => {
        setIsPlaying(false);
      };
      audioRef.current!.onplay = () => {
        setIsPlaying(true);
      }
      audioRef.current!.onplaying = () => {
        setIsPlaying(true);
      }
    }
  }

  function play() {
    if (audioRef.current !== null) {
      audioRef.current.volume = 0.7;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {

        });
    }
  }

  function stop() {
    if (audioRef.current !== null) {
      try {
        audioRef.current.pause();
        setIsPlaying(false);
      } catch (_) {

      }
    }
  }

  function handleTogglePlay() {
      if (isPlaying) {
        stop();
      } else {
        play();
      }
  }
  
  function map() {
    const center = new naver.maps.LatLng(37.5566195, 126.9963008);
    const mapOptions = {
      center,
      zoom: 14,
      zoomControl: true,
      zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT
      }
    };
    
    const map = new naver.maps.Map('map', mapOptions);

    const marker = new naver.maps.Marker({
      position: center,
      map: map
    });
  }

  function kakao() {
    try {
      Kakao.init('edf76d62fb95d5bb6baf9948f36e06e2');
    } catch (_: any) {

    }
  }

  function handleShareToKakao(e: MouseEvent<HTMLDivElement>) {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '유석모 ♥︎ 이지율 결혼합니다',
        description: '6월 22일 / 충무로 라비두스 👰🏻‍♀️💍🤵🏻',
        imageUrl: kakaoThumbnailImageUrl,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '모바일 청첩장 열기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        }
      ]
    });
  }

  function handleCopyUrl(e: MouseEvent<HTMLDivElement>) {
    MyClipboard.copy(shareUrl);
  }

  function handleImageClick(photoIndex: number) {
    setImageIndex(photoIndex);
    setImageMode(true);
  }

  function isHoliday(date: Date) {
    const holidays = ["01-01", "03-01", "05-05", "06-06", "08-15", "10-03", "10-09", "12-25"];
    const target = (date.getMonth() + 1).toString().padStart(2, "0") + 
      "-" +
      date.getDate().toString().padStart(2, "0");
    return holidays.includes(target);
  }

  function scrollToContactsCenter() {
    const root = document.querySelector('#root') as HTMLElement;
    const contacts = document.querySelector('.contacts') as HTMLElement;

    if (root && contacts) {
      const rootRect = root!.getBoundingClientRect();
      const contactsRect = contacts!.getBoundingClientRect();

      root!.scrollTo({
        top: contacts!.offsetTop - rootRect.height / 2 * 11 / 20,
        behavior: 'smooth',
      });
    }
  }

  return (
    <>
      <ImageViewer 
        imageMode={imageMode}
        setImageMode={setImageMode}
        photos={photos}
        photoBaseUrl={photoBaseUrl}
        imageIndex={imageIndex}
      />
      <Toast 
        text=""
        visible={false}
        level={ToastLevel.success}
      />
      <div className="main" >
        <div className="audio-controller" onClick={handleTogglePlay} >
          <div className="inside">
            <i className={isPlaying ? "fi fi-ss-volume" : "fi fi-ss-volume-slash"} />
          </div>
          <audio autoPlay={true} controls={false} loop={true} ref={audioRef}>
            <source src={`${assetsBaseUrl}/music.mp3`} type="audio/mpeg" />
          </audio>
        </div>

        <div className={"main-overlay" + (contactsVisible ? " visible" : "")} onClick={(_) => {setContactsVisible(false);}} />

        <div className="header">
          <div className="abstract">
            <div className="mark">WEDDING INVITATION</div>
            <div className="who"><span>유석모 </span><div className="line"><div className="stroke"></div></div><span> 이지율</span></div>
          </div>
        </div>

        <div className="intro">
          <div className="overlay" />
          <div className="border" />
          <img src={introImageUrl} className="image" />
        </div>

        <div className="context">
          <div className="abstract">
            <div className="who">Seokmo and Jiyul</div>
            <div className="when">2024년 6월 22일 토요일 오전 11시 30분</div>
            <div className="where">충무로 라비두스</div>
          </div>

          <p className="category font-script">
            Invitation
          </p>
          
          <div className="quote">
            {quoteText.split("\n").map((it, index) => <p key={index} className="contents">{it}</p>)}
            <p className="contents">{quoteReference}</p>
          </div>
          <div className="invitation">
            {invitationText.split("\n").map((it, index) => <p key={index} className="contents">{it.trim() === '' ? <span>&nbsp;</span> : it}</p>)}
          </div>

          <div className="parents">
            <table>
              <tbody>
                <tr>
                  <td><span>유승정 • 강미옥</span><small>의 아들 </small></td>
                  <td><span>석모 </span></td>
                </tr>
                <tr>
                  <td><span>이동관 • 이경래</span><small>의 딸 </small></td>
                  <td><span>지율 </span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <Contacts 
            contacts={[
              [
                {role: '신랑', name: '유석모', number: '010-6396-9094'},
                {role: '신랑 아버지', name: '유승정', number: '010-3029-9094'},
                {role: '신랑 어머니', name: '강미옥', number: '010-4488-9094'}
              ],
              [
                {role: '신부', name: '이지율', number: '010-4876-3918'},
                {role: '신부 아버지', name: '이동관', number: '010-4601-1075'},
                {role: '신부 어머니', name: '이경래', number: '010-4123-1737'}
              ]
            ]}
            setContactsVisible={setContactsVisible}
            contactsVisible={contactsVisible}
          />

          <div className="bridge-image">
            <img src={bridgeImageUrl}/>
          </div>

          <div className="calendar">
              <div className="row">
                <div className="item title">
                  2024. 06. 22
                </div>
              </div>
              <div className="row">
                <div className="item subtitle">
                  토요일 오전 11시 30분
                </div>
              </div>
              <div className="row">
                {'일월화수목금토'.split('').map((it, index) => <div key={index} className={`item weekdays${it === '일' ? ' sun' : (it === '토' ? ' sat' : '')}`}>{it}</div>)}
              </div>
              {
                [...new Array(Math.ceil((targetDate.getDay() + days) / 7)).keys()].map((_, index) => {
                  return <div key={index} className="row">
                    {[... new Array(7).keys()].map((_, index2) => {
                        const date = new Date(targetDate.getTime() - (targetDate.getDate() - 1) * 86400000);
                        date.setDate(-date.getDay() + date.getDate() + index * 7 + index2);
                        if (date.getMonth() === targetDate.getMonth()) {
                          return <div key={index2} className={`item date${date.getDay() === 0 || isHoliday(date) ? ' sun' : (date.getDay() === 6 ? ' sat' : '')}`}>
                              <div className={date.getDate() === targetDate.getDate() ? 'target' : ''}>
                                {date.getDate()}
                              </div>
                            </div>;
                        } else {
                          return <div key={index2} className="item date"></div>;
                        }
                    })}
                  </div>;
                })
              }
              <div className="row">
                <div className="item left-days">
                  <div>
                    <span>석모 </span><span className="heart">♥︎</span><span> 지율의 결혼식이 </span>
                    {(() => {
                      const now = new Date();
                      now.setHours(0);
                      now.setMinutes(0);
                      now.setSeconds(0);
                      now.setMilliseconds(0);
                      
                      const diff = Math.floor((targetDate.getTime() - now.getTime()) / 86400000);

                      if (diff > 0) {
                        return <>
                          <span className="highlight">{diff}일</span>
                          <span> 남았습니다.</span>
                        </>;
                      } else if (diff === 0) {
                        return <>
                          <span className="highlight">오늘</span>
                          <span>입니다.</span>
                        </>;
                      } else {
                        return <>
                          <span className="highlight">{-diff}일</span>
                          <span> 지났습니다.</span>
                        </>;
                      }
                    })()}
                  </div>
                </div>
              </div>
          </div>

          <div className="gallery">
            <p className="category font-script">
              Gallery
            </p>
          </div>

          <div className="photo">
            <div className="scrollable">
              {[...new Array(photoRows).keys()].map((row, index) => {
                  return <div className="photo-row" key={index}>
                    {
                      [...new Array(photoColumns).keys()].map((col, index2) => {
                        let photoIndex = row + col * photoRows;
                        let extraIndex = 0;
                        if (photoIndex > 0) {
                          extraIndex = [...new Array(photoIndex).keys()]
                            .map(it => photosContinuable.includes(photos[it]) ? Number(1) : Number(0))
                            .reduce((acc, s) => acc + s);
                          photoIndex = photoIndex + extraIndex;
                        }

                        if (photoIndex < photos.length) {
                          const photoUrl = `${photoBaseUrl}/${photos[photoIndex]}.jpg`;
                          let nextPhotoUrl = '';
                          if (photoIndex + 1 < photos.length && photosContinuable.includes(photos[photoIndex])) {
                            nextPhotoUrl = `${photoBaseUrl}/${photos[photoIndex + 1]}.jpg`;
                          }
                          return <div className="item" key={index2}>
                            {
                              nextPhotoUrl.length !== 0 ?
                              <>
                                <img src={photoUrl} onClick={(_) => handleImageClick(photoIndex)}/>
                                <img src={nextPhotoUrl} onClick={(_) => handleImageClick(photoIndex + 1)}/>
                              </> :
                              <img src={photoUrl} onClick={(_) => handleImageClick(photoIndex)}/>
                            }
                          </div>;
                        } else {
                          return <div className="item" key={index2}></div>;
                        }
                      })
                    }
                  </div>; 
              })}
            </div>
          </div>
          <div className="location">
            <p className="category font-script">
              Location
            </p>
          </div>
          <div className="address">
            <p className="contents">
              <span>서울특별시 중구 필동로 5길 7</span><i className="fi fi-sr-copy-alt" onClick={(_) => MyClipboard.copy('서울특별시 중구 필동로 5길 7')}></i>
            </p>
            <p className="contents">
              <span>(서울특별시 중구 필동3가 62-11번지)</span><i className="fi fi-sr-copy-alt"onClick={(_) => MyClipboard.copy('서울특별시 중구 필동3가 62-11번지')}></i>
            </p>
            
            <p className="contents">
              <span>라비두스 </span><span><a href="tel:0222657000">02-2265-7000</a></span>
            </p>
          </div>
          <Map
            assetsBaseUrl={assetsBaseUrl}
          />
          <div className="information">
            {informations.map((it, index) => {
              return <div className="container" key={index}>
                <div>
                  <p className="subtitle">
                    {it[0]}
                  </p>
                </div>
                <div>
                  {(it[1] as string[]).map((row, index2) => {
                    const rows = row.split("\n");
                    return <p className="item" key={index2}>
                      {rows[0]}
                      {rows.length > 1 ? <>
                        <br />
                        {rows.slice(1).map((inner, index3) => <span key={index3} className="inner">{inner}</span>)}
                      </> : <></>}
                    </p>;
                  }
                  )}
                </div>
              </div>;
            })}
          </div>
          <Attendance />
          <div className="with-loves">
            <p className="category">
              마음 전하실 곳
            </p>
            <div className="description">
              <p>참석이 어려워 직접 축하를 전하지 못하는</p>
              <p>분들을 위해 계좌번호를 기재하였습니다.</p>
              <p>넓은 마음으로 양해 부탁드립니다.</p>
              <p>전해주시는 진심은 소중하게 간직하여</p>
              <p>좋은 부부의 모습으로 보답하겠습니다.</p>
            </div>
            <WithLove 
              title="신랑"
              accounts={[
                {role: '신랑', name: '유석모', org: '신한', number: '110-339-802812', kakaopay: 'https://qr.kakaopay.com/FQmpws7tU'},
                {role: '신랑 아버지', name: '유승정', org: '농협', number: '173652-52-116806', kakaopay: 'https://qr.kakaopay.com/FLXR9ritj'},
                {role: '신랑 어머니', name: '강미옥', org: '농협', number: '830-12-004114', kakaopay: 'https://qr.kakaopay.com/Ej8izb0FE'}
              ]}
            />
            <WithLove 
              title="신부"
              accounts={[
                {role: '신부', name: '이지율', org: '우리', number: '1002-659-778030', kakaopay: 'https://qr.kakaopay.com/FDzxxLTmu'},
                {role: '신부 아버지', name: '이동관', org: '신한', number: '110-219-162247', kakaopay: 'https://qr.kakaopay.com/FKc9F4X7Z'},
                {role: '신부 어머니', name: '이경래', org: '신한', number: '954-04-357571', kakaopay: 'https://qr.kakaopay.com/FcJnZ8Zka'}
              ]}
            />
          </div>
          <GuestBook />
          <div className="appendix">
            <input className="share-to-kakao" type="button" value="카카오톡 공유하기" onClick={handleShareToKakao}/>
            <input className="copy-url" type="button" value="링크주소 복사하기" onClick={handleCopyUrl}/>
          </div>
          <div className="tail">
            <p className="contents">
              Seokmo & Jiyul
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
