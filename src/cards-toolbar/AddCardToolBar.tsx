import { IonButton, IonButtons, IonIcon, IonToolbar } from "@ionic/react"
import { addOutline, closeOutline } from 'ionicons/icons'

export const AddCardToolBar:React.FC = () => (
  <IonToolbar>
    <IonButtons slot='end'>
      <IonButton>
        <IonIcon icon={addOutline}/>
      </IonButton>
      <IonButton>
        <IonIcon icon={closeOutline}/>
      </IonButton>
      </IonButtons>
  </IonToolbar>
)