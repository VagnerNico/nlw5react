import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FC } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from './styles.module.scss';

interface PlayerSliderProps {
  handleSeek: (amount: number) => void;
  progress: number;
}

export const PlayerSlider: FC<PlayerSliderProps> = ({ handleSeek, progress }) => {
  const { currentEpisodeIndex, episodeList } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={!episode ? `${styles.progress} ${styles.noEpisode}` : styles.progress}>
      <span>{convertDurationToTimeString(progress)}</span>
      <div className={styles.slider}>
        {episode ? (
          <Slider
            handleStyle={{ backgroundColor: `#04d361`, borderWidth: 4 }}
            max={episode.file.duration}
            onChange={handleSeek}
            railStyle={{ backgroundColor: `#9f75ff` }}
            trackStyle={{ backgroundColor: `#04d361` }}
            value={progress}
          />
        ) : (
          <div className={styles.emptySlider} />
        )}
      </div>
      <span>{convertDurationToTimeString(episode?.file.duration ?? 0)}</span>
    </div>
  );
};
