import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow } from '@ionic/react';

import { AppToolbar } from '../app/AppToolbar';

import assignedCardsMock from '../api/loyalty-cards/assigned-cards/assigned-cards-mock.json';
import { AssignedCardsDTO } from '../api/loyalty-cards/assigned-cards/AssignedCardsDTO';
import { AssignedCard } from './AssignedCard';

interface AssignedCardsOwnProps {
  pageTitle?: string;
  assignedCards?: AssignedCardsDTO[];
}

type AssignedCardsProps = AssignedCardsOwnProps;

export const AssignedCards: React.FC<AssignedCardsProps> = ({ pageTitle, assignedCards = [] }) => (
  <IonPage>
    <IonHeader>
      <AppToolbar pageTitle={pageTitle} />
    </IonHeader>
    <IonContent>
      <IonGrid>
        <IonRow>
          {assignedCards.map((assignedCard) => (
            <IonCol size="6">
              <AssignedCard {...assignedCard}/>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

export const AssignedCardsContainer: React.FC = () => {
  const pageTitle = 'Assigned Cards';

  const assignedCards = assignedCardsMock;
  return <AssignedCards pageTitle={pageTitle} assignedCards={assignedCards} />;
};

export default AssignedCardsContainer;
