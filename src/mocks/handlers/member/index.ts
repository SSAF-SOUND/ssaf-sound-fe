import { mockCertifyStudent } from '~/mocks/handlers/member/apis/mockCertifyStudent';
import { mockGetCertifiedSsafyMyInfo } from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockGetProfileVisibility } from '~/mocks/handlers/member/apis/mockGetProfileVisibility';
import { mockGetCertifiedUserInfo } from '~/mocks/handlers/member/apis/mockGetUserInfo';
import { mockGetUserPortfolio } from '~/mocks/handlers/member/apis/mockGetUserPortfolio';
import { mockGetUserProfileVisibility } from '~/mocks/handlers/member/apis/mockGetUserProfileVisibility';
import { mockUpdateIsMajor } from '~/mocks/handlers/member/apis/mockUpdateIsMajor';
import { mockUpdateMyInfo } from '~/mocks/handlers/member/apis/mockUpdateMyInfo';
import { mockUpdateMyPortfolio } from '~/mocks/handlers/member/apis/mockUpdateMyPortfolio';
import { mockUpdateNickname } from '~/mocks/handlers/member/apis/mockUpdateNickname';
import { mockUpdateProfileVisibility } from '~/mocks/handlers/member/apis/mockUpdateProfileVisibility';
import { mockUpdateSsafyBasicInfo } from '~/mocks/handlers/member/apis/mockUpdateSsafyBasicInfo';
import { mockUpdateTrack } from '~/mocks/handlers/member/apis/mockUpdateTrack';
import { mockValidateNickname } from '~/mocks/handlers/member/apis/mockValidateNickname';

export const memberHandlers = [
  mockGetCertifiedSsafyMyInfo,
  mockValidateNickname,
  mockUpdateMyInfo,
  mockCertifyStudent,

  mockUpdateNickname,
  mockUpdateIsMajor,
  mockUpdateSsafyBasicInfo,
  mockUpdateTrack,
  mockGetProfileVisibility,
  mockGetUserProfileVisibility,
  mockUpdateProfileVisibility,
  mockGetUserPortfolio,
  mockGetUserPortfolio,
  mockGetCertifiedUserInfo,
  mockUpdateMyPortfolio,
  // updateMyPortfolioError,
];
