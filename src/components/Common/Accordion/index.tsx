import * as RadixAccordion from '@radix-ui/react-accordion';

import AccordionContent from './AccordionContent';
import AccordionTrigger from './AccordionTrigger';

export const Accordion = {
  Root: RadixAccordion.Root,
  /**
   * 키보드 방향키로 아코디언 버튼을 옮겨다닐 수 있기 때문에,
   * 반드시 `:focus-within`으로 `Item`혹은 `Trigger`에 스타일을 넣어야 합니다.
   **/
  Item: RadixAccordion.Item,
  /**
   * 키보드 방향키로 아코디언 버튼을 옮겨다닐 수 있기 때문에,
   * 반드시 `:focus-within`으로 `Item`혹은 `Trigger`에 스타일을 넣어야 합니다.
   **/
  Trigger: AccordionTrigger,
  /**
   * `Content`자체에 콘텐츠 이외의 높이를 증가시키는 스타일(paddingY, marginY 등)을 주는 경우 애니메이션에 버그가 발생하기 때문에, 이러한 스타일들은 반드시 `Content`내부의 엘리먼트에게 주어야 합니다.
   *
   * @example
   * <Accordion.Content css={{ padding: '0 20px' }}>
   *   <div css={{ padding: '30px 0' }}>
   *     ...
   *   </div>
   * </Accordion.Content>
   */
  Content: AccordionContent,
};
