import { IonButton, IonButtons, IonIcon, IonToolbar } from "@ionic/react"
import { addOutline, closeOutline } from 'ionicons/icons'

interface AddCardToolBardProps {
  add?: () => Promise<void> | void
  reset?: () => Promise <void> | void 
}

export const AddCardToolBar:React.FC<AddCardToolBardProps> = ({ add, reset}) => (
  <IonToolbar>
    <IonButtons slot='end'>
      <IonButton type='submit' onClick={add}>
        <IonIcon icon={addOutline}/>
      </IonButton>
      <IonButton onClick={reset}>
        <IonIcon icon={closeOutline}/>
      </IonButton>
      </IonButtons>
  </IonToolbar>
)