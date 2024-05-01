import React, { useState, MouseEvent, useRef } from 'react';
import AttendanceExchange, { AttendanceMeal, AttendanceRequest, AttendanceResponse, AttendanceRole } from '../service/AttendanceExchange';
import AccessExchange, { TokenResponse } from '../service/AccessExchange';

type AttendanceRequestForm = {
    role: string,
    name: string,
    number: string,
    meal: string
};

const Attendance = () => {
    const initialAttendanceRequest = {
        role: AttendanceRole.GROOM,
        name: '',
        number: '1',
        meal: AttendanceMeal.HAVE
    };

    const [visible, setVisible] = useState(false);
    const [attendanceRequest, setAttendanceRequest] = useState<AttendanceRequestForm>(initialAttendanceRequest);
    const [success, setSuccess] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const numberRef = useRef<HTMLInputElement>(null);

    function handleClick(e: MouseEvent<HTMLDivElement>) {
        setVisible(!visible);
    }

    function validate() {
      return !(attendanceRequest.name.trim().length === 0 ||
        attendanceRequest.number.trim().length === 0);
    }

    function handlePost() {
        if (!validate()) {
            alert('양식을 모두 채워주세요.');
            return;
        }

        const requestBody = {
            ...attendanceRequest,
            number: Number(attendanceRequest.number.trim()),
            password: ''
        };

        proceedWithAccessToken(accessToken =>
            { 
                AttendanceExchange.post(
                    {
                        requestBody,
                        accessToken: accessToken,
                        doOnSuccess: (response: AttendanceResponse) => {
                            setVisible(false);
                            setSuccess(true);
                            setAttendanceRequest(initialAttendanceRequest);
                            setTimeout(() => {
                                setSuccess(false);
                            }, 1000);
                        },
                        doOnError: () => {
                            alert('일시적으로 이용이 불가합니다.\n잠시 후 시도해주세요.');
                        }
                    }
                );
            }
        );
    }

    function proceedWithAccessToken(callback: (_: string) => void) {
        AccessExchange.post(
            {
                requestBody: undefined,
                accessToken: '',
                doOnSuccess: (tokenResponse: TokenResponse) => {
                    callback(tokenResponse.accessToken);
                },
                doOnError: () => {}
            }
        );
    }
    
    return <div className={`attendance` + (visible ? ' visible' : '')} >
        <p className="category">
            참석 의사 전달
        </p>
        <div className="guide">
            <p>참석해주시는 모든 분들을</p>
            <p>귀하게 모실 수 있도록</p>
            <p>참석 의사를 알려주시면 감사하겠습니다.</p>
        </div>
        <div className={"area" + (success ? " success" : "")} onClick={handleClick}>
            <i className="fi fi-sr-check icon"></i>
            <span>참석 의사 전달하기</span>
            <div className="arrows">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`arrow` + (visible ? ' rotate' : '')}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
        <div className="form">
            <div className="row">
                <div className="label">
                    구분
                </div>
                <div className="input">
                    {
                        [['신랑측', AttendanceRole.GROOM], ['신부측', AttendanceRole.BRIDE]].map((it, index) => {
                            return <div key={index} className={"role" + (attendanceRequest.role === it[1] ? ' selected' : '')} onClick={(_) => setAttendanceRequest((prev) => ({...prev, role: it[1]}))}>
                                {it[0]}
                            </div>;
                        })
                    }
                </div>
            </div>
            <div className="row">
                <div className="label" onClick={(_) => {nameRef.current?.focus();}}>
                    성함
                </div>
                <div className="input">
                    <input ref={nameRef} type="text" className="textbox" placeholder='성함을 입력해주세요.' value={attendanceRequest.name} onChange={(e) => {setAttendanceRequest((prev) => ({...prev, name: e.target.value.trim()}))}} />
                </div>
            </div>
            <div className="row">
                <div className="label" onClick={(_) => {numberRef.current?.focus();}}>
                    참석인원
                </div>
                <div className="input">
                    <input ref={numberRef} type="number" className="textbox" placeholder='인원을 입력해주세요.' value={attendanceRequest.number} onChange={(e) => {setAttendanceRequest((prev) => ({...prev, number: (Number(e.target.value) > 50 ? 50 : (e.target.value.trim() !== '' && Number(e.target.value) < 1 ? 1 : e.target.value)).toString()}))}}/>
                </div>
            </div>
            <div className="row end">
                <div className="label">
                    식사여부
                </div>
                <div className="input">
                    {
                        [['예정', AttendanceMeal.HAVE], ['안함', AttendanceMeal.SKIP], ['미정', AttendanceMeal.UNDECIDED]].map((it, index) => {
                            return <div key={index} className={"meal" + (attendanceRequest.meal === it[1] ? ' selected' : '')} onClick={(_) => setAttendanceRequest((prev) => ({...prev, meal: it[1]}))}>
                                {it[0]}
                            </div>;
                        })
                    }
                </div>
            </div>
            <div className="row end manipulate">
                <input type="button" value="참석 의사 전달하기" onClick={handlePost}/>
            </div>
        </div>
    </div>;
}

export default Attendance;