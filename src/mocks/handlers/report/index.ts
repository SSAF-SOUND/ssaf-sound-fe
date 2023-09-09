import { restError, restSuccess } from '~/mocks/utils';
import { endpoints } from '~/react-query/common';
import { API_URL, composeUrls, removeQueryParams } from '~/utils';

const reportEndpoint = composeUrls(
  API_URL,
  removeQueryParams(endpoints.report())
);

export const report = restSuccess('post', reportEndpoint, {
  data: null,
});

export const reportError = restError('post', reportEndpoint, {
  message: '신고 실패',
});

export const reportHandlers = [reportError];
