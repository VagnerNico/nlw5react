import { FC } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

export const PlayerButtons: FC = () => {
  const {
    currentEpisodeIndex,
    episodeList,
    hasNext,
    hasPrevious,
    isLooping,
    isPlaying,
    isShuffling,
    playNext,
    playPrevious,
    toggleLoop,
    togglePlay,
    toggleShuffle,
  } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={styles.buttons}>
      <button
        className={isShuffling ? styles.isActive : ``}
        disabled={!episode || episodeList.length === 1}
        onClick={toggleShuffle}
        type="button"
      >
        <img src="/shuffle.svg" alt="Embaralhar" />
      </button>
      <button disabled={!episode || !hasPrevious} onClick={playPrevious} type="button">
        <img src="/play-previous.svg" alt="Tocar anterior" />
      </button>
      <button className={styles.playButton} disabled={!episode} onClick={togglePlay} type="button">
        {isPlaying ? <img src="/pause.svg" alt="Pausar" /> : <img src="/play.svg" alt="Tocar" />}
      </button>
      <button disabled={!episode || !hasNext} onClick={playNext} type="button">
        <img src="/play-next.svg" alt="Tocar próximo" />
      </button>
      <button
        disabled={!episode}
        className={isLooping ? styles.isActive : ``}
        onClick={toggleLoop}
        type="button"
      >
        <img src="/repeat.svg" alt="Repetir" />
      </button>
    </div>
  );
};
