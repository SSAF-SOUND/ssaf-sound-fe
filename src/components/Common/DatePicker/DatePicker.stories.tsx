import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from './index';

const meta: Meta<typeof DatePicker> = {
  title: 'Input/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description:
        '`controlled`로 쓸 때만 사용. \n\n `Date`객체, `yyyy-mm-dd`문자열 모두 사용 가능합니다.',
    },
    maxDate: {
      description:
        '`maxDate`로 지정한 날짜보다 이후의 날짜는 선택할 수 없습니다.',
    },
    minDate: {
      description:
        '`minDate`로 지정한 날짜보다 이전의 날짜는 선택할 수 없습니다.',
    },
    maxDetail: {
      description:
        '제공할 `view`의 최대 범위 지정. 월단위, 1년단위, 10년단위, 100년단위까지 보여줄 수 있습니다.',
    },
    minDetail: {
      description:
        '제공할 `view`의 최소 범위 지정. 월단위, 1년단위, 10년단위, 100년단위까지 보여줄 수 있습니다.',
    },
  },
};

export default meta;

type DatePickerStory = StoryObj<typeof DatePicker>;

export const Default: DatePickerStory = {
  args: { theme: 'primary' },
  render: (args) => {
    const { minDate = undefined, maxDate = undefined, ...props } = args;

    props.value = undefined;
    props.onChange = undefined;

    return (
      <DatePicker
        minDate={minDate && new Date(minDate)}
        maxDate={maxDate && new Date(maxDate)}
        {...props}
      />
    );
  },
};
