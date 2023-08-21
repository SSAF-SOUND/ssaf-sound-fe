import { Tabs } from '~/components/Common';
import { useGetQueryString, useSetQueryString } from '~/hooks';

export const RecruitFilterTabs = () => {
  const category = useGetQueryString('category');
  const setQueryProject = useSetQueryString('category', 'project');
  const setQueryStudy = useSetQueryString('category', 'study');

  return (
    <Tabs.Root
      defaultValue={category ?? 'project'}
      onValueChange={(value) => {
        value === 'project' ? setQueryProject() : setQueryStudy();
      }}
    >
      <Tabs.List>
        <Tabs.Border />
        <Tabs.Trigger value="project">프로젝트</Tabs.Trigger>
        <Tabs.Trigger value="study" theme="secondary">
          스터디
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};
