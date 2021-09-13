import { IonTitle, IonToolbar } from "@ionic/react";

interface AppToolbarProps {
  pageTitle?: string
}

export const AppToolbar: React.FC<AppToolbarProps> = ({pageTitle}) => {
  return (
    <IonToolbar>
      <IonTitle slot="secondary">{pageTitle}</IonTitle>
    </IonToolbar>
  )
}
