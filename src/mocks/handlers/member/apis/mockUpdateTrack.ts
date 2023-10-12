import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls } from '~/utils';

const updateTrackMethod = 'patch';
const updateTrackEndpoint = composeUrls(API_URL, endpoints.user.track());

export const mockUpdateTrack = restSuccess(
  updateTrackMethod,
  updateTrackEndpoint,
  { data: null }
);

export const mockUpdateTrackError = restError(
  updateTrackMethod,
  updateTrackEndpoint,
  {
    message: 'mockUpdateTrack Error',
  }
);
