import React, { useState, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const PlayPodcastButton: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setPlaying(!playing);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <audio ref={audioRef} src="./podcast.mp3">
        <track kind="captions" />
      </audio>
      <IconButton onClick={handlePlayPause} aria-label="play/pause">
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </Box>
  );
};

export default PlayPodcastButton;