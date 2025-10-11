import { PageShell } from './components/pageShell';
import { useContext, useState } from 'react';
import { AppContext } from './utils/appContext';
import DirTree from './components/dirTree';
import { useDirectoryGraph } from './usefuls/useDirectoryGraph';

const Explorer = () => {
  const { colorScheme, rankingFilter } = useContext(AppContext);

  const [peekGraphKey, setPeekGraphKey] = useState<string | null | undefined>();

  const whichKey =
    peekGraphKey || '0000000000000000000000000000000000000000000=';

  //Todo: handle inv_block updater in useGrapPath()
  const { graph } = useDirectoryGraph(whichKey);

  return (
    <PageShell
      renderBody={() => (
        <>
          {!!whichKey && (
            <>
              {!!graph && (
                <DirTree
                  forKey={whichKey}
                  nodes={graph.nodes ?? []}
                  links={graph.links ?? []}
                  setForKey={setPeekGraphKey}
                  rankingFilter={rankingFilter}
                  colorScheme={colorScheme}
                />
              )}
            </>
          )}
        </>
      )}
    />
  );
};

export default Explorer;
