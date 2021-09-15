import { IonCol, IonContent, IonGrid, IonHeader, IonLoading, IonPage, IonRow, useIonToast } from '@ionic/react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import type { BlueprintDTO } from '../api/loyalty-cards/blueprints/BlueprintsDTO';
import type { CreateStackDTO } from '../api/loyalty-cards/stacks/CreateStackDTO';
import type { StackDTO } from '../api/loyalty-cards/stacks/StackDTO';
import { AppToolbar } from '../app/AppToolbar';
import type { RootState } from '../app/store';
import { setBlueprintsRequested } from '../blueprints/BlueprintsActions';

import { AddStackCard } from './AddStackCard';
import { StackCard } from './StackCard';
import {
  setStacksRequested,
  createStackAndReload,
  removeStackAndReload,
  assignCardToUserRequest,
} from './StacksActions';

interface StacksOwnProps {
  pageTitle?: string;
  loadingMessage?: string;
}

interface StacksStateProps {
  stacks?: StackDTO[];
  blueprints?: BlueprintDTO[];
  isLoading?: boolean;
  error?: {
    message: string;
  };
  assignedCardTo?: {
    userId: string;
  };
}

interface StacksDispatchProps {
  createStackAndReload?: (createStackDto: CreateStackDTO) => unknown;
  removeStackAndReload?: (id: number) => unknown;
  assignCardToUserRequest?: (stackId: number, userId: string) => unknown;
}

type StacksProps = StacksOwnProps & StacksStateProps & StacksDispatchProps;

const Stacks: React.FC<StacksProps> = ({
  pageTitle,
  loadingMessage,
  stacks,
  blueprints,
  isLoading = false,
  removeStackAndReload: removeStack,
  createStackAndReload: createStack,
  assignCardToUserRequest,
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
            <AddStackCard blueprints={blueprints} createStack={createStack} />
          </IonCol>
          {stacks?.map((stack) => (
            <IonCol size="6">
              <StackCard {...{ ...stack, removeStack }} assignCardToUser={assignCardToUserRequest} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

interface StacksContainerProps extends StacksProps {
  setStacksRequested: () => unknown;
  setBlueprintsRequested: () => unknown;
}

const StacksContainer: React.FC<StacksContainerProps> = ({
  setStacksRequested,
  setBlueprintsRequested,
  assignedCardTo,
  error,
  ...stacksProps
}) => {
  const pageTitle = 'Stacks';
  const loadingMessage = 'Loading...';
  const [present] = useIonToast();
  useEffect(() => {
    setStacksRequested();
    setBlueprintsRequested();
  }, []);

  useEffect(() => {
    if (error?.message) {
      present({ message: error.message, duration: 2500 });
    }
  }, [error]);

  useEffect(() => {
    if (assignedCardTo?.userId) {
      present({ message: `Assign card to user with id ${assignedCardTo.userId}`, duration: 2500 });
    }
  }, [assignedCardTo]);

  return <Stacks {...{ ...stacksProps, pageTitle, loadingMessage }} />;
};

const mapStateToProps = (state: RootState): StacksStateProps => ({
  stacks: state.stacksStore.stacks,
  isLoading: state.stacksStore.isLoading,
  error: state.stacksStore.error,
  blueprints: state.blueprintsStore.blueprints,
  assignedCardTo: state.stacksStore.assignedCardTo,
});

const mapDispatchToProps = {
  setStacksRequested,
  createStackAndReload,
  removeStackAndReload,
  setBlueprintsRequested,
  assignCardToUserRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(StacksContainer);
