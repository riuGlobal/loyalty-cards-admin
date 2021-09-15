import { IonMenu, IonContent, IonList, IonMenuButton, IonMenuToggle, IonItem } from "@ionic/react"
import React from "react"

export const Menu: React.FC = () => {
  return (
    <IonMenu type='overlay' contentId='main'>
       <IonContent>
          <IonList>
            <IonMenuButton autoHide={false} disabled />
            <IonMenuToggle autoHide={false}>
              <IonItem button routerLink='/rewards' >Rewards</IonItem>
              <IonItem button routerLink='/blueprints' >Blueprints</IonItem>
              <IonItem button routerLink='/stacks' >Stacks</IonItem>
              <IonItem button routerLink='/assigned-cards' >Assigned Cards</IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
    </IonMenu>
  )
}
