import type { GetServerSideProps } from 'next';
import type { RecruitFilterFormProps } from '~/components/Forms/RecruitFilterForm';
import type { SearchBarFormProps } from '~/components/Forms/SearchBarForm';
import type {
  RecruitsPageRouteQuery,
  SafeRecruitsPageRouteQuery,
} from '~/utils/client-routes/recruits';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import {
  Badge,
  Icon,
  Modal,
  PageHead,
  PageHeadingText,
  Tabs,
  Toggle,
} from '~/components/Common';
import SearchBarForm from '~/components/Forms/SearchBarForm';
import { InfiniteList } from '~/components/InfiniteList';
import { RecruitFilterModalForm } from '~/components/ModalContent';
import NavigationGroup from '~/components/NavigationGroup';
import NoSearchResults from '~/components/NoSearchResults';
import { RecruitCard } from '~/components/Recruit/RecruitCard';
import { RecruitCardSkeleton } from '~/components/Recruit/RecruitCard/RecruitCardSkeleton';
import { RecruitCreateLink } from '~/components/Recruit/RecruitCreateLink';
import { queryKeys } from '~/react-query/common';
import { dehydrate } from '~/react-query/server';
import { toSSRSafeDehydratedState } from '~/react-query/server/toSSRSafeDehydratedState';
import { validateSearchKeyword } from '~/services/common/utils/searchBar';
import { useMyInfo } from '~/services/member';
import {
  getDisplayCategoryName,
  getRecruits,
  getRecruitThemeByCategory,
  RecruitCategoryName,
  useRecruits,
} from '~/services/recruit';
import {
  fixTopCenter,
  flex,
  fontCss,
  gnbHeight,
  pageCss,
  palettes,
  Theme,
  topBarHeight,
} from '~/styles/utils';
import {
  concat,
  customToast,
  globalMetaData,
  routes,
  stringToBoolean,
} from '~/utils';
import { getQueryStringFromUrl } from '~/utils/getQueryStringFromUrl';
import { qsParse, qsStringify } from '~/utils/qsUtils';

const createMetaTitle = (category: RecruitCategoryName) => {
  const displayCategoryName = getDisplayCategoryName(category);
  return `${displayCategoryName} 모집`;
};
const createMetaDescription = (category: RecruitCategoryName) => {
  const displayCategoryName = getDisplayCategoryName(category);
  return `${globalMetaData.description} ${globalMetaData.title}는 삼성 청년 SW 아카데미(SSAFY) 학생들의 원활한 ${displayCategoryName} 진행을 위한 리쿠르팅 기능을 제공합니다.`;
};

const RecruitsPage = (props: Props) => {
  const { ssrUrl } = props;
  const router = useRouter();
  const routerQuery = router.query as Params;

  const { query: safeQuery } = routes.recruits.list({
    ...routerQuery,
    includeCompleted: stringToBoolean(
      routerQuery?.[ParamsKey.INCLUDE_COMPLETED]
    ),
  });

  const { data: myInfo } = useMyInfo();
  const isSignedIn = !!myInfo;
  const { category, includeCompleted } = safeQuery;

  const metaCategory = category;
  const metaTitle = createMetaTitle(metaCategory);
  const metaDescription = createMetaDescription(metaCategory);

  return (
    <>
      <PageHeadingText text={metaTitle} />
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: ssrUrl,
        }}
      />

      <div css={selfCss}>
        <NavigationGroup />

        <div css={filterLayerCss}>
          <SearchBar />
          <RecruitCategoryTabs category={category} />
          <div css={filterToolsContainerCss}>
            <div css={filterToolsCss}>
              <IncludeCompletedRecruitsSwitch
                category={category}
                includeCompleted={includeCompleted}
              />
              <RecruitFilterModal query={safeQuery} />
            </div>

            {isSignedIn && <RecruitCreateLink category={category} />}
          </div>
        </div>

        <RecruitsLayer query={safeQuery} />
      </div>
    </>
  );
};

export default RecruitsPage;

const searchBarContainerHeight = 60;
const recruitTabsHeight = 32;
const filterRowHeight = 70;
const selfPaddingTop =
  topBarHeight + searchBarContainerHeight + recruitTabsHeight + filterRowHeight;
const selfPaddingBottom = gnbHeight + 24;
const selfCss = css(
  {
    transition: 'padding 200ms',
    padding: `${selfPaddingTop}px 0 ${selfPaddingBottom}px`,
  },
  pageCss.minHeight,
  flex('', '', 'column')
);

const filterLayerCss = css(fixTopCenter, {
  top: topBarHeight,
  padding: '0 25px',
  zIndex: 3,
  backgroundColor: palettes.background.default,
});

const filterToolsContainerCss = css(
  { height: filterRowHeight },
  flex('center', 'space-between', 'row', 24)
);
const filterToolsCss = css(flex('center', 'flex-start', 'row', 6));

const SearchBar = () => {
  const router = useRouter();
  const { keyword: queryKeyword } = router.query as Params;
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

interface IncludeCompletedRecruitsSwitchProps {
  category: RecruitCategoryName;
  includeCompleted: boolean;
}
const IncludeCompletedRecruitsSwitch = (
  props: IncludeCompletedRecruitsSwitchProps
) => {
  const { category, includeCompleted } = props;
  const recruitTheme = getRecruitThemeByCategory(category);
  const router = useRouter();
  const showOnlyPendingRecruits = !includeCompleted;

  const onPressedChange = (nextShowOnlyPendingRecruits: boolean) => {
    router.push({
      query: {
        ...router.query,
        [ParamsKey.INCLUDE_COMPLETED]: !nextShowOnlyPendingRecruits,
      },
    });
  };

  return (
    <Toggle
      pressed={showOnlyPendingRecruits}
      onPressedChange={onPressedChange}
      thumbSize={20}
      textWidth={40}
      padding={'4px 5px'}
      theme={recruitTheme}
      text={'모집 중'}
      css={[fontCss.style.B12]}
    />
  );
};

interface RecruitCategoryTabs {
  category: RecruitCategoryName;
}

const RecruitCategoryTabs = (props: RecruitCategoryTabs) => {
  const { category } = props;
  const router = useRouter();
  const getRoute = (category: string) => {
    return {
      ...router,
      query: {
        ...router.query,
        [ParamsKey.CATEGORY]: category,
      },
    };
  };

  return (
    <Tabs.Root value={category} css={{ height: recruitTabsHeight }}>
      <Tabs.List>
        <Tabs.Border css={{ width: 'calc(100% + 50px)', left: '-25px' }} />
        <Tabs.TriggerWithLink
          value={RecruitCategoryName.PROJECT}
          theme={Theme.PRIMARY}
          href={getRoute(RecruitCategoryName.PROJECT)}
        >
          프로젝트
        </Tabs.TriggerWithLink>
        <Tabs.TriggerWithLink
          value={RecruitCategoryName.STUDY}
          theme={Theme.SECONDARY}
          href={getRoute(RecruitCategoryName.STUDY)}
        >
          스터디
        </Tabs.TriggerWithLink>
      </Tabs.List>
    </Tabs.Root>
  );
};

interface RecruitsLayerProps {
  query: SafeRecruitsPageRouteQuery;
}

const RecruitsLayer = (props: RecruitsLayerProps) => {
  const { query } = props;
  const { category, keyword, includeCompleted, skills, recruitParts } = query;
  const isValidKeyword = validateSearchKeyword(keyword);
  const infiniteRecruitsQuery = useRecruits({
    category,
    keyword,
    includeCompleted,
    skills,
    recruitParts,
  });

  const infiniteData = infiniteRecruitsQuery.data
    ? infiniteRecruitsQuery.data.pages
        .map(({ recruits }) => recruits)
        .reduce(concat)
    : [];

  return (
    <div css={recruitLayerCss}>
      <InfiniteList
        data={infiniteData}
        infiniteQuery={infiniteRecruitsQuery}
        skeleton={<RecruitCardSkeleton size="md" />}
        skeletonCount={6}
        skeletonGap={16}
        useWindowScroll={true}
        itemContent={(index, recruit) => (
          <RecruitCard
            key={recruit.recruitId}
            recruitSummary={recruit}
            withBadge={false}
            size="md"
          />
        )}
        emptyElement={
          <NoSearchResults
            withKeyword={isValidKeyword}
            keyword={keyword}
            description={`${
              isValidKeyword
                ? '검색어 및 조건에 맞는 리크루팅 결과가 없습니다.'
                : '조건에 맞는 리쿠르팅 결과가 없습니다.'
            }`}
          />
        }
      />
    </div>
  );
};

const recruitLayerCss = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  flexGrow: 1,
  marginTop: 4,
});

interface RecruitFilterModalProps {
  query: SafeRecruitsPageRouteQuery;
}
const RecruitFilterModal = (props: RecruitFilterModalProps) => {
  const router = useRouter();
  const { query } = props;
  const { recruitParts, skills, category } = query;
  const recruitTheme = getRecruitThemeByCategory(category);

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onValidSubmit: RecruitFilterFormProps['onValidSubmit'] = (
    formValues
  ) => {
    const { recruitParts, skills } = formValues;
    closeModal();
    router.push({
      query: {
        ...router.query,
        [ParamsKey.RECRUIT_PARTS]: recruitParts,
        [ParamsKey.SKILLS]: skills,
      },
    });
  };

  return (
    <Modal
      onEscapeKeyDown={closeModal}
      onPointerDownOutside={closeModal}
      open={open}
      trigger={
        <div>
          <Badge
            onClick={openModal}
            pressed={open}
            css={[fontCss.style.B12, { height: 30 }]}
            theme={recruitTheme}
          >
            상세 옵션 <Icon name="chevron.down" size={16} />
          </Badge>
        </div>
      }
      content={
        <RecruitFilterModalForm
          onClickClose={closeModal}
          onValidSubmit={onValidSubmit}
          defaultValues={{
            category,
            recruitParts,
            skills,
          }}
        />
      }
    />
  );
};

interface Props {
  ssrUrl: string;
}
enum ParamsKey {
  CATEGORY = 'category',
  INCLUDE_COMPLETED = 'includeCompleted',
  RECRUIT_PARTS = 'recruitParts',
  SKILLS = 'skills',
  KEYWORD = 'keyword',
}
type Params = Partial<{
  [ParamsKey.CATEGORY]: RecruitsPageRouteQuery['category'];
  [ParamsKey.INCLUDE_COMPLETED]: string;
  [ParamsKey.RECRUIT_PARTS]: RecruitsPageRouteQuery['recruitParts'];
  [ParamsKey.SKILLS]: RecruitsPageRouteQuery['skills'];
  [ParamsKey.KEYWORD]: RecruitsPageRouteQuery['keyword'];
}>;

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const queryString = getQueryStringFromUrl(context.resolvedUrl);
  const parsed = qsParse(queryString) as RecruitsPageRouteQuery;

  const { pathname, query } = routes.recruits.list(parsed);

  const queryClient = new QueryClient();
  const recruitListQueryKey = JSON.parse(
    JSON.stringify(queryKeys.recruit.list(query))
  );

  await queryClient.prefetchInfiniteQuery({
    queryKey: recruitListQueryKey,
    queryFn: () => getRecruits(query),
  });

  const { dehydratedState } = dehydrate(queryClient);
  return {
    props: {
      dehydratedState:
        toSSRSafeDehydratedState.infiniteQueries(dehydratedState),
      ssrUrl: `${pathname}${qsStringify(query)}`,
    },
  };
};
