import { createContext } from 'react';
import { DirectoryGraph } from '../utils/appTypes';

interface AppState {
  requestGraph: (
    publicKeyB64: string,
    resultHandler: (graph: DirectoryGraph) => void,
  ) => (() => void) | undefined;
  rankingFilter: number;
  setRankingFilter: (rankingFilter: number) => void;
  selectedDirectory: string;
  setSelectedDirectory: (node: string) => void;
  colorScheme: 'light' | 'dark';
}

export const AppContext = createContext<AppState>({
  requestGraph:
    (publicKeyB64: string, resultHandler: (graph: DirectoryGraph) => void) =>
    () => {},
  rankingFilter: 0,
  setRankingFilter: () => {},
  selectedDirectory: '',
  setSelectedDirectory: () => {},
  colorScheme: 'light',
});
