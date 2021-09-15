import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { HOST, ASSIGNED_CARDS_PATH } from '../LoyaltyCardsApiConstants';

import type { AssignedCardsDTO } from './AssignedCardsDTO';
import type { CreateAssignedCardsDTO } from './CreateAssignedCardsDTO';

const findAll = async (): Promise<AxiosResponse<AssignedCardsDTO[]>> => {
  return axios.get(`${HOST}${ASSIGNED_CARDS_PATH}`);
};

const remove = async (id: number): Promise<AxiosResponse<unknown>> => {
  return axios.delete(`${HOST}${ASSIGNED_CARDS_PATH}/${id}`);
};

const create = async (createAssignedCardsDTO: CreateAssignedCardsDTO): Promise<AxiosResponse<unknown>> => {
  return axios.post(`${HOST}${ASSIGNED_CARDS_PATH}`, createAssignedCardsDTO);
};

export const AssignedCardsApi = { create, findAll, remove };
