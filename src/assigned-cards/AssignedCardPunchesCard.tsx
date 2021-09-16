import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { checkboxOutline } from 'ionicons/icons';

import type { AssignedCardPunch } from '../api/loyalty-cards/assigned-cards/AssignedCardPunch';

import { PunchedPunchBox } from './PunchedPunchBox';
import { UnpunchedPunchBox } from './UnpunchedPunchBox';

interface AssignedCardPunchesCardProps {
  title?: string;
  punches?: AssignedCardPunch[];
  numberOfPunchBoxes: number;
}

export const AssignedCardPunchesCard: React.FC<AssignedCardPunchesCardProps> = ({
  title,
  punches = [],
  numberOfPunchBoxes,
}) => {
  const unpunchedPunchBoxes = numberOfPunchBoxes - punches.length;
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{`${title}`}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            {punches.map((punch) => (
              <IonCol size="6" key={`punched-box-${punch.id}`}>
                <PunchedPunchBox />
              </IonCol>
            ))}
            {[...Array(unpunchedPunchBoxes)].map((value, index) => (
              <IonCol size="6" key={`unpunched-box-${index}`}>
                <UnpunchedPunchBox />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
