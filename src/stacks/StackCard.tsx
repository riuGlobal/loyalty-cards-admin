import { IonCard, IonCardContent, IonCardHeader, IonItem, IonLabel, IonList } from '@ionic/react';

import { CardToolBar } from '../cards-toolbar/CardToolBar';

import { StackOperationsCard } from './StackOperationsCard';

interface StackCardProps {
  id?: number;
  title?: string;
  numberOfCards?: number;
  cardBlueprintId?: number;
  removeStack?: (id: number) => unknown;
  assignCardToUser? : (stackId: number, userId: string) => unknown;
}

export const StackCard: React.FC<StackCardProps> = ({
  id,
  title,
  numberOfCards,
  cardBlueprintId,
  removeStack = (id: number) => null,
  assignCardToUser = () => null
}) => (
  <IonCard>
    <IonCardHeader>
      <CardToolBar deleteCallback={id ? () => removeStack(id) : undefined} />
    </IonCardHeader>
    <IonCardContent>
      <IonList lines="none">
        <IonItem>
          <IonLabel>{`id: ${id}`}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel> {`title: ${title}`} </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel> {`number of cards: ${numberOfCards}`}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel> {`blueprint: ${cardBlueprintId}`} </IonLabel>
        </IonItem>
        <IonItem>
          <StackOperationsCard stackId={id} assignCardToUser={assignCardToUser}/>
        </IonItem>
      </IonList>
    </IonCardContent>
  </IonCard>
);
