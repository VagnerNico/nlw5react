import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { usePlayer } from '../contexts/PlayerContext';
import { useTheme } from '../contexts/ThemeContext';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import styles from './home.module.scss';

export interface APIEpisode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: File;
}

export interface Episode extends Omit<APIEpisode, `published_at`> {
  publishedAt: string;
  file: File & { durationAsString: string };
}

export interface File {
  url: string;
  type: string;
  duration: number;
}

interface HomeProps {
  allEpisodes: Array<Episode>;
  latestEpisodes: Array<Episode>;
}

export default function Home({ allEpisodes, latestEpisodes }: HomeProps): ReactElement {
  const { playList } = usePlayer();
  const { isDark } = useTheme();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode, index) => (
            <li key={episode.id}>
              <Image
                alt={episode.title}
                height={192}
                objectFit="cover"
                src={episode.thumbnail}
                width={192}
              />
              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.file.durationAsString}</span>
              </div>
              <button
                className={isDark ? styles.darkButton : ``}
                onClick={() => playList(episodeList, index)}
                type="button"
              >
                <img src={isDark ? `/play.svg` : `/play-green.svg`} alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${styles.latestEpisodes} ${styles.allEpisodesMobile}`}>
        <h2>Todos episódios</h2>
        <ul>
          {allEpisodes.map((episode, index) => (
            <li key={episode.id}>
              <Image
                alt={episode.title}
                height={192}
                objectFit="cover"
                src={episode.thumbnail}
                width={192}
              />
              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.file.durationAsString}</span>
              </div>
              <button
                className={isDark ? styles.darkButton : ``}
                onClick={() => playList(episodeList, index)}
                type="button"
              >
                <img src={isDark ? `/play.svg` : `/play-green.svg`} alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    alt={episode.title}
                    height={120}
                    objectFit="cover"
                    src={episode.thumbnail}
                    width={120}
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 100 }}>{episode.publishedAt}</td>
                <td>{episode.file.durationAsString}</td>
                <td>
                  <button
                    className={isDark ? styles.darkButton : ``}
                    onClick={() => playList(episodeList, index + latestEpisodes.length)}
                    type="button"
                  >
                    <img alt="Tocar episódio" src={isDark ? `/play.svg` : `/play-green.svg`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await api.get<APIEpisode[]>(`episodes`, {
    params: { _limit: 12, _sort: `published_at`, _order: `desc` },
  });
  const episodes: Episode[] = response.data.map(
    (episode): Episode => {
      const { published_at, ...rest } = episode;
      return {
        ...rest,
        file: {
          ...rest.file,
          durationAsString: convertDurationToTimeString(rest.file.duration),
        },
        publishedAt: format(parseISO(published_at), `d MMM yy`, { locale: ptBR }),
      };
    }
  );

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes,
      latestEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
