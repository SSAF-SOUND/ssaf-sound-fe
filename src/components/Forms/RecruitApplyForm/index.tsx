import type {
  RecruitApplyParams,
  RecruitCategory,
  RecruitType,
} from '~/services/recruit';

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import { Button } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import { useRecruitTypes } from '~/services/meta';
import { getRecruitThemeByCategory, useApplyRecruit } from '~/services/recruit';
import { flex } from '~/styles/utils';
import { handleAxiosError, routes } from '~/utils';

import {
  ApplyTextArea,
  ProfileVisibilityCheckbox,
  ApplySelectBox,
} from './Fields';

interface DefaultValues {
  customQuestionAnswer: string;
  profileVisibility: boolean;
  recruitType: RecruitType;
}

interface RecruitApplyFormProps {
  recruitId: number;
  defaultValues?: DefaultValues;
  category?: RecruitCategory;
}

export const RecruitApplyForm = (props: RecruitApplyFormProps) => {
  const { recruitId = 1, category = 'study' } = props;

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
        <ApplySelectBox
          items={RecruitMetaData.filter((data: string) => data !== '스터디')}
          defaultValue={defaultValues.recruitType}
          onValueChange={(value) =>
            setValue('recruitType', value as RecruitType)
          }
          order={startOrder + 1}
        />
      )}

      <ProfileVisibilityCheckbox
        defaultChecked={defaultValues.profileVisibility}
        onCheckedChange={(value: boolean) =>
          setValue('profileVisibility', value)
        }
        category={category}
        disabled={isLoading}
        order={startOrder + 2}
      />

      <ApplyTextArea
        {...register('customQuestionAnswer', {
          setValueAs: (value) => value.trim(),
          validate: validator.customQuestionAnswer,
        })}
        order={startOrder + 3}
      />

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

const minCustomQuestionAnswerLength = 1;
const maxCustomQuestionAnswerLength = 500;

const validator = {
  customQuestionAnswer: (value: string) => {
    const { length } = value;
    if (
      length < minCustomQuestionAnswerLength ||
      length > maxCustomQuestionAnswerLength
    )
      return `답변은 ${minCustomQuestionAnswerLength}이상 ${maxCustomQuestionAnswerLength}이하여야 합니다.`;

    return true;
  },
};
