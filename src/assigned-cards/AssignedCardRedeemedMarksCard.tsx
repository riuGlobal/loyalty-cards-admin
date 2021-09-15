import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { AssignedCardRedeemedMark } from '../api/loyalty-cards/assigned-cards/AssignedCardRedeemedMark';
import { AddRedeemedMarkCard } from './AddRedeemedMarkCard';

interface AssignedCardRedeemedMarksCardProps {
  title?: string;
  redeemedMarks?: AssignedCardRedeemedMark[];
}

export const AssignedCardRedeemedMarksCard: React.FC<AssignedCardRedeemedMarksCardProps> = ({
  title,
  redeemedMarks = [],
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{`${title}`}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {redeemedMarks.map((redeemedMark) => (
            <IonItem>
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonButton slot='end'>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonToolbar>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>{`Id: ${redeemedMark.id} - date: ${redeemedMark.date}`}</IonText>
                </IonCardContent>
              </IonCard>
            </IonItem>
          ))}
          <IonItem>
            <AddRedeemedMarkCard />
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
