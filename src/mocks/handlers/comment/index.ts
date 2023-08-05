import type { GetCommentsApiData } from '~/services/comment';

import { commentDetails } from '~/mocks/handlers/comment/data';
import { restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

export const getComments = restSuccess<GetCommentsApiData['data']>(
  'get',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  removeQueryParams(composeUrls(API_URL, endpoints.comments.list(1))),
  {
    data: {
      comments: commentDetails,
    },
  }
);

export const commentHandlers = [getComments];
