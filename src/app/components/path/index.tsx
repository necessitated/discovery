import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonIcon,
  IonChip,
} from '@ionic/react';
import timeago from 'epoch-timeago';
import { arrowForward } from 'ionicons/icons';
import { KeyAbbrev } from '../pathInfo';

interface Path {
  from: string;
  to: string;
  value: number;
  time: number;
  height: number;
}

export const PathItem: React.FC<Path> = (path) => {
  const { time } = path;

  const timeMS = time * 1000;

  return (
    <IonItem lines="none">
      <IonLabel className="ion-text-wrap">
        <IonText color="tertiary">
          <sub>
            <time dateTime={new Date(timeMS).toISOString()}>
              <p>{timeago(timeMS)}</p>
            </time>
          </sub>
        </IonText>
        <div>
          <IonChip outline={true}>
            <KeyAbbrev
              value={
                path.from ?? '0000000000000000000000000000000000000000000='
              }
            />
          </IonChip>

          <IonIcon icon={arrowForward} />
          <IonChip outline={true}>
            <KeyAbbrev value={path.to} />
          </IonChip>
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default PathItem;

interface PathListProps {
  heading?: string;
  paths: Path[];
}

export const PathList = ({ paths, heading }: PathListProps) => {
  return (
    <IonList>
      {heading && (
        <IonListHeader>
          <IonLabel>{heading}</IonLabel>
        </IonListHeader>
      )}
      {!paths.length && (
        <IonItem>
          <IonLabel>No Activity</IonLabel>
        </IonItem>
      )}
      {paths.map((pth, index) => (
        <PathItem
          key={index}
          from={pth.from}
          to={pth.to}
          time={pth.time}
          height={pth.height}
          value={pth.value}
        />
      ))}
    </IonList>
  );
};
