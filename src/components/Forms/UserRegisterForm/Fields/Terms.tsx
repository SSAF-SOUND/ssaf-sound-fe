import type { UserRegisterFormValues } from '~/components/Forms/UserRegisterForm/utils';
import type { Term } from '~/services/meta/utils';

import { css } from '@emotion/react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useId, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { Button } from '~/components/Common/Button';
import { Checkbox } from '~/components/Common/Checkbox';
import { Icon } from '~/components/Common/Icon';
import { Modal } from '~/components/Common/Modal';
import {
  UserRegisterFormFieldQuestion,
  useUserRegisterFormContext,
} from '~/components/Forms/UserRegisterForm/utils';
import { TermsOfService } from '~/components/ModalContent';
import { colorMix, flex, fontCss, palettes } from '~/styles/utils';

const fieldName = 'agreedTermsIds';
const fieldQuestion =
  '회원전용 서비스를 이용하기 위해서\n필수 이용약관에 동의해야합니다.';

export interface TermsProps {
  terms: Term[];
  onComplete: () => void;
}

export const Terms = (props: TermsProps) => {
  const { terms, onComplete } = props;
  const { register, setValue } = useUserRegisterFormContext();

  const requiredTermsIds = useMemo(
    () =>
      terms
        .filter(({ required }) => required)
        .map(({ termId }) => String(termId)),
    [terms]
  );
  const agreedTermsIds = (useWatch<UserRegisterFormValues>({
    name: fieldName,
  }) ?? []) as string[];

  const agreeAllTermsCheckboxId = useId();

  const onAgreedTermsIdChange = (value: string[]) =>
    setValue(fieldName, value, { shouldDirty: true });

  const allTermsAgreed = agreedTermsIds.length === terms.length;
  const allRequiredTermsAgreed = requiredTermsIds.every((id) =>
    agreedTermsIds.includes(id)
  );

  const onClickAgreeAllTerms = () => {
    const nextAgreedTermsIds = allTermsAgreed
      ? []
      : terms.map(({ termId }) => termId).map(String);
    setValue(fieldName, nextAgreedTermsIds, { shouldDirty: true });
  };

  register(fieldName);

  return (
    <>
      <div>
        <UserRegisterFormFieldQuestion css={{ marginBottom: 40 }}>
          {fieldQuestion}
        </UserRegisterFormFieldQuestion>

        <div>
          <div css={agreeAllTermsRowCss}>
            <Checkbox
              id={agreeAllTermsCheckboxId}
              size={40}
              checked={allTermsAgreed}
              onCheckedChange={onClickAgreeAllTerms}
            />
            <label
              htmlFor={agreeAllTermsCheckboxId}
              css={{ cursor: 'pointer', userSelect: 'none' }}
            >
              전체 동의
            </label>
          </div>

          <ToggleGroup.Root
            rovingFocus={false}
            type="multiple"
            value={agreedTermsIds}
            onValueChange={onAgreedTermsIdChange}
            css={termsContainerCss}
          >
            {terms.map((term) => (
              <TermRow
                key={term.termId}
                value={String(term.termId)}
                title={term.termName}
                content={term.content}
                required={term.required}
              />
            ))}
          </ToggleGroup.Root>
        </div>
      </div>

      <div>
        <Button
          css={{ width: '100%' }}
          size="lg"
          disabled={!allRequiredTermsAgreed}
          onClick={onComplete}
        >
          다음으로
        </Button>
      </div>
    </>
  );
};

const agreeAllTermsRowCss = css(
  { padding: '12px 20px' },
  fontCss.style.B24,
  flex('center', '', 'row', 12)
);

const termsContainerCss = css(flex('', '', 'column', 12));

interface TermRowProps {
  value: string;
  title: string;
  content: string;
  required: boolean;
}

const TermRow = (props: TermRowProps) => {
  const { value, title, content, required } = props;
  const prefix = required ? '(필수)' : '(선택)';
  return (
    <div css={termRowSelfCss}>
      <ToggleGroup.Item asChild value={value} css={termCheckBoxCss}>
        <Checkbox size={40} />
      </ToggleGroup.Item>
      <Modal
        content={<TermsOfService title={title} html={content} />}
        trigger={
          <Button variant="literal" css={termModalTriggerCss}>
            <div css={fontCss.style.R20}>
              <span css={{ marginRight: 12, color: palettes.primary.default }}>
                {prefix}
              </span>
              <span css={fontCss.style.B20}>{title}</span>
            </div>
            <Icon name="chevron.right" size={28} />
          </Button>
        }
      />
    </div>
  );
};

const termRowSelfCss = css(
  {
    backgroundColor: palettes.background.grey,
    padding: '6px 20px',
    borderRadius: 12,
  },
  flex('center', '', 'row', 16),
  fontCss.style.R20
);

const termCheckBoxCss = css({
  '&[data-state="off"]': {
    color: colorMix('70%', palettes.font.blueGrey),
  },
  '&[data-state="on"]': {
    color: palettes.primary.dark,
  },
});

const termModalTriggerCss = css(
  { width: '100%', padding: 0 },
  flex('', 'space-between', 'row', 24)
);
