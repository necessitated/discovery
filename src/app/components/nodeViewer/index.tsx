import { useIonModal } from '@ionic/react';
import PathInfo from '../pathInfo';
import { useDirectoryGraph } from '../../usefuls/useDirectoryGraph';
import { PathList } from '../path';

export const useNodeViewer = (key: string) => {
  const [present, dismiss] = useIonModal(NodeViewer, {
    onDismiss: () => dismiss(),
    value: key,
  });

  return [present] as const;
};

const NodeViewer = ({ value }: { onDismiss: () => void; value: string }) => {
  const { paths } = useDirectoryGraph(value);

  return (
    <>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PathInfo value={value} />
        {!!paths && !!paths.length && (
          <div
            style={{
              alignSelf: 'stretch',
            }}
          >
            <PathList paths={paths} />
          </div>
        )}
      </div>
    </>
  );
};
