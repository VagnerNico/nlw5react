import Image from 'next/image';
import { FC } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

export const PlayerContent: FC = () => {
  const { currentEpisodeIndex, episodeList } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];

  return episode ? (
    <div className={styles.currentEpisode}>
      <Image
        alt={episode.title}
        height={592}
        objectFit="cover"
        src={episode.thumbnail}
        width={592}
      ></Image>
      <strong>{episode.title}</strong>
      <span>{episode.members}</span>
    </div>
  ) : (
    <div className={styles.emptyPlayer}>
      <strong>Selecione um podcast para ouvir</strong>
    </div>
  );
};
