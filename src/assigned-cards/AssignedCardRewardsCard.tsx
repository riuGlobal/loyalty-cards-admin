import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
} from '@ionic/react';

import type { Reward } from '../api/loyalty-cards/rewards/Reward';

interface AssignedCardRewardsCardProps {
  title?: string;
  rewards?: Reward[];
}

export const AssignedCardRewardsCard: React.FC<AssignedCardRewardsCardProps> = ({ title, rewards = [] }) => (
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{`${title}`}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonList>
        {rewards.map((reward) => (
          <IonItem key={`reward-${reward.id}`}>
            <IonLabel> {`(id: ${reward.id}) - ${reward.amount}  ${reward.name}`} </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonCardContent>
  </IonCard>
);
