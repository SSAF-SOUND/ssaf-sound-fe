import Head from 'next/head';

import { globalMetaData } from '~/utils/metadata';
import { composeUrls } from '~/utils/misc';

interface MetaRobots {
  index: boolean;
  follow: boolean;
}

interface MetaOpenGraph {
  title: string;
  description: string;
  type: string;
  url: string;
  image: string;
}

interface PageHeadOptions {
  formatTitle: (title: string) => string;
}

export interface PageHeadProps {
  title?: string;
  description?: string;
  robots?: Partial<MetaRobots>;
  openGraph?: Partial<MetaOpenGraph>;
  options?: Partial<PageHeadOptions>;
}

const createMetaRobotsContent = (robots: MetaRobots) => {
  const { index, follow } = robots;
  return `${index ? 'index' : 'noindex'}, ${follow ? 'follow' : 'nofollow'}`;
};

const defaultFormatTitle = (title: string) => {
  return `${title} | ${globalMetaData.title}`;
};

export const PageHead = (props: PageHeadProps) => {
  const {
    title = globalMetaData.title,
    description = globalMetaData.description,
    robots: { follow = true, index = true } = {},
    openGraph: {
      title: openGraphTitle = globalMetaData.title,
      description: openGraphDescription = globalMetaData.description,
      image = globalMetaData.imageUrl,
      url = globalMetaData.url,
      type: openGraphType = globalMetaData.pageType,
    } = {},
    options: { formatTitle = defaultFormatTitle } = {},
  } = props;

  const renderMetaRobots = !follow || !index;
  const openGraphUrl =
    url === globalMetaData.url ? url : composeUrls(globalMetaData.url, url);

  return (
    <Head>
      <title>{formatTitle(title)}</title>
      <meta name="description" content={description} />
      {renderMetaRobots && (
        <meta
          name="robots"
          content={createMetaRobotsContent({ index, follow })}
        />
      )}
      <meta property="og:title" content={openGraphTitle} />
      <meta property="og:description" content={openGraphDescription} />
      <meta property="og:type" content={openGraphType} />
      <meta property="og:url" content={openGraphUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={globalMetaData.title} />
      <meta property="og:locale" content={globalMetaData.locale} />
      <meta property="og:image:width" content={globalMetaData.imageWidth} />
      <meta property="og:image:height" content={globalMetaData.imageHeight} />
      <meta name="twitter:card" content="summary_large" />
      <meta name="twitter:title" content={openGraphTitle} />
      <meta name="twitter:description" content={openGraphDescription} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
