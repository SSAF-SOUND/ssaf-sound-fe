import type { RecruitFormValues } from './utils';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import { css } from '@emotion/react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '~/components/Common';
import { recruitFormMarginForExpandCssVar } from '~/components/Forms/RecruitForm/Common/recruitFormExpandCss';
import { RecruitBasicInfo } from '~/components/Forms/RecruitForm/Groups';
import { RecruitCategoryName, RecruitParts } from '~/services/recruit';
import { titleBarHeight } from '~/styles/utils';

import {
  Category,
  Contact,
  Content,
  QuestionToApplicants,
  Title,
} from './Fields';
import SubmitBar from './SubmitBar';

interface RecruitFormOptions {
  // SubmitBar
  barTitle: string;
  submitButtonText: string;
  onClickTitleBarClose: () => void;

  // editMode
  editMode?: boolean;

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
    editMode = false,
    marginForExpand = 0,
    onClickTitleBarClose,
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
          onClickClose={onClickTitleBarClose}
        />

        <Category editMode={editMode} css={{ marginBottom: 32 }} />

        <RecruitBasicInfo css={{ marginBottom: 24 }} />

        <Title />
        <Content css={{ marginBottom: 74 }} />

        <QuestionToApplicants css={{ marginBottom: 48 }} editMode={editMode} />
        <Contact />

        {editMode && (
          <Button size="lg" css={completeButtonCss}>
            리쿠르팅 모집완료
          </Button>
        )}
      </form>
    </FormProvider>
  );
};

const defaultRecruitFormValues: RecruitFormValues = {
  category: RecruitCategoryName.PROJECT,
  participants: {
    project: [
      {
        part: '' as RecruitParts,
        count: 1,
      },
    ],
    study: [
      {
        part: RecruitParts.STUDY,
        count: 1,
      },
    ],
  },
  myPart: '',
  endDate: '',
  skills: {},
  title: '',
  content: '',
  questionToApplicants: '',
  contact: '',
};

export default RecruitForm;

const selfCss = css({ paddingTop: titleBarHeight + 30, paddingBottom: 360 });

const completeButtonCss = css({
  width: '100%',
  marginTop: 64,
});
