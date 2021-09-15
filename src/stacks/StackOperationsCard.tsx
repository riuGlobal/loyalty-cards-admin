import type {
  AlertButton} from '@ionic/react';
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import { checkmarkOutline } from 'ionicons/icons';
import { useState } from 'react';

interface StackOperationsCard {
  stackId?: number;
  assignCardToUser?: (stackId: number, userId: string) => unknown;
}

export const StackOperationsCard: React.FC<StackOperationsCard> = ({ stackId, assignCardToUser = () => null }) => {
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [userId, setUserId] = useState<string>();

  const reset = () => {
    setUserId(undefined);
  };

  const handleConfirm = () => {
    reset();
    if (stackId && userId) {
      assignCardToUser(stackId, userId)
    }
  };

  const alertButtons: AlertButton[] = [
    {
      text: 'Cancel',
    },
    {
      text: 'Confirm',
      handler: handleConfirm,
    },
  ];

  const assignCard = () => {
    if (stackId && userId) {
      setAlertIsOpen(true);
    }
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonAlert
          isOpen={alertIsOpen}
          header={`Assign card to: ${userId}`}
          message={`You sure you want to assign card to user with id: ${userId}`}
          buttons={alertButtons}
          onDidDismiss={() => setAlertIsOpen(false)}
        />
        <IonList>
          <IonItem>
            <IonLabel position="stacked">{`Assign to: `}</IonLabel>
            <IonInput required value={userId} placeholder="userId" onIonChange={(e) => setUserId(e.detail.value!)} />
            <IonButton disabled={!(stackId && userId)} onClick={assignCard}>
              <IonIcon icon={checkmarkOutline} />
            </IonButton>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};
