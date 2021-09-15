import { Reward } from "../rewards/Reward";
import { AssignedCardPunch } from "./AssignedCardPunch";
import { AssignedCardRedeemedMark } from "./AssignedCardRedeemedMark";

export interface AssignedCardsDTO {
  cardStackId: number;
  userId: string;
  id: number;
  title: string;
  numberOfPunchBoxes: number;
  rewards: Reward[];
  punches: AssignedCardPunch[];
  redeemedMarks: AssignedCardRedeemedMark[]
}
