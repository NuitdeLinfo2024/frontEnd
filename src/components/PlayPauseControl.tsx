import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

interface PlayPauseControlProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  onPlayingChange: (isPlaying: boolean) => void; // Callback to notify App.tsx
}

const PlayPauseControl: React.FC<PlayPauseControlProps> = ({ audioRef, onPlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        onPlayingChange(false); // Notify parent that audio is paused
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        onPlayingChange(true); // Notify parent that audio is playing
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the beginning
      setIsPlaying(false);
      onPlayingChange(false); // Notify parent that audio is stopped
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 16, left: 16, zIndex: 9999 }}>
      <IconButton onClick={handlePlayPause} aria-label={isPlaying ? 'pause' : 'play'}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton onClick={handleStop} aria-label="stop">
        <StopIcon />
      </IconButton>
    </div>
  );
};

export default PlayPauseControl;
