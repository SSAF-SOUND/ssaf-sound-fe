import type { SsafyTrack } from '~/services/member/utils';
import type { ApiSuccessResponse } from '~/types';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

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
