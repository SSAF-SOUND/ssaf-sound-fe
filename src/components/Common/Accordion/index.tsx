import * as RadixAccordion from '@radix-ui/react-accordion';

import AccordionContent from './AccordionContent';
import AccordionItem from './AccordionItem';
import AccordionTrigger from './AccordionTrigger';

export const Accordion = {
  Root: RadixAccordion.Root,
  /**
   * outlineColor prop 활용하여, `focus-within`시의 outline color를 커스텀할 수 있습니다.
   */
  Item: AccordionItem,
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
