import { IonCard, IonCardContent, IonIcon } from "@ionic/react";
import { checkboxOutline } from "ionicons/icons";
import React from "react";

export const PunchedPunchBox: React.FC = () => (
  <IonCard>
    <IonCardContent>
      <IonIcon size="large" icon={checkboxOutline} />
    </IonCardContent>
  </IonCard>
);
