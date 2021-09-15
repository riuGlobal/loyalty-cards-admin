// export const findAll = (): Promise<Actio> => {}

import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { HOST, STACKS_PATH } from '../LoyaltyCardsApiConstants';

import type { CreateStackDTO } from './CreateStackDTO';
import type { StackDTO } from './StackDTO';

const findAll = (): Promise<AxiosResponse<StackDTO[]>> => {
  return axios.get(`${HOST}${STACKS_PATH}`);
};

const create = (createStackDTO: CreateStackDTO): Promise<AxiosResponse<unknown>> => {
  return axios.post(`${HOST}${STACKS_PATH}`, createStackDTO);
};

const remove = async (id: number): Promise<AxiosResponse<unknown>> => {
  return axios.delete(`${HOST}${STACKS_PATH}/${id}`);
};

export const StacksApi = {
  findAll, 
  create,
  remove
}
