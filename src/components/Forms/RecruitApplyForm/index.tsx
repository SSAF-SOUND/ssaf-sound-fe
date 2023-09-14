import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import type { RecruitApplyFormValues } from '~/components/Forms/RecruitApplyForm/utils';
import type { RecruitDetail } from '~/services/recruit';

import { FormProvider, useForm, useFormState, useWatch } from 'react-hook-form';

import { Button } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import {
  getRecruitThemeByCategory,
  RecruitCategoryName,
} from '~/services/recruit';
import { isEqualString } from '~/utils';

import { AgreeToProvideProfile } from './Fields/AgreeToProvideProfile';
import { AnswerToRecruitAuthor } from './Fields/AnswerToRecruitAuthor';
import { RecruitPartToApply } from './Fields/RecruitPartToApply';

interface RecruitApplyFormOptions {
  readonly?: boolean;
}

export interface RecruitApplyFormProps {
  className?: string;
  recruitDetail: RecruitDetail;
  onValidSubmit: SubmitHandler<RecruitApplyFormValues>;
  onInvalidSubmit?: SubmitErrorHandler<RecruitApplyFormValues>;
  defaultValues?: RecruitApplyFormValues;
  options?: Partial<RecruitApplyFormOptions>;
}

export const RecruitApplyForm = (props: RecruitApplyFormProps) => {
  const {
    className,
    onValidSubmit,
    onInvalidSubmit,
    defaultValues = defaultRecruitApplyFormValues,
    recruitDetail,
    options = {},
  } = props;
  const { readonly = false } = options;
  const methods = useForm<RecruitApplyFormValues>({
    defaultValues,
  });
  const { handleSubmit } = methods;
  const {
    category,
    questions: [question],
  } = recruitDetail;
  const hasQuestion = question.length > 0;
  const isCategoryProject = isEqualString(
    category,
    RecruitCategoryName.PROJECT,
    { caseSensitive: false }
  );

  return (
    <FormProvider {...methods}>
      <form className={className}>
        {isCategoryProject && (
          <RecruitPartToApply
            recruitDetail={recruitDetail}
            readonly={readonly}
          />
        )}
        <AgreeToProvideProfile
          category={category}
          css={{ marginBottom: 120 }}
          readonly={readonly}
        />
        {hasQuestion && (
          <AnswerToRecruitAuthor
            category={category}
            question={question}
            readonly={readonly}
          />
        )}

        {!readonly && (
          <SubmitButton
            onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
            css={{ marginTop: 72 }}
            category={category}
          />
        )}
      </form>
    </FormProvider>
  );
};

const defaultRecruitApplyFormValues: Partial<RecruitApplyFormValues> = {
  recruitPartToApply: undefined,
  agreeToProvideProfile: false,
  answerToRecruitAuthor: '',
};

interface SubmitButtonProps {
  category: RecruitCategoryName;
  className?: string;
  onSubmit?: () => void;
}

const agreeToProvideProfileFieldName = 'agreeToProvideProfile';
const SubmitButton = (props: SubmitButtonProps) => {
  const { category, className, onSubmit } = props;

  const { openModal, closeModal } = useModal();
  const { isSubmitting } = useFormState();
  const agreeToProvideProfile =
    (useWatch<RecruitApplyFormValues>({
      name: agreeToProvideProfileFieldName,
    }) as boolean) ?? false;

  const recruitTheme = getRecruitThemeByCategory(category);
  const onClickAction = () => {
    onSubmit?.();
    closeModal();
  };

  const handleOpenModal = () =>
    openModal('alert', {
      title: '알림',
      description: (
        <>
          <p>리쿠르팅 신청 내용은 신청 후에 수정이 불가능합니다.</p>
          <p>신청하시겠습니까?</p>
        </>
      ),
      actionText: '신청',
      cancelText: '취소',
      onClickAction,
      onClickCancel: closeModal,
    });

  return (
    <Button
      onClick={handleOpenModal}
      css={{ width: '100%' }}
      loading={isSubmitting}
      className={className}
      type="button"
      size="lg"
      theme={recruitTheme}
      disabled={!agreeToProvideProfile}
    >
      리쿠르팅 신청하기
    </Button>
  );
};
