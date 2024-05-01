import React from 'react';

type ToastProps = {
    text: string,
    visible: boolean,
    level: string
};

export const ToastLevel = {
    info: 'info',
    success: 'success'
} as const;

export type ToastLevel = typeof ToastLevel[keyof typeof ToastLevel]; 

const Toast = ({text, visible, level}: ToastProps) => {
    if (visible) {
        return <div className="toast-wrapper">
            <div className={"toast " + level}>
                <div className="text">{text}</div>
            </div>
        </div>;
    } else {
        return <></>;
    }
};

export default Toast;