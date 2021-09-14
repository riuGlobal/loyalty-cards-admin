import { IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { addOutline, closeOutline } from 'ionicons/icons';
import React from 'react';

interface AddToolbarProps {
  add?: () => unknown;
  reset?: () => unknown;
}

export const AddToolbar: React.FC<AddToolbarProps> 
  = ({ 
    reset = () => null,
    add = () => null
  }) => (
  <IonToolbar>
    <IonButtons slot="end">
      <IonButton onClick={add}>
        <IonIcon icon={addOutline} />
      </IonButton>
      <IonButton onClick={reset}>
        <IonIcon icon={closeOutline} />
      </IonButton>
    </IonButtons>
  </IonToolbar>
);
