import type {
  CertifyStudentApiData,
  GetMyInfoApiData,
  UpdateMyInfoParams,
  UserInfo,
} from '~/services/member';
import type { ApiErrorResponse } from '~/types';

import { rest } from 'msw';

import { userInfo } from '~/mocks/handlers/member/data';
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
      // ...mockSuccess<UserInfo>(ctx, userInfo.certifiedSsafyUserInfo)
      // ...mockSuccess<UserInfo>(ctx, userInfo.uncertifiedSsafyUserInfo)
      ...mockSuccess<UserInfo>(ctx, userInfo.nonSsafyUserInfo)
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

export const memberHandlers = [
  getMyInfo,
  updateMyInfo,
  validateNickname,
  certifyStudent,
];
