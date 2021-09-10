import { IonCard, IonCardContent, IonCardHeader, IonInput, IonItem, IonList } from '@ionic/react';
import { useState } from 'react';

import type { CreateRewardDTO } from '../api/loyalty-cards/rewards/CreateRewardDto';
import { AddCardToolBar } from '../cards-toolbar/AddCardToolBar';

interface AddRewardCardProps {
  addReward?: (createRewardDTO: CreateRewardDTO) => Promise<void> | void;
}

export const AddRewardCard: React.FC<AddRewardCardProps> = ({ addReward = () => null }) => {
  const [name, setName] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [amount, setAmount] = useState(1);

  const resetForm = () => {
    setName(undefined);
    setUrl(undefined);
    setAmount(1)
  }

  const submitAddReward = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Request add reward', { name, url, amount });
    if (name && url) {
      addReward({name, url, amount})
      resetForm()
    } else {
      console.error('Validations failed')
    }
  };

  return (
    <form id="addReward" onSubmit={submitAddReward}>
      <IonCard>
        <IonCardHeader>
          <AddCardToolBar reset={resetForm} />
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonInput required value={name} placeholder="name" onIonChange={(e) => setName(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonInput required value={url} type="url" placeholder="url" onIonChange={(e) => setUrl(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonInput
                required
                min="1"
                max="1000"
                value={amount}
                type="number"
                placeholder="amount"
                onIonChange={(e) => setAmount(+e.detail.value!)}
              /> 
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </form>
  );
};
