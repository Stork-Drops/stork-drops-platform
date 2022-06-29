import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, ButtonProps } from './Button';
import { useWalletModal } from './useWalletModal';
import { WalletConnectButton } from './WalletConnectButton';
import { WalletIcon } from './WalletIcon';
import { WalletModalButton } from './WalletModalButton';
import { Dropdown, Grid, Text, User } from "@nextui-org/react";
import { FiCopy, FiLayers, FiPower, FiHelpCircle } from "react-icons/fi";
import { PublicKey, clusterApiUrl, Connection } from '@solana/web3.js';
import findFavoriteDomainName from "../../components/BonfidaSNS";
import CyberConnect, { Env, Blockchain } from "@cyberlab/cyberconnect";
import Solana from "@cyberlab/cyberconnect"
import { performReverseLookup } from "@bonfida/spl-name-service";
import MusicPlayer from "../../components/MusicPlayer";

export const WalletMultiButton: FC<ButtonProps> = ({ children, ...props }) => {
    const { publicKey, wallet, disconnect, connected } = useWallet();
    const solanaProvider = useWallet();
    const [bonfidaName, setBonfidaName] = useState('');
    const { setVisible } = useWalletModal();
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLUListElement>(null);

    // const cyberConnect = new CyberConnect({
    //     namespace: 'CyberConnect',
    //     env: Env.PRODUCTION,
    //     chain: Blockchain.SOLANA,
    //     provider: solanaProvider,
    //     chainRef: Solana.SOLANA_MAINNET_CHAIN_REF,
    //   });

    const exampleAddress = useMemo(() => publicKey, [publicKey]);
    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const content = useMemo(() => {
        if (children) return children;
        if (!wallet || !base58) return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [children, wallet, base58]);

    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    //const domainKey = new PublicKey("7bkN3vTa6zZn4tAmBGgeEN5L9SFhoqV96Zm5aQA5ZvG1");

    // const findDomainName = async () => {
    //     try{
    //         const bonfidaName = await performReverseLookup(connection, domainKey);
    //         setBonfidaName(bonfidaName)
    //         console.log(bonfidaName)
    //     } catch (err) {
    //         console.log(err);
    //     }

    // }

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
        <Grid.Container gap={2} alignItems='center'>
        <Grid>
            <MusicPlayer/>
        </Grid>
        <Grid>
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
                color="primary"
                name="apevesting.sol"
                description="@apevesting"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="primary" aria-label="User Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as {content}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="copyAddress" withDivider>
                <Button onClick={copyAddress}>
                    <div className="flex items-center">
                        <FiCopy className="mr-2"/>
                        {copied ? 'Copied' : 'Copy Address'}
                    </div>
                </Button>
            </Dropdown.Item>
            <Dropdown.Item key="helpCenter">
                <Button onClick={copyAddress}>
                    <div className="flex items-center">
                        <FiHelpCircle className="mr-2"/>
                        Help Center
                    </div>
                </Button>
            </Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
                <Button onClick={openModal}>
                    <div className="flex items-center">
                        <FiLayers className="mr-2"/> Change wallet
                    </div>
                </Button>
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
                <Button onClick={disconnect}>
                    <div className="flex items-center">
                        <FiPower className="mr-2"/> Disconnect
                    </div>
                </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Grid>
        </Grid.Container>
    );
};
