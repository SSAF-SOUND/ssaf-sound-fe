import type {
  GetCampusesApiData,
  GetRecruitTypesApiData,
} from '~/services/meta';

import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { initialCampuses, initialRecruitType } from '~/services/meta';
import { API_URL, composeUrls } from '~/utils';

export const getCampuses = restSuccess<GetCampusesApiData['data']>(
  'get',
  composeUrls(API_URL, endpoints.meta.campuses()),
  {
    data: initialCampuses,
  }
);

export const getRecruitTypes = restSuccess<GetRecruitTypesApiData['data']>(
  'get',
  composeUrls(API_URL, endpoints.meta.recruitTypes()),
  {
    data: initialRecruitType,
  }
);

export const metaHandlers = [getCampuses, getRecruitTypes];
