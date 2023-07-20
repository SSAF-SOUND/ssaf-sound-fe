import type {
  UserInfo,
  SsafyTrack,
  UserPortfolio,
  MyPortfolio,
} from './utils/types';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

export type GetMyInfoApiData = ApiSuccessResponse<UserInfo>;

export const getMyInfo = () => {
  const endpoint = endpoints.user.myInfo();
  return privateAxios
    .get<GetMyInfoApiData>(endpoint)
    .then((res) => res.data.data);
};

export type UpdateMyInfoApiData = ApiSuccessResponse<UserInfo>;
export interface UpdateMyInfoParams {
  nickname: string;
  ssafyMember: boolean;
  isMajor: boolean;
  campus?: string;
  semester?: number;
}

export const updateMyInfo = (params: UpdateMyInfoParams) => {
  const endpoint = endpoints.user.myInfo();

  return privateAxios
    .put<UpdateMyInfoApiData>(endpoint, params)
    .then((res) => res.data.data);
};

export interface UpdateSsafyBasicInfoParams {
  ssafyMember: boolean;
  semester: null | number;
  campus: null | string;
}

export const updateSsafyBasicInfo = (params: UpdateSsafyBasicInfoParams) => {
  const endpoint = endpoints.user.ssafyBasicInfo();

  return privateAxios.patch(endpoint, params).then((res) => res.data);
};

export interface UpdateIsMajorParams {
  isMajor: boolean;
}

export const updateIsMajor = (params: UpdateIsMajorParams) => {
  const endpoint = endpoints.user.isMajor();

  return privateAxios.patch(endpoint, params).then((res) => res.data);
};

export interface UpdateTrackParams {
  track: string;
}

export const updateTrack = (params: UpdateTrackParams) => {
  const endpoint = endpoints.user.track();

  return privateAxios.patch(endpoint, params).then((res) => res.data);
};

export interface UpdateNicknameParams {
  nickname: string;
}
export const updateNickname = (params: UpdateNicknameParams) => {
  const endpoint = endpoints.user.nickname();

  return privateAxios.patch(endpoint, params).then((res) => res.data);
};

export interface ValidateNicknameParams {
  nickname: string;
}

export const validateNickname = (params: ValidateNicknameParams) => {
  const endpoint = endpoints.user.nickname();

  return privateAxios.post(endpoint, params).then((res) => res.data);
};

export interface CertifyStudentParams {
  majorTrack: SsafyTrack;
  semester: number;
  answer: string;
}

export type CertifyStudentApiData = ApiSuccessResponse<{
  possible: boolean;
  certificationInquiryCount: number;
}>;

export const certifyStudent = (params: CertifyStudentParams) => {
  const endpoint = endpoints.user.studentCertification();

  return privateAxios
    .post<CertifyStudentApiData>(endpoint, params)
    .then((res) => res.data.data);
};

interface UpdatePortfolioVisibilityParams {
  isPublic: boolean;
}

export const updatePortfolioVisibility = (
  params: UpdatePortfolioVisibilityParams
) => {
  const endpoint = endpoints.user.portfolioVisibility();
  return privateAxios.patch(endpoint, params).then((res) => res.data);
};

// 포트폴리오

type GetUserPortfolioApiData = ApiSuccessResponse<UserPortfolio>;
export const getUserPortfolio = (id: number) => {
  const endpoint = endpoints.user.portfolio(id);

  return privateAxios
    .get<GetUserPortfolioApiData>(endpoint)
    .then((res) => res.data.data);
};

type GetMyPortfolioApiData = ApiSuccessResponse<MyPortfolio>;
export const getMyPortfolio = () => {
  const endpoint = endpoints.user.myPortfolio();

  return privateAxios
    .get<GetMyPortfolioApiData>(endpoint)
    .then((res) => res.data.data);
};
