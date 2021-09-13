import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonPage,
  IonRow,
  useIonToast,
} from '@ionic/react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import type { CreateRewardDTO } from '../api/loyalty-cards/rewards/CreateRewardDto';
import type { Reward as RewardType } from '../api/loyalty-cards/rewards/Reward';
import { Header } from '../app/Header';
import type { AppDispatch, RootState } from '../app/store';

import { AddRewardCard } from './AddRewardCard';
import { RewardCard } from './RewardCard';
import { setRewardsRequested, deleteRewardRequested, createRewardAndReloadRequested } from './RewardsActions';



interface RewardDispatchProps {
  createRewardAndReloadRequested: (createRewardDTO: CreateRewardDTO) => Promise<void>
}

interface RewardsProps extends RewardDispatchProps{
  rewards: RewardType[];
  setRewardsRequested: () => Promise<void>;
  deleteRewardRequested: (id: number) => Promise<void>;
  isLoading: boolean;
  error?: { message: string | null };
}

export const Rewards: React.FC<RewardsProps> = ({
  rewards,
  createRewardAndReloadRequested,
  setRewardsRequested: setRewards,
  deleteRewardRequested: deleteReward,
  isLoading,
  error,
}) => {
  const pageTitle = 'Rewards';
  const loadingMessage = 'Loading...';
  const deleteRewardAndReload = (id: number) => {
    deleteReward(id).then(() => setRewards());
  };
  const [present] = useIonToast();

  useEffect(() => {
    setRewards();
  }, []);

  useEffect(() => {
    if (error?.message) {
      present({ message: error.message, duration: 2500 });
    }
  }, [error]);

  return (
    <IonPage>
      <IonHeader>
        <Header pageTitle={pageTitle} />
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={isLoading} message={loadingMessage} />
        <IonGrid fixed>
          <IonRow>
            <IonCol size="6">
              <AddRewardCard addReward={createRewardAndReloadRequested}/>
            </IonCol>
            {rewards
              .sort((a, b) => b.id - a.id)
              .map((reward) => (
                <IonCol size="6" key={reward.id}>
                  <RewardCard reward={reward} deleteCallback={deleteRewardAndReload} />
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: RootState) => ({
  rewards: state.rewardsStore.rewards,
  isLoading: state.rewardsStore.isLoading,
  error: state.rewardsStore.error,
});

const mapDispatchToProps = {
  setRewardsRequested,
  deleteRewardRequested,
  createRewardAndReloadRequested
};

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);
