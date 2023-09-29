import type { LikeRecruitApplicationApiData } from '~/services/recruit';

import { rest } from 'msw';

import { mockSuccess, restError } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const likeRecruitApplicationMethod = 'post';
const likeRecruitApplicationEndpoint = composeUrls(
  API_URL,
  // eslint-disable-next-line
  // @ts-ignore
  endpoints.recruit.application.like(':recruitApplicationId')
);

let liked = false;
const toggleLike = () => {
  liked = !liked;
  return liked;
};
export const mockLikeRecruitApplication = rest.post(
  likeRecruitApplicationEndpoint,
  (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ...mockSuccess<LikeRecruitApplicationApiData['data']>(ctx, {
        liked: toggleLike(),
      })
    );
  }
);

export const mockLikeRecruitApplicationError = restError(
  likeRecruitApplicationMethod,
  likeRecruitApplicationEndpoint,
  {
    message: 'mockLikeRecruitApplication Error',
  }
);
