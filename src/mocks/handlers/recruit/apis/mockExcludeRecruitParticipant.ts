import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const excludeRecruitParticipantMethod = 'delete';
const excludeRecruitParticipantEndpoint = composeUrls(
  API_URL,
  endpoints.recruit.participant(
    // eslint-disable-next-line
    // @ts-ignore
    { recruitId: ':recruitId', recruitApplicationId: ':recruitApplicationId' }
  )
);

export const mockExcludeRecruitParticipant = restSuccess(
  excludeRecruitParticipantMethod,
  excludeRecruitParticipantEndpoint,
  {
    data: null,
  }
);

export const mockExcludeRecruitParticipantError = restError(
  excludeRecruitParticipantMethod,
  excludeRecruitParticipantEndpoint,
  {
    message: 'mockExcludeRecruitParticipant Error',
  }
);
