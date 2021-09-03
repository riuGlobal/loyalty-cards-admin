import { IonMenu, IonContent, IonList, IonMenuButton, IonMenuToggle, IonItem } from "@ionic/react"
import React from "react"

export const Menu: React.FC = () => {
  return (
    <IonMenu type='overlay' contentId='main'>
       <IonContent>
          <IonList>
            <IonMenuButton autoHide={false} disabled />
            <IonMenuToggle autoHide={false}>
              <IonItem disabled button routerLink='/rewards' >Rewards</IonItem>
              <IonItem disabled button routerLink='/blueprints' >Blueprints</IonItem>
              <IonItem disabled button routerLink='/stacks' >Stacks</IonItem>
              <IonItem disabled button routerLink='/assigned-cards' >Assigned Cards</IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
    </IonMenu>
  )
}
