import { IonCol, IonContent, IonGrid, IonHeader, IonLoading, IonPage, IonRow, useIonToast } from '@ionic/react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import type { BlueprintDTO } from '../api/loyalty-cards/blueprints/BlueprintsDTO';
import type { CreateBlueprintDTO } from '../api/loyalty-cards/blueprints/CreateBlueprintsDTO';
import type { Reward } from '../api/loyalty-cards/rewards/Reward';
import { AppToolbar } from '../app/AppToolbar';
import type { RootState } from '../app/store';
import {
  setBlueprintsRequested,
  addBlueprintAndReloadRequested,
  removeBlueprintAndReloadRequested,
  removeRewardFromBlueprintAndReload,
  addRewardToBlueprintAndReload
} from '../blueprints/BlueprintsActions';
import { setRewardsRequested } from '../rewards/RewardsActions';

import { AddBlueprintCard } from './AddBlueprintCards';
import { BlueprintCard } from './BlueprintCard';

interface BlueprintsOwnProps {
  pageTitle: string;
  loadingMessage?: string;
}

interface BlueprintsStateProps {
  blueprints: BlueprintDTO[];
  rewards: Reward[];
  isLoading: boolean;
  error?: {
    message: string | null;
  };
}

interface BlueprintsDispatchProps {
  addBlueprintAndReloadRequested: (createBlueprintDTO: CreateBlueprintDTO) => Promise<void>;
  removeBlueprintAndReloadRequested: (id: number) => Promise<void>;
  removeRewardFromBlueprintAndReload: (rewardId: number, blueprintId: number) => unknown,
  addRewardToBlueprintAndReload: (rewardId: number, blueprintId: number) => unknown
}

type BlueprintsProps = BlueprintsOwnProps & BlueprintsStateProps & BlueprintsDispatchProps;

export const Blueprints: React.FC<BlueprintsProps> = ({
  pageTitle,
  loadingMessage,
  blueprints,
  rewards,
  isLoading,
  addBlueprintAndReloadRequested,
  removeBlueprintAndReloadRequested,
  removeRewardFromBlueprintAndReload: removeRewardFromBlueprint,
  addRewardToBlueprintAndReload: addRewardToBlueprint
}) => (
  <IonPage>
    <IonHeader>
      <AppToolbar pageTitle={pageTitle} />
    </IonHeader>
    <IonContent>
      <IonLoading isOpen={isLoading} message={loadingMessage} />
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <AddBlueprintCard addBlueprint={addBlueprintAndReloadRequested} />
          </IonCol>
          {blueprints.map((blueprint) => {
            const { rewards: blueprintRewards, ...blueprintProps } = blueprint;
            return (
              <IonCol key={`blueprint-card-${blueprint.id}`} size="6">
                <BlueprintCard
                  {...{
                    ...blueprintProps,
                    blueprintRewards,
                    deleteBlueprint: removeBlueprintAndReloadRequested,
                    rewards,
                    removeRewardFromBlueprint,
                    addRewardToBlueprint
                  }}
                />
              </IonCol>
            );
          })}
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

const mapStateToProps = (state: RootState) => ({
  blueprints: state.blueprintsStore.blueprints,
  rewards: state.rewardsStore.rewards,
  isLoading: state.blueprintsStore.isLoading,
  error: state.blueprintsStore.error,
});

const mapDispatchToProps = {
  setBlueprintsRequested,
  setRewardsRequested,
  addBlueprintAndReloadRequested,
  removeBlueprintAndReloadRequested,
  removeRewardFromBlueprintAndReload,
  addRewardToBlueprintAndReload
};

interface BlueprintsContainerDispatchProps extends BlueprintsDispatchProps {
  setBlueprintsRequested: () => Promise<void>;
  setRewardsRequested: () => unknown;
}

type BlueprintsContainerProps = BlueprintsStateProps & BlueprintsContainerDispatchProps;

const BlueprintsContainer: React.FC<BlueprintsContainerProps> = ({
  setBlueprintsRequested,
  setRewardsRequested,
  error,
  ...restOfProps
}) => {
  const pageTitle = 'Blueprints';
  const loadingMessage = 'Loading...';
  const [present] = useIonToast();
  useEffect(() => {
    setBlueprintsRequested();
    setRewardsRequested();
  }, []);
  useEffect(() => {
    if (error?.message) {
      present ({message: error.message, duration: 2500})
    }
  }, [error])
  return <Blueprints {...{ ...restOfProps, pageTitle, loadingMessage }} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(BlueprintsContainer);
