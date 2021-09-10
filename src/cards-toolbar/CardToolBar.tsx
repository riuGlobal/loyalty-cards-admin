import { IonButton, IonButtons, IonIcon, IonToolbar } from "@ionic/react";
import { addOutline, closeOutline } from "ionicons/icons";
import React from "react";

interface CardToolBarProps {
  deleteCallback?: () => unknown;
}

export const CardToolBar:React.FC<CardToolBarProps> = ({deleteCallback}) => (
  <IonToolbar>
    <IonButtons slot='end'>
      {/* <IonButton>
        <IonIcon icon={addOutline}/>
      </IonButton> */}
      <IonButton onClick={deleteCallback}>
        <IonIcon icon={closeOutline}/>
      </IonButton>
      </IonButtons>
  </IonToolbar>
)
