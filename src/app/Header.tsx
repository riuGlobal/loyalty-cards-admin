import { IonTitle, IonToolbar } from "@ionic/react";

interface HeaderProps {
  pageTitle?: string
}

export const Header: React.FC<HeaderProps> = ({pageTitle}) => {
  return (
    <IonToolbar>
      <IonTitle slot="secondary">{pageTitle}</IonTitle>
    </IonToolbar>
  )
}
