import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { Tabs } from '~/components/Common';
import { useGetQueryString } from '~/hooks';

export const RecruitFilterTabs = () => {
  const category = useGetQueryString('category');
  const [value, setValue] = useState('project');
  const router = useRouter();
  const handleValueChange = (value: string) => {
    setValue(value);
    router.push({
      pathname: router.pathname,
      query: {
        isFinished: router.query.isFinished,
        category: value,
      },
    });
  };

  useEffect(() => {
    setValue(category ?? 'project');
  }, [category]);

  return (
    <Tabs.Root value={value} onValueChange={handleValueChange}>
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
