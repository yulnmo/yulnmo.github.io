import React from 'react';
import '../styles/App.css';

function App() {
  const quoteText = "인생은 누구나 비슷한 길을 걷어간다.\n" +
    "나이가 들어 지난 날을 추억하는 것이다.\n" +
    "그러니 결혼은 따뜻한 사람과 하거라.";
  const quoteReference = "영화 《어바웃타임》 中";

  const invitationText = "소중하고 따뜻한 두 사람이 만나​\n" +
    "함께하는 일곱 번째 푸르른 여름날\n" +
    "연인에서 부부로 새로운 시작을 합니다.\n\n" +
    "귀한 발걸음 하시어 축복해 주시면\n" +
    "더 없는 격려와 기쁨으로 간직하겠습니다.";
  const invitationReference = "석모 • 지율 올림";

  const informations = [
    ["지하철 이용 시", ["3, 4호선 충무로역", "도보: 1번 출구에서 약 10분", "셔틀버스: 1번 출구 앞 (3분 간격 운행)\n오전 10시 30분부터 오전 11시 30분까지 운행됩니다."]],
    ["주차 안내", ["라비두스 주차장(3시간 무료)"]]
  ];

  return (
    <div className="main">
      <div className="intro">
        <img src="/R240311002_0616-2.jpg" className="image" />
      </div>
      <div className="context">
        <p className="category">
          INVITATION
        </p>
        <div className="quote">
          {quoteText.split("\n").map(it => <p className="contents">{it}</p>)}
          <p className="contents">{quoteReference}</p>
        </div>
        <div className="invitation">
          {invitationText.split("\n").map(it => <p className="contents">{it}</p>)}
          <p className="contents">{invitationReference}</p>
        </div>

        <div className="img">
        </div>

        <p className="contents">
          <span>유승정 • 강미옥</span><small>의 아들 </small><span>석모</span>
        </p>
        <p className="contents">
          <span>이동관 • 이경래</span><small>의 딸 </small><span>지율</span>
        </p>
        <p className="category">PHOTO</p>
        <input type="button" value="사진 더 둘러보기" />
        <p className="contents">
          2024년 6월 22일 토요일 오전 11시 30분
        </p>
        <p className="contents">
          라비두스
        </p>
        <p className="contents">
          서울특별시 중구필동로 5길 7(필동3가 62-11번지)
        </p>
        <p className="contents">
          T. 02-2265-7000
        </p>

        <div className="maps">
          <div className="map"></div>
          <p className="contents">
            약도 클릭시 네이버 지도로 이동
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
                      {rows.slice(1).map(inner => <span className="inner">{inner}</span>)}
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
