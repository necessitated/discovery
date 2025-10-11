import { IonApp, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { useState, useEffect, useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { AppContext } from './utils/appContext';
import { DirectoryGraph } from './utils/appTypes';
import { parseGraphDOT, socketEventListener } from './utils/compat';
import { DEFAULT_CRUZBIT_NODE, DEFAULT_DIRECTORY_ID } from './utils/constants';
import Explorer from './explorer';

setupIonicReact({ mode: 'md' });

const App: React.FC = () => {
  const [selectedDirectory, setSelectedDirectory] =
    useState(DEFAULT_DIRECTORY_ID);

  const [rankingFilter, setRankingFilter] = useState(0);

  const { sendJsonMessage, readyState } = useWebSocket(
    `wss://${DEFAULT_CRUZBIT_NODE}`,
    {
      protocols: ['cruzbit.1'],
      onOpen: () => console.log('opened', DEFAULT_CRUZBIT_NODE),
      onError: () => console.log('errored', DEFAULT_CRUZBIT_NODE),
      shouldReconnect: () => true,
      share: true,
      onMessage: (event) => {
        const { type, body } = JSON.parse(event.data);

        switch (type) {
          case 'graph':
            document.dispatchEvent(
              new CustomEvent<DirectoryGraph>('graph', {
                detail: {
                  public_key: body.public_key,
                  ...parseGraphDOT(body.graph, body.public_key, rankingFilter),
                },
              }),
            );
            break;
        }
      },
    },
  );

  const requestGraph = useCallback(
    (
      publicKeyB64: string = '',
      resultHandler: (graph: DirectoryGraph) => void,
    ) => {
      if (readyState !== ReadyState.OPEN) return;
      if (!publicKeyB64) throw new Error('missing publicKey');

      sendJsonMessage({
        type: 'get_graph',
        body: {
          public_key: publicKeyB64,
          directory_id: selectedDirectory,
        },
      });

      return socketEventListener<DirectoryGraph>('graph', (data) => {
        if (data.public_key === publicKeyB64) {
          resultHandler(data);
        }
      });
    },
    [readyState, selectedDirectory, sendJsonMessage],
  );

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    prefersDark.matches ? 'dark' : 'light',
  );

  useEffect(() => {
    const eventHandler = (mediaQuery: MediaQueryListEvent) =>
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    prefersDark.addEventListener('change', eventHandler);

    return () => {
      prefersDark.removeEventListener('change', eventHandler);
    };
  }, [prefersDark, setColorScheme]);

  const appState = {
    requestGraph,
    rankingFilter,
    setRankingFilter,
    selectedDirectory,
    setSelectedDirectory,
    colorScheme,
  };

  return (
    <AppContext.Provider value={appState}>
      <IonApp>
        <Explorer />
        <div id="fg-portal"></div>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
