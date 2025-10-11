import { IonChip, IonIcon, IonText } from '@ionic/react';
import { copyOutline } from 'ionicons/icons';
import { useClipboard } from '../../usefuls/useClipboard';
import { shortenB64 } from '../../utils/compat';
import MemoChip from '../memoChip';
import { useDirectoryGraph } from '../../usefuls/useDirectoryGraph';

export const KeyAbbrev = ({ value }: { value: string }) => {
  const abbrevKey = shortenB64(value);

  return <code>{abbrevKey}</code>;
};

const PathInfo = ({ value }: { value: string }) => {
  const { copyToClipboard } = useClipboard();
  const { pkNode } = useDirectoryGraph(value);

  const pubKeyRanking = pkNode?.ranking;
  const memo = pkNode?.memo;
  const label = pkNode?.label;

  return (
    <>
      <span>
        <IonChip onClick={() => copyToClipboard(value)}>
          <KeyAbbrev value={value} />
          <IonIcon icon={copyOutline} color="primary"></IonIcon>
        </IonChip>
      </span>
      {memo && <MemoChip value={memo} label={label} />}
      {pubKeyRanking !== undefined && (
        <IonText color="primary">
          <p>
            {pubKeyRanking !== undefined && (
              <>
                <strong>Attention: </strong>
                <i>{Number((pubKeyRanking / 1) * 100).toFixed(2)}%</i>
              </>
            )}
          </p>
        </IonText>
      )}
    </>
  );
};

export default PathInfo;
