import type { RecruitFormValues } from './utils';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import { recruitFormMarginForExpandCssVar } from '~/components/Forms/RecruitForm/Common/recruitFormExpandCss';
import { RecruitBasicInfo } from '~/components/Forms/RecruitForm/Groups';
import { titleBarHeight } from '~/styles/utils';

import {
  Category,
  Title,
  Content,
  QuestionToApplicants,
  Contact,
} from './Fields';
import SubmitBar from './SubmitBar';

interface RecruitFormOptions {
  // SubmitBar
  barTitle: string;
  submitButtonText: string;
  submitBarCloseRoute: string;

  // Category
  isProjectDisabled: boolean;
  isStudyDisabled: boolean;

  /** Negative margin 적용을 위한 `px`값 */
  marginForExpand: string;
}

interface RecruitFormProps {
  onValidSubmit: SubmitHandler<RecruitFormValues>;
  onInvalidSubmit?: SubmitErrorHandler<RecruitFormValues>;
  defaultValues?: RecruitFormValues;
  options?: Partial<RecruitFormOptions>;
}

const RecruitForm = (props: RecruitFormProps) => {
  const {
    options = {},
    onValidSubmit,
    onInvalidSubmit,
    defaultValues = defaultRecruitFormValues,
  } = props;

  const {
    barTitle = '',
    submitButtonText = '',
    isProjectDisabled,
    isStudyDisabled,
    marginForExpand = 0,
    submitBarCloseRoute,
  } = options;

  const methods = useForm<RecruitFormValues>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const style = { [recruitFormMarginForExpandCssVar.varName]: marginForExpand };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
        css={selfCss}
        style={style}
      >
        <SubmitBar
          title={barTitle}
          submitButtonText={submitButtonText}
          onClickClose={submitBarCloseRoute}
        />

        <Category
          isProjectDisabled={isProjectDisabled}
          isStudyDisabled={isStudyDisabled}
          css={{ marginBottom: 32 }}
        />

        <RecruitBasicInfo css={{ marginBottom: 24 }} />

        <Title />
        <Content css={{ marginBottom: 74 }} />

        <QuestionToApplicants css={{ marginBottom: 48 }} />
        <Contact />
      </form>
    </FormProvider>
  );
};

const defaultRecruitFormValues: RecruitFormValues = {
  category: '프로젝트',
  participants: {
    project: [
      {
        part: '',
        count: 1,
      },
    ],
    study: [
      {
        part: '스터디',
        count: 1,
      },
    ],
  },
  endDate: '',
  skills: {},
  title: '',
  content: '',
  questionToApplicants: '',
  contact: '',
};

export default RecruitForm;

const selfCss = css({ paddingTop: titleBarHeight + 30, paddingBottom: 360 });
