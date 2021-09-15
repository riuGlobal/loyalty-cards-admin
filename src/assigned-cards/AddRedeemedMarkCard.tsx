import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonText, IonToolbar } from '@ionic/react';
import { addOutline, checkboxOutline } from 'ionicons/icons';

export const AddRedeemedMarkCard: React.FC = () => {
  const date = new Date();
  return (
    <IonCard>
      <IonCardContent>
      <IonCard button color="tertiary">
      <IonCardContent>{`date: ${date}`}</IonCardContent>
    </IonCard>
      </IonCardContent>
    </IonCard>
    
  );
};
