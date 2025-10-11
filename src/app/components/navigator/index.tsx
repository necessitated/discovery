import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonText,
  IonTextarea,
  IonToolbar,
} from '@ionic/react';
import { sunnyOutline, ellipsisHorizontalOutline } from 'ionicons/icons';
import { useInputValidationProps } from '../../usefuls/useInputValidation';
import { DEFAULT_DIRECTORY_ID } from '../../utils/constants';

const Navigator = ({
  currentDirectory,
  onDismiss,
}: {
  currentDirectory: string;
  onDismiss: (data?: string | null | undefined, role?: string) => void;
}) => {
  const {
    value: directory,
    isValid: isDirectoryValid,
    isTouched: isDirectoryTouched,
    onBlur: onBlurDirectory,
    onInputChange: setDirectory,
  } = useInputValidationProps((node: string) => !!node);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="medium"
              disabled={!currentDirectory && !directory}
              onClick={() => onDismiss(null, 'cancel')}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              disabled={!directory}
              onClick={() => onDismiss(directory, 'confirm')}
              strong={true}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IonIcon
                  className="ion-no-padding"
                  size="large"
                  icon={sunnyOutline}
                  color="primary"
                />
                <h1
                  style={{
                    margin: '0 0 0 5px',
                  }}
                >
                  Discovery
                </h1>
              </div>
              <IonText color="secondary">
                <h6>Discovery on Cruzbit</h6>
              </IonText>
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <section className="ion-padding">
          <IonText color="primary">
            <p>
              Enter a{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/necessitated/discovery"
              >
                directory
              </a>{' '}
              to continue.
            </p>
          </IonText>
          <IonTextarea
            className={`${isDirectoryValid && 'ion-valid'} ${
              isDirectoryValid === false && 'ion-invalid'
            } ${isDirectoryTouched && 'ion-touched'}`}
            label="directory ID"
            labelPlacement="stacked"
            placeholder="..."
            value={directory}
            onIonBlur={onBlurDirectory}
            enterkeyhint="go"
            onIonInput={(event) => setDirectory(event.target.value! ?? '')}
            rows={5}
          />
          <IonText color="secondary">
            <p>
              Favorite <i>"Directories"</i>:
            </p>
          </IonText>
          <IonChip onClick={() => setDirectory(DEFAULT_DIRECTORY_ID)}>
            <IonIcon icon={ellipsisHorizontalOutline} color="primary"></IonIcon>
            <IonLabel>Cruzbit</IonLabel>
          </IonChip>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Navigator;
