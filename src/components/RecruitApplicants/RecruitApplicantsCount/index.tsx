import { css } from "@emotion/react";

import { flex, fontCss, palettes } from "~/styles/utils";

interface RecruitApplicantsCountProps {
  className?: string;
  title: string;
  count?: number;
}
export const RecruitApplicantsCount = (props: RecruitApplicantsCountProps) => {
  const { count, title, className } = props;

  return (
    <p css={selfCss} className={className}>
      <span>{title}</span>
      {count !== undefined && <strong css={countCss}>{count}</strong>}
    </p>
  );
};

const selfCss = css(
  fontCss.style.B18,
  flex('center', '', 'row', 4)
);

const countCss = css({ color: palettes.recruit.default });

