import { PageHead, PageHeadingText } from '~/components/Common';
import NavigationGroup from '~/components/NavigationGroup';
import { routes } from '~/utils';
import { globalMetaData } from '~/utils/metadata';

const metaTitle = '홈';
const metaDescription = `${globalMetaData.description} 점심 메뉴, 리쿠르팅, 핫 게시글 등 다양한 SSAF SOUND의 기능을 활용해보세요.`;

const MainPage = () => {
  return (
    <>
      <PageHead
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: routes.main(),
        }}
      />

      <PageHeadingText text={metaTitle} />

      <div>
        <NavigationGroup />
      </div>
    </>
  );
};

export default MainPage;
