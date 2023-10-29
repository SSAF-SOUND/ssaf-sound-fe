import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  RevalidatePageBody,
  RevalidatePageParamsApiData,
} from '~/services/admin/apis/revalidatePage';

import { REVALIDATE_PAGE_TOKEN } from '~/utils/constants';

const createResponse = (revalidated: boolean, message: string) => ({
  revalidated,
  message,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RevalidatePageParamsApiData>
) {
  if (req.method === 'POST') {
    const { path, token } = req.body as RevalidatePageBody;

    if (token !== REVALIDATE_PAGE_TOKEN) {
      return res.status(401).json(createResponse(false, 'Invalid token'));
    }

    try {
      await res.revalidate(path);
      return res.json(
        createResponse(true, `Revalidation of page: ${path} was successful`)
      );
    } catch (err) {
      return res
        .status(500)
        .json(createResponse(false, `Failed to revalidate the page: ${path}`));
    }
  }

  return res.status(404).json(createResponse(false, 'Invalid http method'));
}
