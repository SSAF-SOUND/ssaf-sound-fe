import type { GetRecruitParticipantsApiData } from '~/services/recruit';

import {
  createMockRecruitDetail,
  createMockRecruitParticipants,
} from '~/mocks/handlers/recruit/data';
import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const getRecruitParticipantsMethod = 'get';
const getRecruitParticipantsEndpoint =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  composeUrls(API_URL, endpoints.recruit.participants(':recruitId'));

export const createMockGetRecruitParticipants = (
  recruitParticipants: GetRecruitParticipantsApiData['data']['recruitTypes']
) => {
  return restSuccess<GetRecruitParticipantsApiData['data']>(
    getRecruitParticipantsMethod,
    getRecruitParticipantsEndpoint,
    {
      data: {
        recruitTypes: recruitParticipants,
      },
    }
  );
};
const mockRecruitDetail = createMockRecruitDetail(1, false);
export const mockGetRecruitParticipants = createMockGetRecruitParticipants(
  createMockRecruitParticipants(mockRecruitDetail)
);

export const mockGetRecruitParticipantsError = restError(
  getRecruitParticipantsMethod,
  getRecruitParticipantsEndpoint,
  {
    message: 'mockGetRecruitParticipants Error',
  }
);
