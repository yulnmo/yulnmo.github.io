import React, { MouseEvent } from 'react';

type KakaoPayButtonProps = {
    value: string
};

const KakaoPayButton = ({value}: KakaoPayButtonProps) => {

    function handleClick(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        window.open(value);
    }

    if (value.trim().length > 0) {
        return <div className="kakaopay-button" onClick={handleClick}>
            <div className='inner'>
                <img src="./assets/kakaopay.svg" />
            </div>
        </div>;
    } else {
        return <></>;
    }
};

export default KakaoPayButton;
