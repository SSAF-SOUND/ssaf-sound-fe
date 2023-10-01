import type { GetCampusesApiData } from '~/services/meta';

import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { initialCampuses } from '~/services/meta/utils';
import { API_URL, composeUrls } from '~/utils';

export const getCampuses = restSuccess<GetCampusesApiData['data']>(
  'get',
  composeUrls(API_URL, endpoints.meta.campuses()),
  {
    data: initialCampuses,
  }
);

export const metaHandlers = [getCampuses];
