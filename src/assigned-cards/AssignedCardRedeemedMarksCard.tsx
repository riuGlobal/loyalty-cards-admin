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

import type { AddRedeemedMarkToAssignedCardDTO } from '../api/loyalty-cards/assigned-cards/AddRedeemedMarkToAssignedCardDTO';
import type { AssignedCardRedeemedMark } from '../api/loyalty-cards/assigned-cards/AssignedCardRedeemedMark';

import { AddRedeemedMarkCard } from './AddRedeemedMarkCard';

interface AssignedCardRedeemedMarksCardProps {
  title?: string;
  redeemedMarks?: AssignedCardRedeemedMark[];
  assignedCardId?: number;
  addRedeemedMarkToAssignedCard?: (addRedeemedMarkToAssignedCardDTO: AddRedeemedMarkToAssignedCardDTO) => unknown;
  removeRedeemedMarkFromAssignedCard?: (markId: number) => unknown
}

export const AssignedCardRedeemedMarksCard: React.FC<AssignedCardRedeemedMarksCardProps> = ({
  title,
  redeemedMarks = [],
  assignedCardId ,
  addRedeemedMarkToAssignedCard = () => null,
  removeRedeemedMarkFromAssignedCard = () => null

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
                    <IonButton slot="end" onClick={() => removeRedeemedMarkFromAssignedCard(redeemedMark.id)}>
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
            <AddRedeemedMarkCard assignedCardId={assignedCardId} addRedeemedMarkToAssignedCard={addRedeemedMarkToAssignedCard}/>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
