import type {
  UserInfo,
  SsafyTrack,
  ProfileVisibility,
  UserPortfolio,
} from './utils/types';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios, publicAxios } from '~/utils';

export type GetMyInfoApiData = ApiSuccessResponse<UserInfo>;

export const getMyInfo = () => {
  const endpoint = endpoints.user.myInfo();
  return privateAxios
    .get<GetMyInfoApiData>(endpoint)
    .then((res) => res.data.data);
};

export type GetUserInfoApiData = ApiSuccessResponse<
  Omit<UserInfo, 'memberRole' | 'memberId'>
>;

export const getUserInfo = (id: number) => {
  const endpoint = endpoints.user.userInfo(id);

  return publicAxios.get<GetUserInfoApiData>(endpoint).then((res) => {
    return {
      ...res.data.data,
      memberId: id,
    };
  });
};

export type UpdateMyInfoApiData = ApiSuccessResponse<UserInfo>;
export interface UpdateMyInfoParams {
  nickname: string;
  ssafyMember: boolean;
  isMajor: boolean;
  year: number | undefined;
  campus: string | undefined;
}

export interface UpdateMyInfoBody {
  nickname: string;
  ssafyMember: boolean;
  isMajor: boolean;
  campus: string | undefined;
  semester: number | undefined;
}

export const updateMyInfo = (params: UpdateMyInfoParams) => {
  const endpoint = endpoints.user.myInfo();
  const { year, ...restParams } = params;

  const body: UpdateMyInfoBody = {
    ...restParams,
    semester: year,
  };

  return privateAxios
    .put<UpdateMyInfoApiData>(endpoint, body)
    .then((res) => res.data.data);
};

export interface UpdateSsafyBasicInfoParams {
  ssafyMember: boolean;
  year: number | undefined;
  campus: string | undefined;
}

export interface UpdateSsafyBasicInfoBody {
  ssafyMember: boolean;
  semester: number | undefined;
  campus: string | undefined;
}

export const updateSsafyBasicInfo = (params: UpdateSsafyBasicInfoParams) => {
  const endpoint = endpoints.user.ssafyBasicInfo();
  const { year, ...restParams } = params;
  const body: UpdateSsafyBasicInfoBody = {
    semester: year,
    ...restParams,
  };

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};

export interface UpdateIsMajorParams {
  isMajor: boolean;
}

export interface UpdateIsMajorBody {
  isMajor: boolean;
}

export const updateIsMajor = (params: UpdateIsMajorParams) => {
  const endpoint = endpoints.user.isMajor();
  const body: UpdateIsMajorBody = params;

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};

export interface UpdateTrackParams {
  track: string;
}

export interface UpdateTrackBody {
  majorTrack: string;
}

export const updateTrack = (params: UpdateTrackParams) => {
  const endpoint = endpoints.user.track();
  const { track } = params;
  const body: UpdateTrackBody = {
    majorTrack: track,
  };

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};

export interface UpdateNicknameParams {
  nickname: string;
}

export interface UpdateNicknameBody {
  nickname: string;
}

export const updateNickname = (params: UpdateNicknameParams) => {
  const endpoint = endpoints.user.nickname();
  const body: UpdateNicknameBody = params;

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};

export interface ValidateNicknameParams {
  nickname: string;
}

export interface ValidateNicknameBody {
  nickname: string;
}

export type ValidateNicknameApiData = ApiSuccessResponse<{
  possible: boolean;
}>;

export const validateNickname = (params: ValidateNicknameParams) => {
  const endpoint = endpoints.user.nickname();
  const body: ValidateNicknameBody = params;

  return privateAxios
    .post<ValidateNicknameApiData>(endpoint, body)
    .then((res) => res.data.data.possible);
};

export interface CertifyStudentParams {
  track: SsafyTrack;
  year: number;
  answer: string;
}

export interface CertifyStudentBody {
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
  const { year, answer, track } = params;

  const body: CertifyStudentBody = {
    answer,
    semester: year,
    majorTrack: track,
  };

  return privateAxios
    .post<CertifyStudentApiData>(endpoint, body)
    .then((res) => res.data.data);
};

export type GetProfileVisibilityApiData = ApiSuccessResponse<ProfileVisibility>;

export const getProfileVisibility = () => {
  const endpoint = endpoints.user.profileVisibility();

  return privateAxios
    .get<GetProfileVisibilityApiData>(endpoint)
    .then((res) => res.data.data);
};

export type GetUserProfileVisibilityApiData =
  ApiSuccessResponse<ProfileVisibility>;

export const getUserProfileVisibility = (id: number) => {
  const endpoint = endpoints.user.userProfileVisibility(id);
  return publicAxios
    .get<GetUserProfileVisibilityApiData>(endpoint)
    .then((res) => res.data.data);
};

export interface UpdateProfileVisibilityParams {
  isPublic: boolean;
}

export interface UpdateProfileVisibilityBody {
  isPublic: boolean;
}

export const updateProfileVisibility = (
  params: UpdateProfileVisibilityParams
) => {
  const endpoint = endpoints.user.profileVisibility();
  const body: UpdateProfileVisibilityBody = params;

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};

// 포트폴리오

export type GetUserPortfolioApiData = ApiSuccessResponse<{
  portfolioElement: UserPortfolio;
}>;
export const getUserPortfolio = (id: number) => {
  const endpoint = endpoints.user.portfolio(id);

  return privateAxios
    .get<GetUserPortfolioApiData>(endpoint)
    .then((res) => res.data.data.portfolioElement);
};

export type GetMyPortfolioApiData = ApiSuccessResponse<{
  portfolioElement: UserPortfolio;
}>;
export const getMyPortfolio = () => {
  const endpoint = endpoints.user.myPortfolio();

  return privateAxios
    .get<GetMyPortfolioApiData>(endpoint)
    .then((res) => res.data.data.portfolioElement);
};

export interface UpdateMyPortfolioParams extends UserPortfolio {}

export type UpdateMyPortfolioBody = UpdateMyPortfolioParams;

export const updateMyPortfolio = (params: UpdateMyPortfolioParams) => {
  const endpoint = endpoints.user.myPortfolio();
  const body: UpdateMyPortfolioBody = params;

  return privateAxios.put(endpoint, body).then((res) => res.data);
};
