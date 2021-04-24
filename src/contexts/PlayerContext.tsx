import { createContext, FC, useContext, useState } from 'react';
import { Episode } from '../pages/index';

interface PlayerContextData {
  clearPlayerState: () => void;
  currentEpisodeIndex: number;
  episodeList: Episode[];
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  isPlaying: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playList: (episodes: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
  toggleLoop: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
}

export const PlayerContext = createContext<PlayerContextData>({
  clearPlayerState() {
    return;
  },
  currentEpisodeIndex: 0,
  episodeList: [],
  hasNext: false,
  hasPrevious: false,
  isLooping: false,
  isPlaying: false,
  isShuffling: false,
  play(_episode) {
    return;
  },
  playList(_episode, _index) {
    return;
  },
  playNext() {
    return;
  },
  playPrevious() {
    return;
  },
  setPlayingState(_state: boolean) {
    return;
  },
  toggleLoop() {
    return;
  },
  togglePlay() {
    return;
  },
  toggleShuffle() {
    return;
  },
});

const PlayerContextProvider: FC = ({ children }) => {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  function clearPlayerState(): void {
    setCurrentEpisodeIndex(0);
    setEpisodeList([]);
  }

  function play(episode: Episode): void {
    setCurrentEpisodeIndex(0);
    setEpisodeList([episode]);
    setIsPlaying(true);
  }

  function playList(episodes: Episode[], index: number): void {
    setCurrentEpisodeIndex(index);
    setEpisodeList(episodes);
    setIsPlaying(true);
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext(): void {
    const nextEpisodeIndex = currentEpisodeIndex + 1;
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      setIsPlaying(true);
    } else if (hasNext) {
      setCurrentEpisodeIndex(nextEpisodeIndex);
      setIsPlaying(true);
    }
  }

  const hasPrevious = currentEpisodeIndex - 1 >= 0;

  function playPrevious(): void {
    const previousEpisodeIndex = currentEpisodeIndex - 1;
    if (hasPrevious) {
      setCurrentEpisodeIndex(previousEpisodeIndex);
      setIsPlaying(true);
    }
  }

  function setPlayingState(state: boolean): void {
    setIsPlaying(state);
  }

  function toggleLoop(): void {
    setIsLooping(!isLooping);
  }

  function togglePlay(): void {
    setIsPlaying(!isPlaying);
  }

  function toggleShuffle(): void {
    setIsShuffling(!isShuffling);
  }

  return (
    <PlayerContext.Provider
      value={{
        clearPlayerState,
        currentEpisodeIndex,
        episodeList,
        hasNext,
        hasPrevious,
        isLooping,
        isPlaying,
        isShuffling,
        play,
        playList,
        playNext,
        playPrevious,
        setPlayingState,
        toggleLoop,
        togglePlay,
        toggleShuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = (): PlayerContextData => {
  return useContext(PlayerContext);
};

export { PlayerContextProvider, usePlayer };
