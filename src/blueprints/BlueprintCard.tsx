import { IonCard, IonCardContent, IonCardHeader, IonItem, IonLabel, IonList, IonSelect, IonTitle } from '@ionic/react';

import type { Reward } from '../api/loyalty-cards/rewards/Reward';
import { CardToolBar } from '../cards-toolbar/CardToolBar';

import { BlueprintRewardsCard } from './BlueprintRewardsCard';

interface BlueprintCardProps {
  id: number;
  title: string;
  numberOfPunchBoxes: number;
  blueprintRewards: Reward[];
  rewards: Reward[];
  deleteBlueprint?: (id: number) => unknown;
  removeRewardFromBlueprint?: (rewardId: number, blueprintId: number) => unknown;
  addRewardToBlueprint?: (rewardId: number, blueprintId: number) => unknown;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({
  id,
  title,
  numberOfPunchBoxes,
  blueprintRewards,
  rewards,
  deleteBlueprint = () => null,
  removeRewardFromBlueprint = () => null,
  addRewardToBlueprint = () => null,
}) => (
  <IonCard>
    <IonCardHeader>
      <CardToolBar deleteCallback={() => deleteBlueprint(id)} />
    </IonCardHeader>
    <IonCardContent>
      <IonList lines="none">
        <IonItem>
          <IonLabel> {`id: ${id}`} </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel> {`title: ${title}`} </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel> {`numberOfPunchBoxes: ${numberOfPunchBoxes}`} </IonLabel>
        </IonItem>
        <IonItem>
          <BlueprintRewardsCard {...{ blueprintId: id, blueprintRewards, rewards, removeRewardFromBlueprint, addRewardToBlueprint }} />
        </IonItem>
      </IonList>
    </IonCardContent>
  </IonCard>
);
