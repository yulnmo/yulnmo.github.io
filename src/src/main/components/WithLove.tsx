import React, { MouseEvent, useState } from 'react';
import CopyButton from './CopyButton';
import KakaoPayButton from './KakaoPayButton';

type WithLoveProps = {
    title: string,
    accounts: Array<Account>
}

export type Account = {
    org: string,
    number: string,
    name: string,
    role: string,
    kakaopay: string
}

const WithLove = ({title, accounts}: WithLoveProps) => {

    const [visible, setVisible] = useState(false);

    function handleClick(e: MouseEvent<HTMLDivElement>) {
        setVisible(!visible);
    }

    return <div className={`with-love` + (visible ? ' visible' : '')}>
        <div className="title" onClick={handleClick}>
            <span>{title} 측 계좌번호</span>
            <div className="arrows">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`arrow` + (visible ? ' rotate' : '')}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
        <div className="group">
            {accounts.map((account, index) => {
                return <div key={index} className={`item` + (visible ? ' visible' : '')}>
                    <div className="row">
                        <div className="col left">
                            <span className="org">{account.org}</span>
                            <span className="number"> {account.number.split('').map((it, index2) => <span key={index2}>{it}</span>)}</span>
                        </div>
                        <div className="col right">
                            <CopyButton 
                                value={account.number.replace(/\-/g, "")}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col left">
                            <span className="role">{account.role}</span>
                            <span className="name"> {account.name}</span>
                        </div>
                        <div className="col right">
                            <KakaoPayButton 
                                value = {account.kakaopay}
                            />
                        </div>
                    </div>
                </div>;
            })}
        </div>
    </div>;
};

export default WithLove;
