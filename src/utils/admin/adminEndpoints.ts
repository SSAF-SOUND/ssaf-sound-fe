import { composeUrls } from '~/utils/misc';

export const adminEndpoints = {
  revalidatePage: (pagePath: string) => composeUrls('api', pagePath),
};
