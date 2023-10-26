import type { KeyboardEventHandler } from 'react';
import type { UseFieldArrayRemove } from 'react-hook-form';
import type {
  PortfolioFormLink,
  PortfolioFormValues,
} from '~/components/Forms/PortfolioForm/utils';

import { css } from '@emotion/react';
import { useWatch } from 'react-hook-form';

import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { usePortfolioFormContext } from '~/components/Forms/PortfolioForm/utils';
import PortfolioLinkInputGroup from '~/components/PortfolioLinkInputGroup';
import { getPortfolioLinkColor } from '~/services/member';
import { inlineFlex, Theme } from '~/styles/utils';
import { regex } from '~/utils';

const fieldArrayName = 'links';
const maxLinkTextLength = 20;
const maxLinkLength = 500;
const validateLinkText = (value: string) => {
  if (!value.trim().length) return '링크 제목은 필수로 입력해야 합니다.';
  if (value.length > 20)
    return `링크 제목은 최대 ${maxLinkTextLength}자 까지 가능합니다.`;
};
const validateLink = (value: string) => {
  if (!value.length) return '링크는 필수로 입력해야 합니다.';
  if (value.length > 500)
    return `링크 길이는 최대 ${maxLinkLength}자 까지 가능합니다.`;
  if (!regex.url.test(value)) return '유효하지 않은 링크 형식입니다.';
};

interface LinkFieldProps {
  index: number;
  remove: UseFieldArrayRemove;
}

const LinkField = (props: LinkFieldProps) => {
  const { index, remove } = props;
  const { register, setFocus } = usePortfolioFormContext();
  const fieldName = `${fieldArrayName}.${index}` as const;
  const linkTextFieldName = `${fieldName}.linkText` as const;
  const linkFieldName = `${fieldName}.link` as const;

  const { link, linkText } = useWatch<PortfolioFormValues>({
    name: fieldName,
  }) as PortfolioFormLink;

  const removeField = () => remove(index);

  const preventSubmitOnEnterKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const onPressEnterInLink: KeyboardEventHandler<HTMLInputElement> = (e) => {
    preventSubmitOnEnterKeyDown(e);
    if (e.key === 'Enter') setFocus(linkTextFieldName);
  };

  const onPressEnterInLinkText: KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    preventSubmitOnEnterKeyDown(e);
    if (e.key === 'Enter') setFocus(`${fieldArrayName}.${index + 1}.link`);
  };

  return (
    <div css={selfCss}>
      <PortfolioLinkInputGroup.Root
        viewText={linkText}
        viewHref={link}
        color={getPortfolioLinkColor(index)}
      >
        <PortfolioLinkInputGroup.Input
          inputType={'href'}
          css={linkFieldCss}
          {...register(linkFieldName, { validate: validateLink })}
          onKeyDown={onPressEnterInLink}
        />
        <PortfolioLinkInputGroup.Input
          inputType={'text'}
          css={linkTextFieldCss}
          {...register(linkTextFieldName, { validate: validateLinkText })}
          onKeyDown={onPressEnterInLinkText}
        />
        <IconButton
          onClick={removeField}
          className={removeButtonClassname}
          css={{ position: 'absolute', right: `-${removeIconSize + 8}px` }}
          theme={Theme.WHITE}
          size={removeIconSize}
        >
          <Icon name="circle.minus" size={18} />
        </IconButton>
      </PortfolioLinkInputGroup.Root>
    </div>
  );
};

export default LinkField;

const removeIconSize = 24;

const removeButtonClassname = 'link-field-remove-button';

const selfCss = css({ position: 'relative' }, inlineFlex('center', '', 'row'));

const linkFieldCss = css({ width: '30%', ':focus-within': { width: '70%' } });
const linkTextFieldCss = css({ flexGrow: 1 });
