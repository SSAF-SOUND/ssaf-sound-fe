import type {
  CertifyStudentApiData,
  GetMyInfoApiData,
  GetMyPortfolioApiData,
  GetProfileVisibilityApiData,
  GetUserInfoApiData,
  GetUserPortfolioApiData,
  UpdateMyInfoParams,
  UserInfo,
} from '~/services/member';
import type { ApiErrorResponse } from '~/types';

import { rest } from 'msw';

import { userInfo, portfolio } from '~/mocks/handlers/member/data';
import { mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { CertificationState } from '~/services/member';
import { API_URL, composeUrls, ResponseCode } from '~/utils';

export const getMyInfo = restSuccess<GetMyInfoApiData['data']>(
  'get',
  composeUrls(API_URL, endpoints.user.myInfo()),
  {
    // data: userInfo.initialUserInfo,
    data: userInfo.certifiedSsafyUserInfo,
    // data: userInfo.uncertifiedSsafyUserInfo,
    // data: userInfo.nonSsafyUserInfo,
  }
);

export const getUserInfo = restSuccess<GetUserInfoApiData['data']>(
  'get',
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.user.userInfo(':id')),
  {
    // data: userInfo.initialUserInfo,
    data: userInfo.certifiedSsafyUserInfo,
    // data: userInfo.uncertifiedSsafyUserInfo,
    // data: userInfo.nonSsafyUserInfo,
  }
);

export const getUserInfoError = restError(
  'get',
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.user.userInfo(':id')),
  {
    data: null,
  }
);

export const updateMyInfo = rest.put<
  never,
  never,
  GetMyInfoApiData | ApiErrorResponse
>(composeUrls(API_URL, endpoints.user.myInfo()), async (req, res, ctx) => {
  const body = (await req.json()) as UpdateMyInfoParams;

  const restInfo = body.ssafyMember
    ? ({
        ssafyMember: true,
        ssafyInfo: {
          campus: body.campus as string,
          semester: body.semester as number,
          certificationState: CertificationState.UNCERTIFIED,
          majorTrack: null,
        },
      } as const)
    : ({ ssafyMember: false } as const);

  const response: UserInfo = {
    memberId: 973,
    memberRole: 'user',
    nickname: body.nickname,
    isMajor: body.isMajor,
    ...restInfo,
  };

  return res(
    ctx.delay(500),
    ...mockSuccess(ctx, response)
    // ...mockError(ctx, '400', '오류가 발생했습니다.')
  );
});

export const validateNickname = restSuccess(
  'post',
  composeUrls(API_URL, endpoints.user.nickname()),
  { data: null }
);

export const validateNicknameError = restError(
  'post',
  composeUrls(API_URL, endpoints.user.nickname()),
  {
    message: '닉네임이 중복됩니다',
  }
);

export const updateNickname = restSuccess(
  'patch',
  composeUrls(API_URL, endpoints.user.nickname())
);

export const updateNicknameError = restError(
  'patch',
  composeUrls(API_URL, endpoints.user.nickname()),
  {
    message: '유효하지 않은 닉네임입니다.',
  }
);

export const updateIsMajor = restSuccess(
  'patch',
  composeUrls(API_URL, endpoints.user.isMajor())
);

export const updateIsMajorError = restError(
  'patch',
  composeUrls(API_URL, endpoints.user.isMajor()),
  {
    message: '오류가 발생했습니다.',
  }
);

export const updateSsafyBasicInfo = restSuccess(
  'patch',
  composeUrls(API_URL, endpoints.user.ssafyBasicInfo())
);

export const updateSsafyBasicInfoError = restError(
  'patch',
  composeUrls(API_URL, endpoints.user.ssafyBasicInfo()),
  {
    message: '오류가 발생했습니다.',
  }
);

export const updateTrack = restSuccess(
  'patch',
  composeUrls(API_URL, endpoints.user.track())
);

export const updateTrackError = restError(
  'patch',
  composeUrls(API_URL, endpoints.user.track())
);

export const certifyStudent = restSuccess<CertifyStudentApiData['data']>(
  'post',
  composeUrls(API_URL, endpoints.user.studentCertification()),
  {
    data: {
      certificationInquiryCount: 2,
      possible: true,
    },
  }
);

export const certifyStudentIncorrectError = restSuccess<
  CertifyStudentApiData['data']
>('post', composeUrls(API_URL, endpoints.user.studentCertification()), {
  data: {
    certificationInquiryCount: 2,
    possible: false,
  },
});

export const certifyStudentAttemptsCountError = restError(
  'post',
  composeUrls(API_URL, endpoints.user.studentCertification()),
  {
    code: ResponseCode.EXCEEDED_ATTEMPTS_OF_STUDENT_CERTIFICATION,
    message:
      '인증 시도 가능 횟수를 초과하여 일정 시간이 자나야 재시도 할 수 있습니다.',
  }
);

export const getProfileVisibility = restSuccess<
  GetProfileVisibilityApiData['data']
>('get', composeUrls(API_URL, endpoints.user.profileVisibility()), {
  data: {
    isPublic: true,
    // isPublic: false,
  },
});

export const getUserProfileVisibility = restSuccess(
  'get',
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.user.userProfileVisibility(':id')),
  {
    data: {
      isPublic: true,
      // isPublic: false,
    },
  }
);

export const updateProfileVisibility = restSuccess(
  'patch',
  composeUrls(API_URL, endpoints.user.profileVisibility()),
  { data: null }
);

export const updateProfileVisibilityError = restError(
  'patch',
  composeUrls(API_URL, endpoints.user.profileVisibility()),
  { message: '에러가 발생했습니다' }
);

export const getUserPortfolio = restSuccess<GetUserPortfolioApiData['data']>(
  'get',
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.user.portfolio(':id')),
  {
    data: {
      portfolio,
    },
  }
);

export const getMyPortfolio = restSuccess<GetMyPortfolioApiData['data']>(
  'get',
  composeUrls(API_URL, endpoints.user.myPortfolio()),
  {
    data: {
      portfolio,
    },
  }
);

export const updateMyPortfolio = restSuccess(
  'put',
  composeUrls(API_URL, endpoints.user.myPortfolio()),
  {
    data: null,
  }
);

export const updateMyPortfolioError = restError(
  'put',
  composeUrls(API_URL, endpoints.user.myPortfolio()),
  {
    message: '오류가 발생했습니다.',
  }
);

export const memberHandlers = [
  getMyInfo,
  updateMyInfo,
  validateNickname,
  certifyStudent,
  updateNickname,
  updateIsMajor,
  updateSsafyBasicInfo,
  updateTrack,
  getProfileVisibility,
  getUserProfileVisibility,
  updateProfileVisibility,
  getUserPortfolio,
  getMyPortfolio,
  getUserInfo,
  updateMyPortfolio,
  // updateMyPortfolioError,
];
