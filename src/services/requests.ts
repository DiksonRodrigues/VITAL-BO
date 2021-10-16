import api from './api';
import {} from 'react';

import {
  ITypes,
  IEnterprises,
  IStatus,
  IVehicleDescription,
  IStoppingPoints,
  IDriver,
  IHist,
  IListMedidasTomadas,
  ICosts,
} from './interfaces';

const orgId = '55';

const RGetTypes = async (userId: string | undefined) => {
  const response: {
    data: {
      data: Array<ITypes>;
    };
  } = await api.get(`users/${userId}/boletim_ocorrencia/types/${orgId}`);

  return response.data.data.map(data => ({
    name: data.desc,
    value: data,
  }));
};

const REnterprisesOptions = async () => {
  const response: {
    data: {
      data: Array<IEnterprises>;
    };
  } = await api.get(`/boletim_ocorrencia/clients/${orgId}`);

  return response.data.data.map(data => ({name: data.name, value: data}));
};

const RVehicleDescriptionOptions = async () => {
  const response: {
    data: {
      data: Array<IVehicleDescription>;
    };
  } = await api.get(`/assets?orgid=${orgId}`);

  return response.data.data;
};

const RGetStatus = async () => {
  const response: {
    data: {
      data: Array<IStatus>;
    };
  } = await api.get(`/boletim_ocorrencia/status/${orgId}`);

  return response.data.data;
};

const RGetStoppingPoints = async () => {
  const response: {
    data: {
      data: Array<IStoppingPoints>;
    };
  } = await api.get(`/boletim_ocorrencia/obras/${orgId}`);

  return response.data.data;
};

const RGetDriver = async () => {
  const response: {
    data: {
      data: Array<IDriver>;
    };
  } = await api.get(`/boletim_ocorrencia/motoristas/${orgId}`);

  return response.data.data;
};

const RGetHistoric = async (id: string | undefined) => {
  const response: {
    data: {
      data: Array<IHist>;
    };
  } = await api.get(`users/${id}/boletim_ocorrencia/${orgId}`);

  return response.data.data.map(data => ({
    ...data,
  }));
};

const sendLocation = async (
  typeId: string | undefined,
  data: {long: string; lat: string},
) => {
  await api.post(`/boletim_ocorrencia/${typeId}/latlong/${orgId}`, data);
};

const setBoletimOccurrence = async (data: {
  // Id do tipo de BO
  boletim_ocorrencia_type_id: string;

  // Motorista
  driver_id: string;

  // Empresa contratada
  contracted_company_id: string;

  // Pontos de parada "OBRAS"
  ponto_parada_id: string;

  // Hodômetro
  hodometro: string;

  // Horímetro
  horimetro: string;

  // Descrição Veículo
  asset_id: string;

  // Status
  assets_state_id: string;

  // Descrição
  desc: string;

  // Endereço
  address: string;

  // Cidade
  city: string;

  // latitude
  lat: number;

  // longitude
  long: number;
}) => {
  const response = await api.post(`/boletim_ocorrencia/${orgId}`, data);
  if (response.data.data) {
    return response.data.data;
  } else {
    return response;
  }
};

const updatePhotos = async (
  id: string,
  images: Array<string>,
): Promise<void> => {
  await api.post(`/boletim_ocorrencia/${id}/images/${orgId}`, {
    images,
  });
};

const setMedidasTomadas = async (
  id: string,
  data: Array<IListMedidasTomadas>,
): Promise<void> => {
  const dataToSend = {
    measures: data,
  };
  await api.post(`/boletim_ocorrencia/${id}/measures/${orgId}`, dataToSend);
};

const RGetCustosOptions = async (id: string | undefined) => {
  const response: {
    data: {
      data: Array<ICosts>;
    };
  } = await api.get(`/boletim_ocorrencia/${id}/costs/${orgId}`);

  return response.data.data.map(data => ({
    name: data.desc,
    value: data,
  }));
};

const sendCost = async (
  id: string,
  table: Array<{
    desc: string;
    value: number | null;
    accountable: string;
  }>,
): Promise<void> => {
  table.map(async data => {
    await api.post(`/boletim_ocorrencia/${id}/costs/${orgId}`, {...data});
  });
};

const setManu = async (
  id: string,
  maintenance_site: string,
  maintenance_started_at: string,
  maintenance_ended_at: string,
) => {
  await api.post(`/boletim_ocorrencia/${id}/maintenance/${orgId}`, {
    maintenance_site,
    maintenance_started_at,
    maintenance_ended_at,
  });
};

const closeBO = async (id: string) => {
  await api.post(`/boletim_ocorrencia/${id}/close/${orgId}`);
};

export {
  REnterprisesOptions,
  RVehicleDescriptionOptions,
  RGetStatus,
  RGetStoppingPoints,
  RGetDriver,
  RGetHistoric,
  sendLocation,
  closeBO,
  updatePhotos,
  setMedidasTomadas,
  RGetCustosOptions,
  RGetTypes,
  setBoletimOccurrence,
  sendCost,
  setManu,
};
