import { IonCard, IonCardContent } from '@ionic/react';

import type { AddRedeemedMarkToAssignedCardDTO } from '../api/loyalty-cards/assigned-cards/AddRedeemedMarkToAssignedCardDTO';

interface AddRedeemedMarkCardProps {
  assignedCardId?: number
  addRedeemedMarkToAssignedCard?: (addRedeemedMarkToAssignedCardDTO: AddRedeemedMarkToAssignedCardDTO) => unknown;
}

export const AddRedeemedMarkCard: React.FC<AddRedeemedMarkCardProps>
  = ({ assignedCardId, addRedeemedMarkToAssignedCard }) => {
  const date = new Date();
  return (
    <IonCard>
      <IonCardContent>
        <IonCard button color="tertiary" onClick={(assignedCardId && addRedeemedMarkToAssignedCard)? () => addRedeemedMarkToAssignedCard({ assignedCardId: assignedCardId , note: 'From admin dashboard.' }): undefined }>
          <IonCardContent>{`date: ${date}`}</IonCardContent>
        </IonCard>
      </IonCardContent>
    </IonCard>
  );
};
