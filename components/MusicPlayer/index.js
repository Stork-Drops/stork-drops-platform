import React, { useContext, useEffect } from "react"
import { useAudioPlayer } from "react-use-audio-player"
import { Popover, Grid, Avatar, Tooltip, Button } from '@nextui-org/react';
import { FiMusic, FiPlay, FiPause, FiSkipForward, FiSkipBack } from "react-icons/fi";
import { MusicContext } from "../../context/MusicContext"

const MusicPlayerControls = () => {
    const { songIndex, setSongIndex } = useContext(MusicContext);
    const songs = [
        {
            title: "Reality Surf (sober mix)",
            songCoverArt: "https://creatornode2.audius.co/ipfs/QmTEti3gduUQx5Qp5cHT5P4MFVJmv9diB3vBfRsSCBdvax/150x150.jpg",
            artist: "sober rob",
            src: 'https://creatornode2.audius.co/tracks/stream/07Ey9'
        },
        {
            title: "Boss Up (Remix)",
            songCoverArt: "https://creatornode2.audius.co/ipfs/QmXvkbpVpkCgTgCcmiRjMwMrJBcwhSn43MofhVeprjwkXk/150x150.jpg",
            artist: "MadeinTYO, SANGO",
            src: 'https://creatornode2.audius.co/tracks/stream/vJMZ8'
        },
        {
            title: "FIRST",
            songCoverArt: "https://creatornode.audius.co/ipfs/QmUUoXS8YsfhzLaHhasfKS1sv5qpuBSdj7GuWho5nYwLQg/150x150.jpg",
            artist: "TOKEGOD",
            src: 'https://creatornode2.audius.co/tracks/stream/YmoZm'
        },
    ]

    const { togglePlayPause, ready, loading, playing, load } = useAudioPlayer({
        src: songs[songIndex].src,
        html5: true,
        format: "mp3",
        onend: () => {
            if(songIndex < songs.length - 1){
                setSongIndex(songIndex + 1)
            } else {
                setSongIndex(0)
            }
        },
    })

    //if (!ready && !loading) return <div>No audio to play</div>

    // loop back to beginning if songIndex is less than total array length -1
    const nextTrack = () => {
        if(songIndex < songs.length - 1){
            setSongIndex(songIndex + 1)
        } else {
            setSongIndex(0)
        }
    }

    const prevTrack = () => {
        if(songIndex > songs.length + 1){
            setSongIndex(songIndex - 1)
        } else {
            setSongIndex(0)
        }
    }

    return (
        <div className="w-fit">
            <div className="flex items-center justify-between">
                <div className="flex items-center mr-4">
                    <img 
                        className="mr-2 rounded-xl w-10 h-10" 
                        src={songs[songIndex].songCoverArt} alt="songCoverArt" 
                    />
                    <div>
                        <p className="text-dracula text-xs font-semibold">{songs[songIndex].title}</p>
                        <p className="text-gray-400 text-xs">{songs[songIndex].artist}</p>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-3 grid-rows-1 items-center gap-4">
                        <button onClick={()=> prevTrack()}>
                            {songIndex === 0 ?  "" : <FiSkipBack className="w-4 h-4"/>}
                        </button>
                        <button onClick={togglePlayPause}>{playing ? <FiPause className="w-4 h-4"/> : <FiPlay className="w-4 h-4"/>}</button>
                        <button onClick={()=> nextTrack()}><FiSkipForward className="w-4 h-4"/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MusicPlayer = () => {

    return(
        <MusicPlayerControls/>
    )
}

export default MusicPlayer;



