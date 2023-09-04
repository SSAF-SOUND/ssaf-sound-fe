import type { ReportDomain } from '~/services/report/utils';

import { endpoints } from '~/react-query/common';
import { privateAxios } from '~/utils';

interface ReportParams {
  domain: ReportDomain;
  sourceId: number;
  reasonId: number;
}

interface ReportBody {
  sourceType: ReportDomain;
  sourceId: number;
  reasonId: number;
}

export const report = (params: ReportParams) => {
  const endpoint = endpoints.report();
  const { domain, ...restParams } = params;
  const body: ReportBody = {
    ...restParams,
    sourceType: domain,
  };

  return privateAxios.post(endpoint, body).then((res) => res.data);
};
