import React, { useEffect, useRef, useState } from 'react';
import '../styles/App.css';

function App() {
  const quoteText = "최고의 사랑은 영혼을 일깨우고\n" +
    "더 많이 소망하게 하고\n" +
    "가슴에 열정을, 마음에 평화를 주지\n" +
    "네게서 그걸 얻었고..\n" +
    "너에게 영원히 주고 싶어.";
  const quoteReference = "영화 《노트북》 中";

  const invitationText = "소중하고 따뜻한 두 사람이 만나​\n" +
    "함께하는 일곱 번째 푸르른 여름날\n" +
    "연인에서 부부로 새로운 시작을 합니다.\n\n" +
    "귀한 발걸음 하시어 축복해 주시면\n" +
    "더 없는 격려와 기쁨으로 간직하겠습니다.";
  const invitationReference = "석모 • 지율 올림";

  const informations = [
    ["지하철 이용 시", ["3, 4호선 충무로역", "도보: 1번 출구에서 약 10분", "셔틀버스: 1번 출구 앞 (3분 간격 운행)\n오전 10시 30분부터 오전 11시 30분까지 운행"]],
    ["주차 안내", ["라비두스 주차장(3시간 무료)"]]
  ];

  const photos = [...new Array(30).keys()].map(it => it.toString().padStart(3, "0"));
  const photoBaseUrl = "/photos";
  const photoRows = 2;
  const photoColumns = 2;
  const targetDate = new Date(2024, 6 - 1, 22);
  const days = (() => {
    const nextMonth = new Date(targetDate.getTime());
    nextMonth.setMonth(targetDate.getMonth() + 1);
    return (nextMonth.getTime() - targetDate.getTime()) / 86400000;
  })();

  console.log('days ' + days);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    play();
  }, []);

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

  return (
    <div className="main">
      <div className="audio-controller">
        <i className={isPlaying ? "fi fi-ss-volume" : "fi fi-ss-volume-slash"} onClick={() => {
          if (isPlaying) {
            stop();
          } else {
            play();
          }
        }} />
      </div>
      <audio autoPlay={true} controls={false} loop={true} ref={audioRef}>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <div className="intro">
        <img src="/R240311002_0616-2.jpg" className="image" />
      </div>
      <div className="context">
        <p className="category">
          INVITATION
        </p>
        <div className="quote">
          {quoteText.split("\n").map((it, index) => <p key={index} className="contents">{it}</p>)}
          <p className="contents">{quoteReference}</p>
        </div>
        <div className="invitation">
          {invitationText.split("\n").map((it, index) => <p key={index} className="contents">{it}</p>)}
          <p className="contents">{invitationReference}</p>
        </div>

        <div className="img">
        </div>

        <div className="parents">
          <table>
            <tbody>
              <tr>
                <td><span>유승정 • 강미옥</span><small>의 아들 </small></td>
                <td><span>석모</span></td>
              </tr>
              <tr>
                <td><span>이동관 • 이경래</span><small>의 딸 </small></td>
                <td><span>지율</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="category">PHOTO</p>
        <div className="photo">
              {[...new Array(photoRows).keys()].map((row, index) => {
                  return <div className="photo-row" key={index}>
                    {
                      [...new Array(photoColumns).keys()].map((col, index2) => {
                        const photoIndex = row * photoColumns + col + 1;
                        const photoUrl = `${photoBaseUrl}/${photos[photoIndex]}.jpeg`;
                        return <div className="item" key={index2}>
                          <img src={photoUrl}/>
                        </div>;
                      })
                    }
                  </div>;
                  
              })}
          <input type="button" value="사진 더 둘러보기" />
        </div>
        <div className="calendar">
            <div className="row">
              <div className="item title">
                6월
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
                        return <div key={index} className={`item date${date.getDay() === 0 ? ' sun' : (date.getDay() === 6 ? ' sat' : '')}`}>
                            <div className={date.getDate() === targetDate.getDate() ? 'target' : ''}>
                              {date.getDate()}
                            </div>
                          </div>;
                      } else {
                        return <div key={index} className="item date"></div>;
                      }
                  })}
                </div>;
              })
            }
        </div>
        <div className="schedule">
          <p className="contents">
            2024년 6월 22일 토요일 오전 11시 30분
          </p>
          <p className="contents">
            라비두스
          </p>
          <p className="contents">
            서울특별시 중구필동로 5길 7
          </p>
          <p className="contents">
            (필동3가 62-11번지)
          </p>
          <p className="contents">
            T. 02-2265-7000
          </p>
        </div>
        <div className="maps">
          <div className="map">
            <img src="/map.jpg" className="image" />
          </div>
          <p className="contents">
            <a href="https://naver.me/GMWNlBjS">네이버 지도로 이동</a>
          </p>
        </div>
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
        <div className="appendix">
          <input type="button" value="카톡으로 공유하기" />
        </div>
        <div className="tail">
          <p className="contents">
            Seokmo & Jiyul
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
