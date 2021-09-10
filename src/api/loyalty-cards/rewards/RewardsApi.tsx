import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { HOST, REWARDS_SLUG } from '../../loyalty-cards/LoyaltyCardsApiConstants'

import type { CreateRewardDTO } from './CreateRewardDto';
import type { Reward } from './Reward';

const create = async (createRewardDTO: CreateRewardDTO): Promise<AxiosResponse<unknown>> => {
  return await axios.post(`${HOST}${REWARDS_SLUG}`, createRewardDTO )
} 

const findAll:() => Promise<AxiosResponse<Reward[]>> = async () => {
  return await axios.get(`${HOST}${REWARDS_SLUG}`)
}

const remove = async (id: number):Promise<AxiosResponse<unknown>> => {
  return await axios.delete(`${HOST}${REWARDS_SLUG}/${id}`);
}

export const RewardsApi = { create, findAll, remove}
