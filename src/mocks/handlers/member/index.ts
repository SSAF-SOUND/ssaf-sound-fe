import type {
  CertifyStudentApiData,
  GetMyInfoApiData,
  UpdateMyInfoParams,
  UserInfo,
  UserPortfolio,
} from '~/services/member';
import type { ApiErrorResponse } from '~/types';

import { rest } from 'msw';

import { userInfo, userPortfolio } from '~/mocks/handlers/member/data';
import { mockSuccess, restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { CertificationState } from '~/services/member';
import { API_URL, composeUrls, ResponseCode } from '~/utils';

const getMyInfo = rest.get<never, never, GetMyInfoApiData | ApiErrorResponse>(
  composeUrls(API_URL, endpoints.user.myInfo()),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      // ...mockSuccess<UserInfo>(ctx, userInfo.initialUserInfo)
      ...mockSuccess<UserInfo>(ctx, userInfo.certifiedSsafyUserInfo)
      // ...mockSuccess<UserInfo>(ctx, userInfo.uncertifiedSsafyUserInfo)
      // ...mockSuccess<UserInfo>(ctx, userInfo.nonSsafyUserInfo)
      // ...mockError(ctx, 'code', 'message', 404),
    );
  }
);

const updateMyInfo = rest.put<
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

const validateNickname = rest.post(
  composeUrls(API_URL, endpoints.user.nickname()),
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess(ctx, {})
      // ...mockError(ctx, '400', '닉네임이 중복됩니다.'),
      // ...mockError(ctx, '400', '닉네임의 길이는 1 ~ 11 사이여야 합니다..')
    );
  }
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

export const updatePortfolioVisibility = restSuccess(
  'patch',
  composeUrls(API_URL, endpoints.user.portfolioVisibility()),
  {
    data: null,
  }
);

export const updatePortfolioVisibilityError = restError(
  'patch',
  composeUrls(API_URL, endpoints.user.portfolioVisibility()),
  {
    message: '에러가 발생했습니다',
  }
);

export const getPortfolio = restSuccess<UserPortfolio>(
  'get',
  // eslint-disable-next-line
  // @ts-ignore
  composeUrls(API_URL, endpoints.user.portfolio(':id')),
  {
    data: userPortfolio.publicPortfolio,
    // data: userPortfolio.privatePortfolio,
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
  updatePortfolioVisibility,
  getPortfolio,
];
