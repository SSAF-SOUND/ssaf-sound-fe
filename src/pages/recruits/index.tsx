import type { GetServerSideProps } from 'next';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';
import type { GetRecruitsParams } from '~/services/recruit';
import type { RecruitsPageQueryStringObject } from '~/utils';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';

import { Tabs } from '~/components/Common';
import { Scroll, scrollbarSize } from '~/components/Common/Scroll';
import SearchBarForm from '~/components/Forms/SearchBarForm';
import NavigationGroup from '~/components/NavigationGroup';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import {
  minSearchKeywordLength,
  validateSearchKeyword,
} from '~/services/common/utils/searchBar';
import {
  getRecruits,
  RecruitCategoryName,
  RecruitCategoryNameSet,
  RecruitPartsSet,
  SkillNameSet,
} from '~/services/recruit';
import {
  flex,
  pageMaxWidth,
  pageMinHeight,
  pageMinWidth,
  palettes,
  Theme,
  titleBarHeight,
} from '~/styles/utils';
import { customToast, routes, stringToBoolean } from '~/utils';

// /recruits
// ? category = project | study
// & skills = React
// & skills = Vue
// & recruitParts = 프론트엔드
// & recruitParts = 백엔드
// & keyword = ABC
const RecruitsPage = () => {
  return (
    <>
      <div css={selfCss}>
        <NavigationGroup />

        <SearchBar />

        <RecruitCategoryTabs />

        <div
          css={[
            { marginBottom: 20 },
            flex('center', 'space-between', 'row', 24),
            { height: 50, background: 'green' },
          ]}
        >
          <div css={flex('center', 'flex-start', 'row', 24)}>
            <div>필터 도구</div>
            <div>필터 도구</div>
          </div>
          <div>글 작성 버튼</div>
        </div>

        <RecruitLayer />
      </div>
    </>
  );
};
const Card = () => {
  return (
    <div
      css={{ border: '1px solid white', height: 140, background: 'darkorange' }}
    >
      카드
    </div>
  );
};

export default RecruitsPage;

const selfMinHeight = `max(${pageMinHeight}px, 100vh)`;
const selfCss = css({
  padding: `${titleBarHeight}px 0`,
  minHeight: selfMinHeight,
});
const searchBarContainerHeight = 72;

const SearchBar = () => {
  const router = useRouter();
  const { keyword: queryKeyword } = router.query as Partial<Params>;
  const isValidKeyword = validateSearchKeyword(queryKeyword);
  const defaultKeyword = isValidKeyword ? queryKeyword : '';

  const onValidSubmit: SearchBarFormProps['onValidSubmit'] = async (
    reset,
    formValues
  ) => {
    const { keyword } = formValues;
    if (keyword === queryKeyword) {
      return;
    }
    reset({ keyword });
    router.push({ query: { ...router.query, keyword } });
  };

  const onInvalidSubmit: SearchBarFormProps['onInvalidSubmit'] = (
    errorMessage
  ) => {
    if (errorMessage) {
      customToast.clientError(errorMessage);
    }
  };

  return (
    <SearchBarForm
      css={searchBarContainerCss}
      onValidSubmit={onValidSubmit}
      onInvalidSubmit={onInvalidSubmit}
      defaultValues={{ keyword: defaultKeyword }}
      options={{ allowEmptyString: true }}
    />
  );
};

const searchBarContainerCss = css(
  {
    width: '100%',
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    height: searchBarContainerHeight,
    backgroundColor: palettes.background.default,
  },
  flex('', 'center')
);

const RecruitCategoryTabs = () => {
  const router = useRouter();
  const query = router.query as Partial<Params>;

  const { category: unsafeCategory } = query;
  const safeCategory = RecruitCategoryNameSet.has(unsafeCategory as string)
    ? unsafeCategory
    : RecruitCategoryName.PROJECT;

  return (
    <Tabs.Root value={safeCategory}>
      <Tabs.List>
        <Tabs.TriggerWithLink
          value={RecruitCategoryName.PROJECT}
          theme={Theme.PRIMARY}
          href={routes.recruit.list({
            ...router.query,
            category: RecruitCategoryName.PROJECT,
          })}
        >
          프로젝트
        </Tabs.TriggerWithLink>
        <Tabs.TriggerWithLink
          value={RecruitCategoryName.STUDY}
          theme={Theme.SECONDARY}
          href={routes.recruit.list({
            ...router.query,
            category: RecruitCategoryName.STUDY,
          })}
        >
          스터디
        </Tabs.TriggerWithLink>
      </Tabs.List>
    </Tabs.Root>
  );
};

const RecruitLayer = (props: { className?: string }) => {
  const { className } = props;
  return (
    <Scroll.Root
      css={{ height: 400, margin: `0 -${scrollbarSize}px` }}
      className={className}
    >
      <Scroll.Viewport>
        <div
          css={[
            flex('', '', 'column', 12),
            {
              padding: `0 ${scrollbarSize}px`,
            },
          ]}
        >
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </Scroll.Viewport>

      <Scroll.Bar orientation="vertical">
        <Scroll.Thumb />
      </Scroll.Bar>
    </Scroll.Root>
  );
};

interface Props {}
type Params = RecruitsPageQueryStringObject;

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const apiParams = toGetRecruitsParams(context.query);
  const queryClient = new QueryClient();
  const recruitListQueryKey = JSON.parse(
    JSON.stringify(queryKeys.recruit.list(apiParams))
  );

  await queryClient.prefetchInfiniteQuery({
    queryKey: recruitListQueryKey,
    queryFn: () => getRecruits(apiParams),
  });

  const { dehydratedState } = dehydrate(queryClient);
  dehydratedState.queries.forEach((query) => {
    // https://github.com/TanStack/query/issues/1458#issuecomment-1022396964
    // eslint-disable-next-line
    // @ts-ignore
    if ('pageParams' in query.state.data) {
      query.state.data.pageParams = [null];
    }
  });

  return {
    props: {
      dehydratedState,
    },
  };
};

/**
 * - category -> 유효하지 않으면 project
 * - completed -> 유효하지 않으면 false
 * - keyword -> 유효하지 않으면 ''
 * - recruitParts -> 유효한 필드로만 필터링
 *   - 값이 1개일 때는 string -> [string] 으로
 * - skills -> 유효한 필드로만 필터링
 *   - 값이 1개일 때는 string -> [string] 으로
 * @param params
 */
const toGetRecruitsParams = (params: Partial<Params>): GetRecruitsParams => {
  const { category, completed, skills, recruitParts, keyword } = params;

  const safeCategory =
    !category || !RecruitCategoryNameSet.has(category)
      ? RecruitCategoryName.PROJECT
      : category;

  const unsafeSkills = typeof skills === 'string' ? [skills] : skills;
  const safeSkills = unsafeSkills?.filter((skill) => SkillNameSet.has(skill));

  const unsafeRecruitParts =
    typeof recruitParts === 'string' ? [recruitParts] : recruitParts;
  const safeRecruitParts = unsafeRecruitParts?.filter((recruitPart) =>
    RecruitPartsSet.has(recruitPart)
  );

  const safeCompleted = stringToBoolean(completed ?? '');

  const safeKeyword =
    keyword && keyword.length > minSearchKeywordLength ? keyword : '';

  return {
    category: safeCategory,
    completed: safeCompleted,
    keyword: safeKeyword,
    skills: safeSkills,
    recruitParts: safeRecruitParts,
  };
};
