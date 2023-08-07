import type { CSSProperties } from 'react';
import type { PortfolioExternalLink, UserPortfolio } from '~/services/member';

import { css } from '@emotion/react';
import { useEffect } from 'react';
import {
  TransformComponent,
  TransformWrapper,
  useTransformContext,
} from 'react-zoom-pan-pinch';

import { SsafyIcon, TrackSize } from '~/components/Common';
import SkillsSorter from '~/components/Forms/PortfolioForm/Fields/Skills/SkillsSorter';
import PortfolioLink from '~/components/PortfolioLink';
import { articleCss } from '~/services/article';
import { getPortfolioLinkColor, isEmptyPortfolio } from '~/services/member';
import { flex, fontCss, inlineFlex, palettes } from '~/styles/utils';
import { sanitizeHtml } from '~/utils';

interface PortfolioProps {
  portfolio: UserPortfolio;
  className?: string;
  skillsContainerStyle?: CSSProperties;
}

const Portfolio = (props: PortfolioProps) => {
  const { portfolio, skillsContainerStyle, ...restProps } = props;
  const isEmpty = isEmptyPortfolio(portfolio);
  return (
    <div {...restProps}>
      {isEmpty ? (
        <EmptyPortfolio />
      ) : (
        <NormalPortfolio
          portfolio={portfolio}
          skillsContainerStyle={skillsContainerStyle}
        />
      )}
    </div>
  );
};

export default Portfolio;

const NormalPortfolio = (props: PortfolioProps) => {
  const { portfolio, skillsContainerStyle } = props;
  const { selfIntroduction, memberLinks, skills } = portfolio;
  const sanitized = sanitizeHtml(selfIntroduction);

  return (
    <div css={normalPortfolioSelfCss}>
      <div css={articleCss} dangerouslySetInnerHTML={{ __html: sanitized }} />

      <TransformWrapper
        minScale={1}
        maxScale={1}
        panning={{ lockAxisY: true }}
        limitToBounds={true}
        disablePadding={true}
      >
        <PortfolioSkills
          skills={skills}
          skillsContainerStyle={skillsContainerStyle}
        />
      </TransformWrapper>

      <PortfolioLinks links={memberLinks} />
    </div>
  );
};

const normalPortfolioSelfCss = css(flex('', '', 'column', 52));

const EmptyPortfolio = () => {
  return (
    <div css={emptyPortfolioSelfCss}>
      <p css={emptyPortfolioMessageCss}>
        아직 입력된 포트폴리오 내용이 없습니다.
      </p>
      <SsafyIcon.Track size={TrackSize.LG2} />
    </div>
  );
};

const emptyPortfolioSelfCss = css(flex('center', '', 'column'));
const emptyPortfolioMessageCss = css(
  {
    marginBottom: 28,
    color: palettes.primary.default,
  },
  fontCss.style.R16
);

interface PortfolioSkillsProps {
  skills: string[];
  skillsContainerStyle?: CSSProperties;
}
const PortfolioSkills = (props: PortfolioSkillsProps) => {
  const { skills, skillsContainerStyle } = props;
  const { setCenter } = useTransformContext();

  useEffect(() => {
    setCenter();
  }, [setCenter]);

  return (
    <TransformComponent
      wrapperStyle={{ ...skillsContainerStyle, width: 'auto' }}
    >
      <div css={inlineFlex('center', 'center', 'row', 28)}>
        <SkillsSorter skillNames={skills} maxOrder={skills.length} />
      </div>
    </TransformComponent>
  );
};

interface PortfolioLinksProps {
  links: PortfolioExternalLink[];
}

const PortfolioLinks = (props: PortfolioLinksProps) => {
  const { links } = props;

  return (
    <div css={portfolioLinksSelfCss}>
      {links.map(({ linkName, path }, index) => (
        <PortfolioLink.Root
          key={index}
          href={path}
          color={getPortfolioLinkColor(index)}
        >
          <PortfolioLink.Text>{linkName}</PortfolioLink.Text>
        </PortfolioLink.Root>
      ))}
    </div>
  );
};

const portfolioLinksSelfCss = css(flex('', 'center', 'row', 16, 'wrap'));