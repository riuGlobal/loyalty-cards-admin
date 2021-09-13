import { IonButton, IonButtons, IonIcon, IonToolbar } from '@ionic/react';
import { addOutline, closeOutline } from 'ionicons/icons';

interface AddCardToolBardProps {
  reset?: () => unknown;
}

export const AddCardToolBar: React.FC<AddCardToolBardProps> = ({ reset = () => null }) => (
  <IonToolbar>
    <IonButtons slot="end">
      <IonButton type="submit">
        <IonIcon icon={addOutline} />
      </IonButton>
      <IonButton onClick={reset}>
        <IonIcon icon={closeOutline} />
      </IonButton>
    </IonButtons>
  </IonToolbar>
);
