import type { PortfolioFormValues } from '~/components/PortfolioForm/utils';

import { css } from '@emotion/react';
import { useFieldArray } from 'react-hook-form';

import { Button, Icon } from '~/components/Common';
import LinkField from '~/components/PortfolioForm/Fields/Links/LinkField';
import { colorMix, flex, fontCss, palettes } from '~/styles/utils';

const fieldArrayName = 'links';
const maxFieldLength = 10;

interface LinksProps {
  className?: string;
}

export const Links = (props: LinksProps) => {
  const { className } = props;

  const { append, fields, remove } = useFieldArray<PortfolioFormValues>({
    name: fieldArrayName,
    // NOTE: max-field-array-length 반영하기
  });
  const canAddField = fields.length < maxFieldLength;

  const handleAddField = () => {
    if (canAddField) {
      append({
        link: '',
        linkText: '',
      });
    }
  };

  return (
    <div css={selfCss} className={className}>
      <p css={labelCss}>
        ③ 더 담고 싶으신 내용을 <strong css={highlightCss}>Link</strong>로
        남겨주세요 :)
      </p>

      {!!fields.length && (
        <div css={linkFieldArrayCss}>
          {fields.map((field, index) => (
            <LinkField key={field.id} index={index} remove={remove} />
          ))}
        </div>
      )}

      <Button
        variant="outlined"
        theme="recruit"
        size="md"
        css={addFieldButtonCss}
        onClick={handleAddField}
        disabled={!canAddField}
      >
        <Icon name="plus" size={20} />
      </Button>
    </div>
  );
};

const selfCss = css({});
const labelCss = css({ marginBottom: 20 }, fontCss.style.R14);
const highlightCss = css({ color: palettes.recruit.default });
const linkFieldArrayCss = css(
  { marginBottom: 20 },
  flex('center', 'center', 'row', 15, 'wrap')
);
const addFieldButtonCss = css({
  width: 70,
  borderRadius: 30,
  border: `1.5px solid ${palettes.font.blueGrey}`,
  backgroundColor: 'transparent',
  color: palettes.recruit.default,
  margin: '0 auto',
  '&:disabled': {
    color: colorMix('50%', palettes.recruit.default),
  },
});
