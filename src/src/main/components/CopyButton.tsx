import React, { MouseEvent } from 'react';
import MyClipboard from '../service/MyClipboard';

type CopyButtonProps = {
    value: string
};

const CopyButton = ({value}: CopyButtonProps) => {

    function handleClick(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        MyClipboard.copy(value);
    }

    return <div className="copy-button" onClick={handleClick}>
        <svg aria-hidden="true" width="46.08" height="46.08" viewBox="0.48 0.48 23.04 23.04" fill="#222F3D" className="icon">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>
        <span> 복사</span>
    </div>;
};

export default CopyButton;
