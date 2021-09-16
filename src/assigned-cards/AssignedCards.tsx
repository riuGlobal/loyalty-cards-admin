import { IonCol, IonContent, IonGrid, IonHeader, IonLoading, IonPage, IonRow, useIonToast } from '@ionic/react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import type { AddRedeemedMarkToAssignedCardDTO } from '../api/loyalty-cards/assigned-cards/AddRedeemedMarkToAssignedCardDTO';
import type { AssignedCardsDTO } from '../api/loyalty-cards/assigned-cards/AssignedCardsDTO';
import { AppToolbar } from '../app/AppToolbar';
import type { RootState } from '../app/store';

import { AssignedCard } from './AssignedCard';
import {
  setAssignedCardsRequested,
  removeAssignedCardAndReloadRequested,
  addRedeemedMarkToAssignedCardAndReloadRequested,
  removeRedeemedMarkFromAssignedCardAndReloadRequested,
} from './AssignedCardsActions';

interface AssignedCardsOwnProps {
  pageTitle?: string;
}

interface AssignedCardsStateProps {
  assignedCards?: AssignedCardsDTO[];
  isLoading?: boolean;
  error?: {
    message: string;
  };
}

interface AssignedCardsDispatchProps {
  removeAssignedCardAndReloadRequested?: (id: number) => unknown;
  addRedeemedMarkToAssignedCardAndReloadRequested?: (
    addRedeemedMarkToAssignedCardDTO: AddRedeemedMarkToAssignedCardDTO
  ) => unknown;
  removeRedeemedMarkFromAssignedCardAndReloadRequested?: (markId: number) => unknown;
}

type AssignedCardsProps = AssignedCardsOwnProps & AssignedCardsStateProps & AssignedCardsDispatchProps;

export const AssignedCards: React.FC<AssignedCardsProps> = ({
  pageTitle,
  assignedCards = [],
  isLoading = false,
  removeAssignedCardAndReloadRequested,
  addRedeemedMarkToAssignedCardAndReloadRequested: addRedeemedMarkToAssignedCard,
  removeRedeemedMarkFromAssignedCardAndReloadRequested: removeRedeemedMarkFromAssignedCard,
}) => (
  <IonPage>
    <IonHeader>
      <AppToolbar pageTitle={pageTitle} />
    </IonHeader>
    <IonContent>
      <IonLoading isOpen={isLoading} />
      <IonGrid>
        <IonRow>
          {assignedCards.map((assignedCard) => (
            <IonCol size="6" key={`assigned-card-${assignedCard.id}`}>
              <AssignedCard
                removeAssignedCard={removeAssignedCardAndReloadRequested}
                addRedeemedMarkToAssignedCard={addRedeemedMarkToAssignedCard}
                removeRedeemedMarkFromAssignedCard={removeRedeemedMarkFromAssignedCard}
                {...assignedCard}
              />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

interface AssignedCardsContainerProps extends AssignedCardsProps {
  setAssignedCardsRequested: () => Promise<unknown>;
  error?: {
    message: string;
  };
}

export const AssignedCardsContainer: React.FC<AssignedCardsContainerProps> = ({
  assignedCards = [],
  isLoading,
  error,
  addRedeemedMarkToAssignedCardAndReloadRequested,
  removeRedeemedMarkFromAssignedCardAndReloadRequested,
  removeAssignedCardAndReloadRequested,
  setAssignedCardsRequested,
}) => {
  const pageTitle = 'Assigned Cards';
  const [present] = useIonToast();
  assignedCards = assignedCards.sort((a,b) => b.id - a.id)

  useEffect(() => {
    setAssignedCardsRequested();
  }, []);

  useEffect(() => {
    if (error?.message) {
      present({ message: error?.message, duration: 2500 });
    }
  }, [error]);

  return (
    <AssignedCards
      pageTitle={pageTitle}
      assignedCards={assignedCards}
      isLoading={isLoading}
      removeAssignedCardAndReloadRequested={removeAssignedCardAndReloadRequested}
      addRedeemedMarkToAssignedCardAndReloadRequested={addRedeemedMarkToAssignedCardAndReloadRequested}
      removeRedeemedMarkFromAssignedCardAndReloadRequested={removeRedeemedMarkFromAssignedCardAndReloadRequested}
    />
  );
};

const mapStateToProps = (state: RootState): AssignedCardsStateProps => ({
  assignedCards: state.assignedCardsStore.assignedCards,
  isLoading: state.assignedCardsStore.isLoading,
  error: state.assignedCardsStore.error,
});

const mapDispatchToProps = {
  setAssignedCardsRequested,
  removeAssignedCardAndReloadRequested,
  addRedeemedMarkToAssignedCardAndReloadRequested,
  removeRedeemedMarkFromAssignedCardAndReloadRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignedCardsContainer);
