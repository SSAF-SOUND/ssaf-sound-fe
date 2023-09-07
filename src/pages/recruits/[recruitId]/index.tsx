import TitleBar from '~/components/TitleBar';

interface RecruitDetailPageProps {}

const RecruitDetailPage = (props: RecruitDetailPageProps) => {
  return (
    <div>
      <TitleBar.Default
        css={{ marginBottom: 12 }}
        title="프로젝트 | 스터디"
        withoutClose
      />

      <div>
        <div>D-5</div>
        <div>조회수 1234</div>
        <div>
          <div>Title</div>
          <div>More Button</div>
        </div>
        <div>UserInfo</div>
        <div>Recruit Outline</div>
        <div>
          <div>Bookmark</div>
          <div>Share</div>
        </div>
      </div>

      <div>
        <div>Contact</div>
        <div>Action Button</div> {/* 유저에 따라 달라짐 */}
      </div>

      <div>
        <div>tab</div>
        <div>tab-content</div>
      </div>

      <div>comment</div>
    </div>
  );
};

export default RecruitDetailPage;

export const getServerSideProps = () => {
  return {
    props: {},
  };
};
