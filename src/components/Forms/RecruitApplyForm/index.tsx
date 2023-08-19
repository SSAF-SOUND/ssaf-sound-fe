import type {
  RecruitApplyParams,
  RecruitCategory,
  RecruitType,
} from '~/services/recruit';

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import { Button, SelectBox } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import { useRecruitTypes } from '~/services/meta';
import { getRecruitThemeByCategory, useApplyRecruit } from '~/services/recruit';
import { flex } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

import { ApplyQuestion } from './ApplyQuestion';
import { ApplyTextArea } from './ApplyTextArea';
import { ProfileVisibilityCheckbox } from './ProfileVisibilityCheckbox';

interface DefaultValues {
  customQuestionAnswer: string;
  profileVisibility: boolean;
  recruitType: RecruitType;
}

interface RecruitApplyFormProps {
  recruitId: number;
  defaultValues?: DefaultValues;
  customQuestion?: string;
  category?: RecruitCategory;
}

export const RecruitApplyForm = (props: RecruitApplyFormProps) => {
  const {
    recruitId = 1,
    category = 'study',
    customQuestion = 'custom Question',
  } = props;

  const {
    defaultValues = {
      customQuestionAnswer: '',
      profileVisibility: true,
      recruitType: category === 'project' ? '앱' : '스터디',
    },
  } = props;

  const router = useRouter();

  const { register, handleSubmit, setValue, watch } = useForm<DefaultValues>({
    defaultValues,
  });

  const { mutateAsync: applyRecruit, isLoading } = useApplyRecruit();
  const { openModal, closeModal } = useModal();

  const { data: RecruitMetaData } = useRecruitTypes();

  const startOrder = category === 'project' ? 0 : -1;

  const postApply = async (content: RecruitApplyParams) => {
    try {
      await applyRecruit({
        recruitId,
        content,
      });

      closeModal();

      router.replace({
        pathname: routes.recruit.applyRedirect(),
        query: { category, recruitId },
      });
    } catch (err) {
      handleAxiosError(err);
    }
  };

  const isButtonActive =
    watch('profileVisibility') && !!watch('customQuestionAnswer')?.length;

  const isCategoryProject = category === 'project';

  return (
    <form
      onSubmit={handleSubmit(({ recruitType, customQuestionAnswer }) => {
        openModal('alert', {
          title: '알림',
          description: (
            <span css={{ wordBreak: 'keep-all' }}>
              리쿠르팅 신청 내용은 신청 후에 수정이 불가합니다.
              신청하시겠습니까?
            </span>
          ),
          actionText: '신청',
          cancelText: '취소',
          onClickCancel: closeModal,
          onClickAction: () =>
            postApply({
              recruitType,
              contents: [customQuestionAnswer],
            }),
        });
      })}
      css={flex('', '', 'column', 20)}
    >
      {isCategoryProject && (
        <label css={flex('', '', 'column', 6)}>
          <ApplyQuestion
            order={startOrder + 1}
            question="지원파트를 선택해주세요."
          />
          <SelectBox
            items={RecruitMetaData.filter((data: string) => data !== '스터디')}
            defaultValue={defaultValues.recruitType}
            onValueChange={(value) =>
              setValue('recruitType', value as RecruitType)
            }
            size="md"
          />
        </label>
      )}

      <ProfileVisibilityCheckbox
        defaultChecked={defaultValues.profileVisibility}
        onCheckedChange={(value) =>
          setValue('profileVisibility', value as boolean)
        }
        category={category}
        disabled={isLoading}
        order={startOrder + 2}
      />

      <label css={flex('', '', 'column', 6)}>
        <ApplyQuestion order={startOrder + 3} question={customQuestion} />
        <ApplyTextArea
          {...register('customQuestionAnswer', {
            setValueAs: (value) => value.trim(),
          })}
          disabled={isLoading}
        />
      </label>

      <Button
        type="submit"
        disabled={!isButtonActive}
        theme={getRecruitThemeByCategory(category)}
      >
        리쿠르팅 신청하기
      </Button>
    </form>
  );
};
