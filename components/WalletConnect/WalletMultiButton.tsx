import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState, useContext } from 'react';
import { Button, ButtonProps } from './Button';
import { useWalletModal } from './useWalletModal';
import { WalletConnectButton } from './WalletConnectButton';
import { WalletModalButton } from './WalletModalButton';
import { Dropdown, Grid, User } from "@nextui-org/react";
import { FiCopy, FiLayers, FiPower, FiHelpCircle } from "react-icons/fi";
import { fetchSolanaNameServiceName } from "../../utils/name-service"
import { ProfileContext } from "../../context/ProfileContext"
import { getHandleAndRegistryKey } from "@bonfida/spl-name-service";
import MusicPlayer from '@components/MusicPlayer';

export const WalletMultiButton: FC<ButtonProps> = ({ children, ...props }) => {
    const { bonfidaUsername, setBonfidaUsername, setWalletAddress, setCompactWalletAddress, twitterUsername, setTwitterUsername, setDomainCollection } = useContext(ProfileContext);
    const { connection } = useConnection();
    const { publicKey, wallet, disconnect, connected } = useWallet();
    const { setVisible } = useWalletModal();
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLUListElement>(null);

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

    // Set Wallet Address
    const loadWalletAddress = () => {
        setWalletAddress(base58);
    };

    // Set Compact Address
    const loadCompactAddress = () => {
        setCompactWalletAddress(shortenedWalletAddress)
    };

    // Bonfida SNS Username
    const loadSNSUsername = async () => {
        try {
            const username = await fetchSolanaNameServiceName(connection, base58);
            setBonfidaUsername(username.solanaDomain);
        } catch (error) {
            console.log(error);
        }
    }

    const getTwitterName = async () => {
        try{
            const registry = await getHandleAndRegistryKey(connection, publicKey);
            setTwitterUsername(registry[0]);
        } catch (error){
            console.log(error)
        }
    }
    
    const shortenedWalletAddress = useMemo(() => {
        if (children) return children;
        if (!wallet || !base58) return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [children, wallet, base58]);

    const copyAddress = useCallback(async () => {
        if (base58) {
            await navigator.clipboard.writeText(base58);
            setCopied(true);
            setTimeout(() => setCopied(false), 400);
        }
    }, [base58]);

    const openDropdown = useCallback(() => {
        setActive(true);
    }, []);

    const closeDropdown = useCallback(() => {
        setActive(false);
    }, []);

    const openModal = useCallback(() => {
        setVisible(true);
        closeDropdown();
    }, [closeDropdown]);

    useEffect(() => {
        loadSNSUsername();
        loadWalletAddress();
        loadCompactAddress();
        getTwitterName();
    }, [base58])

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const node = ref.current;

            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target as Node)) return;

            closeDropdown();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, closeDropdown]);

    if (!wallet) return <WalletModalButton {...props}>{children}</WalletModalButton>;
    if (!base58) return <WalletConnectButton {...props}>{children}</WalletConnectButton>;

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                <Dropdown placement="bottom-right">
                    <Dropdown.Trigger>
                        <User
                            css={{
                                textTransform: 'lowercase',
                            }}
                            className="lowercase"
                            squared
                            bordered
                            as="button"
                            size="md"
                            name={bonfidaUsername ? bonfidaUsername  : shortenedWalletAddress}
                            description={twitterUsername ? "@" + twitterUsername : ''}
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Menu color="primary" aria-label="User Actions">
                        <Dropdown.Item key="compactProfile" css={{ height: "$18" }}>
                            <User
                                css={{
                                    textTransform: 'lowercase',
                                }}
                                className="lowercase"
                                squared
                                bordered
                                as="button"
                                size="lg"
                                color="primary"
                                name={bonfidaUsername ? bonfidaUsername  : shortenedWalletAddress}
                                description={twitterUsername ? "@" + twitterUsername : ''}
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            />
                        </Dropdown.Item>
                        <Dropdown.Item key="copyAddress" withDivider>
                            <Button onClick={copyAddress}>
                                <div className="flex items-center">
                                    <FiCopy className="mr-1"/>
                                    {copied ? 'Copied' : 'Copy Address'}
                                </div>
                            </Button>
                        </Dropdown.Item>
                        <Dropdown.Item key="helpCenter">
                            <Button onClick={copyAddress}>
                                <div className="flex items-center">
                                    <FiHelpCircle className="mr-1"/>
                                    Help Center
                                </div>
                            </Button>
                        </Dropdown.Item>
                        <Dropdown.Item key="help_and_feedback" withDivider>
                            <Button onClick={openModal}>
                                <div className="flex items-center">
                                    <FiLayers className="mr-1"/> Change wallet
                                </div>
                            </Button>
                        </Dropdown.Item>
                        <Dropdown.Item key="logout" color="error" withDivider>
                            <Button onClick={disconnect}>
                                <div className="flex items-center">
                                    <FiPower className="mr-1"/> Logout
                                </div>
                            </Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};
