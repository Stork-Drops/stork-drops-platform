import React, { FC, MouseEvent, useCallback } from 'react';
import { Button, ButtonProps } from './Button';
import { useWalletModal } from './useWalletModal';

export const WalletModalButton: FC<ButtonProps> = ({ children = 'Connect Wallet', onClick, ...props }) => {
    const { visible, setVisible } = useWalletModal();

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (onClick) onClick(event);
            if (!event.defaultPrevented) setVisible(!visible);
        },
        [onClick, visible]
    );

    return (
        <button className="bg_sunrise text-white text-normal font-semibold px-4 py-2 rounded-xl" onClick={handleClick} {...props}>
            {children}
        </button>
    );
};
