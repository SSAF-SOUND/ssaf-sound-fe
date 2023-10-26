import type { NextApiRequest, NextApiResponse } from 'next';

const createResponse = (revalidated: boolean, message: string) => ({
  revalidated,
  message,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { path, token } = req.body as { path: string; token: string };
    if (token !== process.env.REVALIDATE_TOKEN) {
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
