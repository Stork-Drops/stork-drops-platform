import React, { CSSProperties, FC, MouseEvent, ReactElement } from 'react';

export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    endIcon?: ReactElement;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    startIcon?: ReactElement;
    style?: CSSProperties;
    tabIndex?: number;
}

export const Button: FC<ButtonProps> = (props) => {
    return (
        <button
            className="flex space-between mr-2"
            disabled={props.disabled}
            onClick={props.onClick}
            tabIndex={props.tabIndex || 0}
            type="button">
                
            {/* {props.startIcon && <i className="wallet-adapter-button-start-icon">{props.startIcon}</i>} */}
            <span>{props.children}</span>
            {/* {props.endIcon && <i className="wallet-adapter-button-end-icon">{props.endIcon}</i>} */}
        </button>
    );
};
