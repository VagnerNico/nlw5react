import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import { PlayerButtons } from '../PlayerButtons';
import { PlayerSlider } from '../PlayerSlider';

export const PlayerFooter: FC<{ renderAudio: boolean }> = ({ renderAudio }): ReactElement => {
  const {
    clearPlayerState,
    currentEpisodeIndex,
    episodeList,
    hasNext,
    isLooping,
    isPlaying,
    playNext,
    setPlayingState,
  } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    if (!isPlaying) audioRef.current.pause();
  }, [isPlaying]);

  function handleEpisodeEnded(): void {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
      setProgress(0);
    }
  }

  function handleSeek(amount: number): void {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function setupProgressListener(): void {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener(`timeupdate`, () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  return (
    <>
      <PlayerSlider handleSeek={handleSeek} progress={progress} />
      {episode && renderAudio && (
        //eslint-disable-next-line
        <audio
          autoPlay
          loop={isLooping}
          onEnded={handleEpisodeEnded}
          onLoadedMetadata={setupProgressListener}
          onPause={() => setPlayingState(false)}
          onPlay={() => setPlayingState(true)}
          ref={audioRef}
          src={episode.file.url}
        />
      )}
      <PlayerButtons />
    </>
  );
};
