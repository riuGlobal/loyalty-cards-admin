import { IonCard, IonCardContent, IonCardHeader, IonInput, IonItem } from "@ionic/react";

import { AddCardToolBar } from "../cards-toolbar/AddCardToolBar";

export const AddRewardCard:React.FC = () => (
  <IonCard>
    <IonCardHeader>
      <AddCardToolBar/>
    </IonCardHeader>
    <IonCardContent>
      <IonInput placeholder='name' />
      <IonInput placeholder='url' />
      <IonInput placeholder='amount' />
    </IonCardContent>
  </IonCard>
)
