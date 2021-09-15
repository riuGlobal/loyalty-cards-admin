import { IonCard, IonCardContent, IonCardHeader, IonItem, IonLabel, IonList } from '@ionic/react';
import { AssignedCardPunch } from '../api/loyalty-cards/assigned-cards/AssignedCardPunch';
import { AssignedCardRedeemedMark } from '../api/loyalty-cards/assigned-cards/AssignedCardRedeemedMark';
import { Reward } from '../api/loyalty-cards/rewards/Reward';

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
}

export const AssignedCard: React.FC<AssignedCardProps> = ({ 
  id ,
  cardStackId,
  userId,
  title,
  numberOfPunchBoxes = 0,
  rewards,
  punches,
  redeemedMarks
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <CardToolBar />
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
            <AssignedCardRedeemedMarksCard redeemedMarks={redeemedMarks} title='Redeemed Mark:'/>
          </IonItem>
          <IonItem>
            <AssignedCardPunchesCard numberOfPunchBoxes={numberOfPunchBoxes} title='Punches:' punches={punches}/>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
