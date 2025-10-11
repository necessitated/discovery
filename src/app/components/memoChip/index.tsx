import { IonButton, IonIcon, IonText, IonTextarea } from '@ionic/react';
import { callOutline, linkOutline, mailOutline } from 'ionicons/icons';

/**
 * Supported link types
 * tel:1234567890
 * mailto: me@example.com
 * https://example.com
 */

interface MemoChipProps {
  value: string;
  label?: string;
}

const MemoChip: React.FC<MemoChipProps> = ({ value, label }) => {
  return isMemoLink(value) ? (
    <IonButton
      rel="noreferrer"
      target={value.startsWith('tel:') ? '' : '_blank'}
      href={isMemoLink(value) ? value : undefined}
      size="small"
    >
      {label && label}
      <IonIcon slot="end" icon={memoLinkIcon(value)}></IonIcon>
    </IonButton>
  ) : !!value ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <IonText color="secondary">
        <h6>{label}</h6>
      </IonText>
      <IonTextarea
        style={{ minHeight: '30px' }}
        readonly
        fill="outline"
        value={`"${value}"`} // Display value in quotes
      />
    </div>
  ) : null;
};

export default MemoChip;

const isMemoLink = (value: string) =>
  value.startsWith('tel:') ||
  value.startsWith('mailto:') ||
  value.startsWith('https:');

const memoLinkIcon = (value: string) => {
  if (value.startsWith('tel:')) {
    return callOutline;
  }

  if (value.startsWith('mailto:')) {
    return mailOutline;
  }

  if (value.startsWith('https:')) {
    return linkOutline;
  }
};
