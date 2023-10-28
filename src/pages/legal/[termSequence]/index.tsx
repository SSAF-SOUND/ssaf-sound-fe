import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { css } from '@emotion/react';

import { FullPageLoader } from '~/components/Common/FullPageLoader';
import { PageHead } from '~/components/Common/PageHead';
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
import { stripHtmlTags } from '~/utils/stripHtmlTags';

const LegalPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { termSequence } = props;
  const { data } = useTermsOfService();

  const selectedSequence = data?.every(
    (term) => String(term.sequence) !== termSequence
  )
    ? String(data?.[0]?.sequence)
    : termSequence;

  const selectedTerm = data?.find(
    ({ sequence }) => String(sequence) === selectedSequence
  );

  return (
    <>
      <PageHead
        title={selectedTerm?.termName}
        description={stripHtmlTags(selectedTerm?.content.slice(0, 400) ?? '')}
        openGraph={{
          url: routes.legal(Number(selectedSequence)),
        }}
      />가

      <main css={selfCss}>
        <NavigationGroup />

        <h2 css={[fontCss.style.B28, { marginBottom: 40 }]}>LEGAL</h2>

        {data ? (
          <Tabs.Root value={selectedSequence}>
            <Tabs.List css={{ flexWrap: 'wrap', gap: 12 }}>
              <Tabs.Border css={{ width: '150%', left: '-25%' }} />
              {data.map(({ termName, termId, sequence }) => (
                <Tabs.TriggerWithLink
                  href={routes.legal(sequence)}
                  variant="fit"
                  key={termId}
                  value={String(sequence)}
                  css={fontCss.style.B14}
                >
                  {termName}
                </Tabs.TriggerWithLink>
              ))}
            </Tabs.List>

            {data.map(({ termId, sequence, content }) => (
              <Tabs.Content value={String(sequence)} key={termId}>
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
  TERM_SEQUENCE = 'termSequence',
}

export type Props = Pick<Params, ParamsKey.TERM_SEQUENCE>;

export type Params = {
  [ParamsKey.TERM_SEQUENCE]?: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const termSequence = context.params?.[ParamsKey.TERM_SEQUENCE];

  const dehydrate = prefetch({
    queryKey: queryKeys.meta.termsOfService(),
    queryFn: getTermsOfService,
  });

  const { dehydratedState } = await dehydrate();

  return {
    props: {
      dehydratedState,
      termSequence,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const termsOfService = await getTermsOfService();
  const paths = termsOfService.map(({ sequence }) => {
    return {
      params: {
        termSequence: String(sequence),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
