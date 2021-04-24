import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import { PlayerContent } from '../PlayerContent';
import { PlayerFooter } from '../PlayerFooter';
import SwipeableBottomSheet from '../SwipeableBottomSheet';
import styles from './styles.module.scss';

export function Player(): ReactElement {
  const { currentEpisodeIndex, episodeList } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];
  const [hideTitle, setHideTitle] = useState(false);
  const [shouldRenderAudio, setShouldRenderAudio] = useState<{ desktop: boolean; mobile: boolean }>(
    { desktop: false, mobile: false }
  );

  useEffect(() => {
    if (window) {
      setShouldRenderAudio({
        desktop: window.innerWidth > 960,
        mobile: window.innerWidth <= 960,
      });
    }
  }, []);

  return (
    <>
      <SwipeableBottomSheet
        bodyStyle={{ borderRadius: `1rem 1rem 0 0` }}
        onChange={setHideTitle}
        overflowHeight={shouldRenderAudio.mobile ? 116 : 0}
      >
        <div className={styles.mobilePlayerContainer}>
          {episode ? (
            <strong
              className={
                hideTitle ? `${styles.mobileTitle} ${styles.mobileTitleHidden}` : styles.mobileTitle
              }
            >
              {episode.title}
            </strong>
          ) : (
            <div>
              <strong
                className={
                  hideTitle
                    ? `${styles.emptyPlayer} ${styles.mobileTitle} ${styles.mobileTitleHidden}`
                    : `${styles.emptyPlayer} ${styles.mobileTitle}`
                }
              >
                Selecione um podcast para ouvir
              </strong>
            </div>
          )}
          <PlayerFooter renderAudio={shouldRenderAudio.mobile} />
          <PlayerContent />
        </div>
      </SwipeableBottomSheet>
      <div className={styles.playerContainer}>
        <Head>
          <title>Home | Podcastr</title>
        </Head>
        <header>
          <img src="/playing.svg" alt="Tocando agora" />
          <strong>Tocando agora</strong>
        </header>
        <PlayerContent />
        <footer>
          <PlayerFooter renderAudio={shouldRenderAudio.desktop} />
        </footer>
      </div>
    </>
  );
}
