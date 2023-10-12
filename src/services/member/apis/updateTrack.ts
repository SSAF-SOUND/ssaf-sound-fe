import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils/axios';

export interface UpdateTrackParams {
  track: string;
}

export interface UpdateTrackBody {
  majorTrack: string;
}

export const updateTrack = (params: UpdateTrackParams) => {
  const endpoint = endpoints.user.track();
  const { track } = params;
  const body: UpdateTrackBody = {
    majorTrack: track,
  };

  return privateAxios.patch(endpoint, body).then((res) => res.data);
};
