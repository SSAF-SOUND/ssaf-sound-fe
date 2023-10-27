import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { css } from '@emotion/react';

import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { Tabs } from '~/components/Common/Tabs';
import { Footer } from '~/components/Footer';
import NavigationGroup from '~/components/NavigationGroup';
import { TermsDetail } from '~/components/TermsDetail';
import { queryKeys } from '~/react-query/common';
import { prefetch } from '~/react-query/server';
import { getTermsOfService } from '~/services/meta';
import { useTermsOfService } from '~/services/meta/hooks/useTermsOfService';
import { fontCss, gnbHeight, pageCss, titleBarHeight } from '~/styles/utils';
import { routes } from '~/utils';

const LegalPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { termId } = props;
  const { data } = useTermsOfService();

  const tabValue = data?.every((term) => String(term.termId) !== termId)
    ? String(data?.[0]?.termId)
    : termId;

  return (
    <>
      <main css={selfCss}>
        <NavigationGroup />

        <h2 css={[fontCss.style.B28, { marginBottom: 40 }]}>LEGAL</h2>

        {data ? (
          <Tabs.Root value={tabValue}>
            <Tabs.List css={{ flexWrap: 'wrap', gap: 12 }}>
              <Tabs.Border css={{ width: '150%', left: '-25%' }} />
              {data.map(({ termName, termId }) => (
                <Tabs.TriggerWithLink
                  href={routes.legal(termId)}
                  variant="fit"
                  key={termId}
                  value={String(termId)}
                  css={fontCss.style.B14}
                >
                  {termName}
                </Tabs.TriggerWithLink>
              ))}
            </Tabs.List>

            {data.map(({ termId, content }) => (
              <Tabs.Content value={String(termId)} key={termId}>
                <TermsDetail html={content} />
              </Tabs.Content>
            ))}
          </Tabs.Root>
        ) : (
          <FullPageLoader />
        )}
      </main>

      <Footer />
    </>
  );
};

export default LegalPage;

const selfCss = css(
  {
    padding: `${titleBarHeight + 30}px 0 ${gnbHeight}px`,
  },
  pageCss.minHeight
);

export const enum ParamsKey {
  TERM_ID = 'termId',
}

export type Props = Pick<Params, ParamsKey.TERM_ID>;

export type Params = {
  [ParamsKey.TERM_ID]?: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const termId = context.params?.termId;

  const dehydrate = prefetch({
    queryKey: queryKeys.meta.termsOfService(),
    queryFn: getTermsOfService,
  });

  const { dehydratedState } = await dehydrate();

  return {
    props: {
      dehydratedState,
      termId,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const termsOfService = await getTermsOfService();
  const paths = termsOfService.map(({ termId }) => {
    return {
      params: {
        termId: String(termId),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
