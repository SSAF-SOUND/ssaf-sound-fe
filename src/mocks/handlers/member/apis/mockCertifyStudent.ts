import type { CertifyStudentApiData } from '~/services/member';

import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, ResponseCode } from '~/utils';

const mockCertifyStudentMethod = 'post';
const mockCertifyStudentEndpoint = composeUrls(
  API_URL,
  endpoints.user.studentCertification()
);

export const createMockCertifyStudent = (correct: boolean) => {
  return restSuccess<CertifyStudentApiData['data']>(
    mockCertifyStudentMethod,
    mockCertifyStudentEndpoint,
    {
      data: {
        certificationInquiryCount: 2,
        possible: correct,
      },
    }
  );
};

export const mockCertifyStudent = createMockCertifyStudent(true);

export const mockCertifyStudentExceedAttemptCountError = restError(
  mockCertifyStudentMethod,
  mockCertifyStudentEndpoint,
  {
    code: ResponseCode.EXCEEDED_ATTEMPTS_OF_STUDENT_CERTIFICATION,
    message: '인증 시도 가능 횟수 초과',
  }
);
