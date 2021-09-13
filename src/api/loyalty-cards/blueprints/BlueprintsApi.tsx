import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { HOST, BLUEPRINTS_SLUG } from '../LoyaltyCardsApiConstants';

import type { BlueprintDTO } from './BlueprintsDTO';
import type { CreateBlueprintDTO } from './CreateBlueprintsDTO';

const create = async (createBlueprintDTO: CreateBlueprintDTO): Promise<AxiosResponse<unknown>> => {
  return axios.post(`${HOST}${BLUEPRINTS_SLUG}`, createBlueprintDTO);
};

const findAll = async (): Promise<AxiosResponse<BlueprintDTO[]>> => {
  return axios.get(`${HOST}${BLUEPRINTS_SLUG}`);
};

const remove = async (id: number): Promise<AxiosResponse<unknown>> => {
  return axios.delete(`${HOST}${BLUEPRINTS_SLUG}/${id}`);
};

export const BlueprintsApi = { create, findAll, remove };
