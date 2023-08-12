import type { SkeletonProps } from 'react-loading-skeleton';

import { css } from '@emotion/react';
import ReactSkeleton from 'react-loading-skeleton';

import { flex, palettes } from '~/styles/utils';

const PortfolioSkeleton = () => {
  return (
    <div css={selfCss}>
      <Skeleton style={{ marginBottom: 6 }} height={20} count={10} />

      <Skeleton
        css={skillSkeletonLayerCss}
        circle
        height={60}
        width={60}
        count={10}
      />

      <Skeleton
        css={linkSkeletonLayerCss}
        borderRadius={40}
        height={42}
        width={160}
        count={8}
      />
    </div>
  );
};

export default PortfolioSkeleton;

const Skeleton = (props: SkeletonProps) => {
  const { count = 1, className, ...restProps } = props;

  return (
    <div className={className}>
      {Array(count)
        .fill(undefined)
        .map((_, index) => (
          <ReactSkeleton
            key={index}
            enableAnimation={false}
            baseColor={palettes.background.grey}
            {...restProps}
          />
        ))}
    </div>
  );
};

const selfCss = css(flex('', '', 'column', 52));
const skillSkeletonLayerCss = css(flex('', 'center', 'row', 28));
const linkSkeletonLayerCss = css(flex('', 'center', 'row', 15, 'wrap'));
