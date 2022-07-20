import React, { useContext } from "react"
import { useAudioPlayer } from "react-use-audio-player"
import { Popover, Grid, Avatar } from '@nextui-org/react';
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
    console.log(`song index is: ` + songs[songIndex].src);

    const { togglePlayPause, ready, loading, playing, load } = useAudioPlayer({
        src: songs[songIndex].src,
        html5: true,
        format: "mp3",
        autoplay: true,
        onend: () => nextTrack(),
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
        <div>
            <Grid.Container gap={2} direction="row">
            <Grid>
                <img 
                    className="rounded-xl w-16 h-16" 
                    src={songs[songIndex].songCoverArt} alt="songCoverArt" 
                />
            </Grid>
            <Grid>
                <p className="text-dracula text-xs font-semibold">{songs[songIndex].title}</p>
                <p className="text-gray-400 text-xs">{songs[songIndex].artist}</p>
                <Grid.Container gap={2} direction="row" justify="center">
                    <Grid xs={4}>
                        <button onClick={()=> prevTrack()}>
                            {songIndex === 0 ?  "" : <FiSkipBack className="w-5 h-5"/>}
                        </button>
                    </Grid>
                    <Grid xs={4}>
                        <button onClick={togglePlayPause}>{playing ? <FiPause className="w-5 h-5"/> : <FiPlay className="w-5 h-5"/>}</button>
                    </Grid>
                    <Grid xs={4}>
                        <button onClick={()=> nextTrack()}><FiSkipForward className="w-5 h-5"/></button>
                    </Grid>
                </Grid.Container>
            </Grid>
        </Grid.Container>
        <div className="flex items-center justify-center mb-2.5">
            <img src="/audius.png" alt="Audius Logo" className="w-16"/>
        </div>
        </div>
    )
}

const MusicPlayer = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return(
        <Popover placement="bottom-right" isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
                <Avatar squared size="md" icon={<FiMusic className="bg-celan-blue" size={16} />} />
            </Popover.Trigger>
            <Popover.Content className="rounded-xl shadow-lg">
                <MusicPlayerControls/>
            </Popover.Content>
        </Popover>
    )
}

export default MusicPlayer;



