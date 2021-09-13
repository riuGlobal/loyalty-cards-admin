import type { Reward } from "../rewards/Reward";

export interface BlueprintDTO {
  id: number;
  title: string;
  numberOfPunchBoxes: number
  rewards: Reward[]
}