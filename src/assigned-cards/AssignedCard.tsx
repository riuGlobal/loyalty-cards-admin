import { IonCard, IonCardContent, IonCardHeader, IonItem, IonLabel, IonList } from '@ionic/react';

import type { AddRedeemedMarkToAssignedCardDTO } from '../api/loyalty-cards/assigned-cards/AddRedeemedMarkToAssignedCardDTO';
import type { AssignedCardPunch } from '../api/loyalty-cards/assigned-cards/AssignedCardPunch';
import type { AssignedCardRedeemedMark } from '../api/loyalty-cards/assigned-cards/AssignedCardRedeemedMark';
import type { Reward } from '../api/loyalty-cards/rewards/Reward';
import { CardToolBar } from '../cards-toolbar/CardToolBar';

import { AssignedCardPunchesCard } from './AssignedCardPunchesCard';
import { AssignedCardRedeemedMarksCard } from './AssignedCardRedeemedMarksCard';
import { AssignedCardRewardsCard } from './AssignedCardRewardsCard';

interface AssignedCardProps {
  id?: number;
  cardStackId?: number;
  userId?: string;
  title?: string;
  numberOfPunchBoxes?: number;
  rewards?: Reward[];
  punches?: AssignedCardPunch[];
  redeemedMarks?: AssignedCardRedeemedMark[];
  removeAssignedCard?: (id: number) => unknown
  addRedeemedMarkToAssignedCard?: (addRedeemedMarkToAssignedCardDTO: AddRedeemedMarkToAssignedCardDTO) => unknown
  removeRedeemedMarkFromAssignedCard?: (markId: number) => unknown
}

export const AssignedCard: React.FC<AssignedCardProps> = ({ 
  id ,
  cardStackId,
  userId,
  title,
  numberOfPunchBoxes = 0,
  rewards,
  punches,
  redeemedMarks,
  removeAssignedCard = () => null,
  addRedeemedMarkToAssignedCard = () => null,
  removeRedeemedMarkFromAssignedCard = () => null
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <CardToolBar deleteCallback={id? () => removeAssignedCard(id): undefined}/>
      </IonCardHeader>
      <IonCardContent>
        <IonList lines="none">
          <IonItem>
            <IonLabel>{`id: ${id}`}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>{`stack: ${cardStackId}`}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>{`user id: ${userId}`}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>{`title: ${title}`}</IonLabel>
          </IonItem>
          <IonItem>
            <AssignedCardRewardsCard title='Rewards:' rewards={rewards}/>
          </IonItem>
          <IonItem>
            <AssignedCardRedeemedMarksCard 
              redeemedMarks={redeemedMarks} 
              title='Redeemed Mark:'
              assignedCardId={id}
              addRedeemedMarkToAssignedCard={addRedeemedMarkToAssignedCard}
              removeRedeemedMarkFromAssignedCard={removeRedeemedMarkFromAssignedCard}
            />
          </IonItem>
          <IonItem>
            <AssignedCardPunchesCard numberOfPunchBoxes={numberOfPunchBoxes} title='Punches:' punches={punches}/>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
