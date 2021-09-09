import { IonCard, IonCardContent, IonCardHeader, IonTitle } from "@ionic/react";

import type { Reward as RewardType } from "../api/loyalty-cards/rewards/Reward";
import { CardToolBar } from "../cards-toolbar/CardToolBar";

interface RewardProps {
  reward: RewardType,
  deleteCallback: (id: number) => unknown
}

export const RewardCard: React.FC<RewardProps> 
  = ({reward: {id, name: title, url, amount}, 
    deleteCallback: del}
    ) => (
      <IonCard>
        <IonCardHeader>
          <CardToolBar deleteCallback={() => del(id)}/>
        </IonCardHeader>
        <IonCardContent>
          <IonTitle> {`id: ${id}`} </IonTitle>
          <IonTitle> {`title: ${title}`} </IonTitle>
          <IonTitle> {`url: ${url}`} </IonTitle>
          <IonTitle> {`amount: ${amount}`} </IonTitle>
        </IonCardContent>
      </IonCard>
    )
