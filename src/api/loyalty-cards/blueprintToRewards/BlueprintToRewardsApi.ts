import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { HOST, BLUEPRINT_TO_REWARDS_SLUG } from '../LoyaltyCardsApiConstants';

import type { BlueprintToRewardsDTO } from './BlueprintToRewardsDTO';
import type { CreateBlueprintToRewardsDTO } from './CreateBlueprintToRewardsDTO';

interface FindBlueprintToRewardsParams {
  cardBlueprintId?: number;
  rewardId?: number;
}

const findAll = async (
  findBlueprintToRewardsParams: FindBlueprintToRewardsParams
): Promise<AxiosResponse<BlueprintToRewardsDTO[]>> => {
  return axios.get(`${HOST}${BLUEPRINT_TO_REWARDS_SLUG}`, { params: findBlueprintToRewardsParams });
};

const addBlueprintToReward = async (
  createBlueprintToRewardsDTO: CreateBlueprintToRewardsDTO
): Promise<AxiosResponse<unknown>> => {
  return axios.post(`${HOST}${BLUEPRINT_TO_REWARDS_SLUG}`, createBlueprintToRewardsDTO);
};

const removeBlueprintFromReward = async (id: number): Promise<AxiosResponse<unknown>> => {
  return axios.delete(`${HOST}${BLUEPRINT_TO_REWARDS_SLUG}/${id}`);
};

export const BlueprintToRewardsApi = { findAll, addBlueprintToReward, removeBlueprintFromReward };
