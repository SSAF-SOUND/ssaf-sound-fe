import type { GetServerSideProps } from 'next';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';
import type { GetRecruitsParams } from '~/services/recruit';
import type { RecruitsPageQueryStringObject } from '~/utils';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { CircleButton, Tabs } from '~/components/Common';
import SearchBarForm from '~/components/Forms/SearchBarForm';
import NavigationGroup from '~/components/NavigationGroup';
import { RecruitCardList } from '~/components/Recruit/RecruitCardList';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import {
  minSearchKeywordLength,
  validateSearchKeyword,
} from '~/services/common/utils/searchBar';
import {
  getRecruits,
  getRecruitThemeByCategory,
  RecruitCategoryName,
  RecruitCategoryNameSet,
  RecruitPartsSet,
  SkillNameSet,
  useRecruits,
} from '~/services/recruit';
import {
  fixTopCenter,
  flex,
  gnbHeight,
  navigationGroupPaddingCss,
  pageMinHeight,
  palettes,
  Theme,
  topBarHeight,
} from '~/styles/utils';
import { customToast, routes, stringToBoolean } from '~/utils';

// /recruits
// ? category = project | study
// & skills = React & skills = Vu e & skills = ...
// & recruitParts = 프론트엔드 & recruitParts = 백엔드
// & keyword = ABC
const RecruitsPage = () => {
  const router = useRouter();
  const query = router.query as Partial<Params>;
  const [hideNavigation, setHideNavigation] = useState(false);
  const { category: unsafeCategory } = query;
  const safeCategory =
    unsafeCategory && RecruitCategoryNameSet.has(unsafeCategory)
      ? unsafeCategory
      : RecruitCategoryName.PROJECT;

  return (
    <>
      <div
        css={[selfCss, hideNavigation && navigationGroupPaddingCss.inactive]}
      >
        <NavigationGroup hide={hideNavigation} />

        <div
          css={[
            fixTopCenter,
            {
              top: topBarHeight,
              padding: '0 25px',
              zIndex: 3,
              backgroundColor: palettes.background.default,
            },
          ]}
        >
          <SearchBar />
          <RecruitCategoryTabs value={safeCategory} />
          <div
            css={[
              flex('center', 'space-between', 'row', 24),
              { height: filterRowHeight },
            ]}
          >
            <div css={flex('center', 'flex-start', 'row', 24)}>
              <div>필터 도구</div>
              <div>필터 도구</div>
            </div>
            <div css={flex('center', 'flex-start', 'row', 12)}>
              <RecruitCreateLink category={safeCategory} />
            </div>
          </div>
        </div>

        <div
          css={{
            position: 'relative',
            top: recruitLayerTop,
            paddingBottom: recruitLayerTop,
          }}
        >
          <RecruitLayer hideNavigation={hideNavigation} />
        </div>
      </div>
    </>
  );
};

export default RecruitsPage;

const selfMinHeight = `max(${pageMinHeight}px, 100vh)`;
const selfCss = css(
  {
    transition: 'padding 200ms',
    minHeight: selfMinHeight,
  },
  navigationGroupPaddingCss.active,
  { paddingBottom: gnbHeight + 24 }
);
const searchBarContainerHeight = 60;
const recruitTabsHeight = 32;
const filterRowHeight = 70;
const recruitLayerTop =
  searchBarContainerHeight + recruitTabsHeight + filterRowHeight;

const listLayerHeight = `calc(${selfMinHeight} - ${
  topBarHeight +
  gnbHeight +
  searchBarContainerHeight +
  recruitTabsHeight +
  filterRowHeight
}px)`;
const hideNavigationListLayerHeight = `calc(${listLayerHeight} + ${
  topBarHeight + gnbHeight
}px)`;

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
    height: searchBarContainerHeight,
    backgroundColor: palettes.background.default,
  },
  flex('', 'center')
);

const RecruitCategoryTabs = (props: { value: RecruitCategoryName }) => {
  const { value } = props;
  const router = useRouter();
  const query = router.query as Partial<Params>;

  return (
    <Tabs.Root value={value} css={{ height: recruitTabsHeight }}>
      <Tabs.List>
        <Tabs.Border css={{ width: 'calc(100% + 50px)', left: '-25px' }} />
        <Tabs.TriggerWithLink
          value={RecruitCategoryName.PROJECT}
          theme={Theme.PRIMARY}
          href={routes.recruit.list({
            ...query,
            category: RecruitCategoryName.PROJECT,
          })}
        >
          프로젝트
        </Tabs.TriggerWithLink>
        <Tabs.TriggerWithLink
          value={RecruitCategoryName.STUDY}
          theme={Theme.SECONDARY}
          href={routes.recruit.list({
            ...query,
            category: RecruitCategoryName.STUDY,
          })}
        >
          스터디
        </Tabs.TriggerWithLink>
      </Tabs.List>
    </Tabs.Root>
  );
};

const RecruitCreateLink = (props: { category: RecruitCategoryName }) => {
  const { category } = props;
  const recruitTheme = getRecruitThemeByCategory(category);

  return (
    <CircleButton
      asLink
      href={routes.recruit.create()}
      css={{ width: 44, height: 44 }}
      name="pencil.plus"
      label="리쿠르트 작성 버튼"
      theme={recruitTheme}
    />
  );
};

const RecruitLayer = (props: { hideNavigation: boolean }) => {
  // const { hideNavigation } = props;

  const router = useRouter();
  const query = router.query as Partial<Params>;
  const { category, completed, skills, recruitParts, keyword } =
    toGetRecruitsParams(query);

  const infiniteRecruitsQuery = useRecruits(
    { category },
    {
      keyword,
      completed,
      skills,
      recruitParts,
    }
  );

  // const height = hideNavigation
  //   ? hideNavigationListLayerHeight
  //   : listLayerHeight;

  return (
    <RecruitCardList
      infiniteQuery={infiniteRecruitsQuery}
      useWindowScroll={true}
      skeletonCount={6}
    />
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
const toGetRecruitsParams = (
  params: Partial<Params>
): Omit<GetRecruitsParams, 'size' | 'cursor'> => {
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
