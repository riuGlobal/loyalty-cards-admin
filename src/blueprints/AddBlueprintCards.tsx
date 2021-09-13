import { IonCard, IonCardContent, IonCardHeader, IonInput, IonItem, IonList } from '@ionic/react';
import { useState } from 'react';

import type { CreateBlueprintDTO } from '../api/loyalty-cards/blueprints/CreateBlueprintsDTO';
import { AddCardToolBar } from '../cards-toolbar/AddCardToolBar';

interface AddBlueprintCard {
  addBlueprint?: (createBlueprintDTO: CreateBlueprintDTO) => unknown;
}

export const AddBlueprintCard: React.FC<AddBlueprintCard> = ({ addBlueprint = () => null }) => {
  const defaultNumberOfPunchBoxes = 10;
  const [title, setTitle] = useState<string>();
  const [numberOfPunchBoxes, setNumberOfPunchBoxes] = useState<number>(defaultNumberOfPunchBoxes);

  const reset = () => {
    setTitle(undefined);
    setNumberOfPunchBoxes(defaultNumberOfPunchBoxes);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title) {
      addBlueprint({
        title,
        numberOfPunchBoxes,
      });
      reset();
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <form onClick={submit}>
          <AddCardToolBar reset={reset} />
        </form>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonInput value={title} placeholder="title" onIonChange={(e) => setTitle(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonInput
              value={numberOfPunchBoxes}
              type="number"
              placeholder="number of punch-boxes"
              min="1"
              max="20"
              onIonChange={(e) => setNumberOfPunchBoxes(+e.detail.value!)}
            />
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
