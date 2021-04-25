import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { ReactElement } from 'react';
import { APIEpisode, Episode as SingleEpisode } from '../';
import { usePlayer } from '../../contexts/PlayerContext';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import style from './episode.module.scss';

interface EpisodeProps {
  episode: SingleEpisode;
}

export default function Episode({ episode }: EpisodeProps): ReactElement {
  const { play } = usePlayer();

  return (
    <div className={style.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <div className={style.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img alt="Voltar" src="/arrow-left.svg" />
          </button>
        </Link>
        <Image height={160} objectFit="cover" src={episode.thumbnail} width={700} />
        <button onClick={() => play(episode)} type="button">
          <img alt="Tocar episódio" src="/play.svg" />
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.file.durationAsString}</span>
      </header>
      <div
        className={style.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<APIEpisode[]>(`episodes`, {
    params: {
      _limit: 2,
      _order: `desc`,
      _sort: `published_at`,
    },
  });

  const paths = data.map((episode) => ({
    params: {
      slug: episode.id,
    },
  }));

  return {
    fallback: `blocking`,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const response = await api.get<APIEpisode>(`/episodes/${slug}`);
  const { published_at, ...rest } = response.data;

  const episode: SingleEpisode = {
    ...rest,
    file: {
      ...rest.file,
      durationAsString: convertDurationToTimeString(rest.file.duration),
    },
    publishedAt: format(parseISO(published_at), `d MMM yy`, { locale: ptBR }),
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24,
  };
};
