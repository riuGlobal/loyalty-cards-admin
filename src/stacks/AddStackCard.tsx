import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useState } from 'react';

import type { BlueprintDTO } from '../api/loyalty-cards/blueprints/BlueprintsDTO';
import type { CreateStackDTO } from '../api/loyalty-cards/stacks/CreateStackDTO';
import { AddToolbar } from '../cards-toolbar/AddToolbar';

interface AddStackCardProps {
  createStack?: (createStackDTO: CreateStackDTO) => unknown;
  blueprints?: BlueprintDTO[];
}
export const AddStackCard: React.FC<AddStackCardProps> = ({
  blueprints = [],
  createStack = () => null,
}) => {
  const [title, setTitle] = useState<string>();
  const [numberOfCards, setNumberOfCards] = useState(100);
  const [blueprintId, setBlueprintId] = useState<number>();

  const reset = () => {
    setTitle(undefined);
    setNumberOfCards(100);
    setBlueprintId(undefined);
  };

  const createStackAndReset = () => {
    console.log('--')
    if (title && numberOfCards && blueprintId) {
      reset();
      createStack({ title, numberOfCards, cardBlueprinId: blueprintId });
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <AddToolbar add={() => createStackAndReset()} reset={reset} />
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonInput required value={title} placeholder="title" onIonChange={(e) => setTitle(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonInput
              value={numberOfCards}
              required
              type="number"
              min="1"
              placeholder="number of cards in stack"
              onIonChange={(e) => setNumberOfCards(+e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonSelect value={blueprintId} placeholder="Blueprint" onIonChange={(e) => setBlueprintId(e.detail.value)}>
              {blueprints.map((blueprint) => (
                <IonSelectOption value={blueprint.id}>{`blueprint id: ${blueprint.id}`}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
