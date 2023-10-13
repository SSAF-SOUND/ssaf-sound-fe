import type { Meta, StoryObj } from '@storybook/react';

import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import {
  mockGetCertifiedSsafyMyInfo,
  mockGetUncertifiedSsafyMyInfo,
} from '~/mocks/handlers/member/apis/mockGetMyInfo';
import { mockUpdateSsafyBasicInfo } from '~/mocks/handlers/member/apis/mockUpdateSsafyBasicInfo';
import MyInfoSettingsSsafyBasicInfoEditPage from '~/pages/profile/myinfo-settings/ssafy-basic-info/edit';
import { PageLayout } from '~/stories/Layout';
import { createMswParameters } from '~/stories/utils';
import { sleep } from '~/utils';

const meta: Meta<typeof MyInfoSettingsSsafyBasicInfoEditPage> = {
  title: 'Page/프로필/내 정보 세팅/SSAFY 기본정보 수정',
  component: MyInfoSettingsSsafyBasicInfoEditPage,
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    ...createMswParameters({
      member: [],
      common: [mockUpdateSsafyBasicInfo],
    }),
  },
};

export default meta;

type SsafyBasicInfoEditPageStory = StoryObj<
  typeof MyInfoSettingsSsafyBasicInfoEditPage
>;

export const UnCertifiedSsafyUser: SsafyBasicInfoEditPageStory = {
  name: 'SSAFY 멤버 + SSAFY 인증 안함',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await sleep(500);

    const ssafyMemberSelectBox = await canvas.findByRole('combobox', {
      name: 'SSAFY인 여부',
    });
    const yearSelectBox = await canvas.findByRole('combobox', {
      name: 'SSAFY 기수 선택',
    });
    const campusSelectBox = await canvas.findByRole('combobox', {
      name: 'SSAFY 캠퍼스 선택',
    });

    await step(
      'SSAFY인 여부를 "아니오"로 바꾸면, SSAFY 기수 선택, SSAFY 캠퍼스 선택 SelectBox가 비활성화 된다.',
      async () => {
        await userEvent.click(ssafyMemberSelectBox);
        const noOption = canvas.getByRole('option', { name: '아니오' });
        await userEvent.click(noOption);

        expect(yearSelectBox).toBeDisabled();
        expect(campusSelectBox).toBeDisabled();
      }
    );

    await step(
      'SSAFY인 여부를 "예"로 바꾸면, SSAFY 기수 선택, SSAFY 캠퍼스 선택 SelectBox가 활성화 된다.',
      async () => {
        await userEvent.click(ssafyMemberSelectBox);
        const yesOption = canvas.getByRole('option', { name: '네' });
        await userEvent.click(yesOption);

        expect(yearSelectBox).toBeEnabled();
        expect(campusSelectBox).toBeEnabled();
      }
    );
  },
  parameters: {
    ...createMswParameters({
      member: [mockGetUncertifiedSsafyMyInfo],
    }),
  },
};

export const CertifiedSsafyUser: SsafyBasicInfoEditPageStory = {
  name: 'SSAFY 멤버 + SSAFY 인증 완료',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await sleep(500);

    const ssafyMemberSelectBox = await canvas.findByRole('combobox', {
      name: 'SSAFY인 여부',
    });

    await step(
      'SSAFY 학생 인증된 사용자는, SSAFY인 여부를 바꿀 수 없다.',
      async () => {
        expect(ssafyMemberSelectBox).toBeDisabled();
      }
    );
  },
  parameters: {
    ...createMswParameters({
      member: [mockGetCertifiedSsafyMyInfo],
    }),
  },
};
