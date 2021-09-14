import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow } from '@ionic/react';

import type { StackDTO } from '../api/loyalty-cards/stacks/StackDTO';
import stacksMock from '../api/loyalty-cards/stacks/stacks-mock.json';
import { AppToolbar } from '../app/AppToolbar';

import { AddStackCard } from './AddStackCard';
import { StackCard } from './StackCard';


interface StacksOwnProps {
  pageTitle?: string;
}

interface StacksStateProps {
  stacks?: StackDTO[]
}

interface StacksDispatchProps {
  createStack?: () => unknown,
  removeStack?: (id: number) => unknown
}

type StacksProps = StacksOwnProps & StacksStateProps & StacksDispatchProps;

const Stacks: React.FC<StacksProps> = ({ stacks, pageTitle }) => (
  <IonPage>
    <IonHeader>
      <AppToolbar pageTitle={pageTitle} />
    </IonHeader>
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size='6'>
            <AddStackCard />
          </IonCol>
          { stacks?.map((stack) => (
            <IonCol size='6'>
              <StackCard  />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
);

const StacksContainer: React.FC = () => {
  const pageTitle = 'Stacks';
  return <Stacks {...{ stacks: stacksMock, pageTitle }} />;
};

export default StacksContainer;
