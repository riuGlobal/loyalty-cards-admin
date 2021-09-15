import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { checkboxOutline, squareOutline } from 'ionicons/icons';
import React from 'react';

export const UnpunchedPunchBox: React.FC = () => (
  <IonCard>
    <IonCardContent>
      <IonIcon size="large" icon={squareOutline} />
    </IonCardContent>
  </IonCard>
);
