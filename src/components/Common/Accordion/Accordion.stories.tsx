import type { Meta } from '@storybook/react';

import { flex } from '~/styles/utils';

import Accordion from './index';
import Icon from '../Icon';

export const AccordionComponent = () => {
  return (
    <Accordion.Root type="multiple">
      {/* --------------------------------------- */}
      <Accordion.Item value="1">
        <Accordion.Trigger>
          <div css={flex('center', 'center', 'row', 3)}>
            <Icon name="group" />
            <span>모집 인원</span>
          </div>
        </Accordion.Trigger>
        <Accordion.Content css={{ height: '100px', background: '#fff' }}>
          {/* content Css에 height설정을 해주세요. 애니메이션과 연동됩니다! 
              혹시 사용성이 불편하시다면, height props로 설정하는 방법도 생각해 볼게요. 다만 스타일링은 기본적인 것 외에는
        유연하게 하고 싶었어요. */}
          Content
        </Accordion.Content>
      </Accordion.Item>
      {/* --------------------------------------- */}

      <Accordion.Item value="2">
        <Accordion.Trigger>Test2</Accordion.Trigger>
        <Accordion.Content>Content2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="3">
        <Accordion.Trigger>Test3</Accordion.Trigger>
        <Accordion.Content>Content3</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

const meta: Meta = {
  title: 'Accordion',
  component: AccordionComponent,
};

export default meta;
