import { css } from '@emotion/react';
import { useState } from 'react';

import { Modal, Separator } from '~/components/Common';
import { SelectBox } from '~/components/Common/SelectBox';
import { ReportDomain, reportReasons } from '~/services/report';
import {
  flex,
  fontCss,
  pageMaxWidth,
  pageMinWidth,
  palettes,
  position,
  resetStyle,
} from '~/styles/utils';

const modalTitle = {
  [ReportDomain.ARTICLE]: '게시글을',
  [ReportDomain.ARTICLE_COMMENT]: '댓글을',
  [ReportDomain.RECRUIT]: '리쿠르트를',
  [ReportDomain.RECRUIT_COMMENT]: '댓글을',
};

export interface ReportProps {
  domain: ReportDomain;
  onClickReport: (params: {
    reportReasonId: number;
    domain: ReportDomain;
  }) => void | Promise<void>;
  onClickCancel?: () => void;
}

export const Report = (props: ReportProps) => {
  const { domain, onClickReport, onClickCancel } = props;
  const [reportReasonId, setReportReasonId] = useState<string>('1');

  return (
    <div css={selfCss}>
      <Modal.Title css={titleCss}>
        해당 {modalTitle[domain]} 정말 신고하시겠습니까?
      </Modal.Title>

      <SelectBox
        css={[selectBoxCss, { margin: '0 auto 380px' }]}
        size="lg"
        items={reportReasons}
        textAs={({ reason }) => reason}
        valueAs={({ reasonId }) => String(reasonId)}
        value={reportReasonId}
        onValueChange={(value) => setReportReasonId(value)}
      />

      <p css={[bottomTextCss, { marginBottom: 24 }]}>
        검수 후 자동으로 삭제됩니다.
      </p>

      <div css={buttonLayerCss}>
        <Modal.Close css={buttonCss} onClick={onClickCancel}>
          취소
        </Modal.Close>

        <Separator
          css={{ flexShrink: 0 }}
          orientation="vertical"
          backgroundColor={palettes.grey3}
          height={buttonHeight}
          width={2}
        />

        <Modal.Close
          css={[buttonCss, reportButtonCss]}
          onClick={() => {
            onClickReport({
              reportReasonId: Number(reportReasonId),
              domain,
            });
          }}
        >
          신고
        </Modal.Close>
      </div>
    </div>
  );
};

const selfCss = css(
  {
    color: palettes.black,
    textAlign: 'center',
    paddingTop: 56,
    borderRadius: 16,
    backgroundColor: palettes.white,
    minWidth: pageMinWidth,
    maxWidth: pageMaxWidth,
    overflow: 'hidden',
  },
  position.xy('center', 'center', 'fixed'),
  fontCss.family.auto
);

const titleCss = css({ padding: 32 }, fontCss.style.B24);

const selectBoxCss = css({
  border: `1px solid ${palettes.grey3}`,
  width: 320,
});

const bottomTextCss = css(fontCss.style.R16);

const buttonLayerCss = css(
  {
    borderTop: `1px solid ${palettes.grey3}`,
    width: '100%',
  },
  flex('center', '', 'row')
);

const buttonHeight = 64;

const buttonCss = css(
  resetStyle.button(),
  {
    width: '50%',
    height: buttonHeight,
    color: palettes.primary.darken,
    '&:hover, &:focus-visible': {
      backgroundColor: palettes.grey5,
    },
    '&:active': {
      backgroundColor: palettes.grey4,
    },
  },
  fontCss.style.R20
);

const reportButtonCss = css(
  { color: palettes.secondary.darken },
  fontCss.style.B20
);
