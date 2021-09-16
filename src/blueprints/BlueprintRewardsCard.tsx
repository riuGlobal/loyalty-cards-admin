import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
import React, { useState } from 'react';

import type { Reward } from '../api/loyalty-cards/rewards/Reward';

interface BlueprintRewardsCardProps {
  blueprintId?: number;
  blueprintRewards?: Reward[];
  rewards?: Reward[];
  addRewardToBlueprint?: (rewardId: number, blueprintId: number) => unknown;
  removeRewardFromBlueprint?: (rewardId: number, blueprintId: number) => unknown;
}

export const BlueprintRewardsCard: React.FC<BlueprintRewardsCardProps> = ({
  blueprintId,
  blueprintRewards = [],
  rewards = [],
  addRewardToBlueprint = () => null,
  removeRewardFromBlueprint = () => null,
}) => {
  const [rewardId, setRewardId] = useState<number>();
  const reset = (): void => {
    setRewardId(undefined)
  }

  const addRewardToBlueprintAndReset = (rewardId: number, blueprintId: number) => {
    reset();
    addRewardToBlueprint(rewardId, blueprintId)
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonLabel> rewards: </IonLabel>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {blueprintRewards.map((reward) => (
            <IonItem>
              <IonButton
                onClick={() => blueprintId ? removeRewardFromBlueprint(reward.id, blueprintId): undefined}
              >
                <IonIcon icon={closeOutline} />
              </IonButton>
              <IonLabel> {`${reward.id} - ${reward.name}`}</IonLabel>
            </IonItem>
          ))}
          <IonItem>
            <IonButton
              disabled={rewardId ? false : true}
              onClick={() => (rewardId && blueprintId ? addRewardToBlueprintAndReset(rewardId, blueprintId) : undefined)}
            >
              <IonIcon icon={checkmarkOutline} />
            </IonButton>
            <IonSelect value={rewardId} placeholder="Select Reward" onIonChange={(e) => setRewardId(e.detail.value)}>
              {rewards.map((reward) => (
                <IonSelectOption value={reward.id}>
                  {`(id: ${reward.id}) ${reward.amount} - ${reward.name}`}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
