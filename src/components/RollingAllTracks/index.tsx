import { css, keyframes } from '@emotion/react';
import { useLayoutEffect, useRef, useState } from 'react';

import { SsafyIcon, TrackSize } from '~/components/Common/SsafyIcon';
import { SsafyTrack } from '~/services/member';
import { inlineFlex } from '~/styles/utils';

interface RollingAllTracksProps {
  gap: number;
  seconds: number;
  className?: string;
}

const RollingAllTracks = (props: RollingAllTracksProps) => {
  const { className, gap, seconds } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const [rollingWidth, setRollingWidth] = useState(0);

  const repeat = 2;
  const tracks = [undefined, ...Object.values(SsafyTrack)];

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const contentRollingWidth =
      (contentRef.current.children[0] as HTMLDivElement).offsetWidth + gap;

    setRollingWidth(contentRollingWidth);
  }, [gap]);

  return (
    <div css={selfCss} className={className}>
      <div
        css={[contentCss, rollingAnimationCss(rollingWidth, seconds)]}
        ref={contentRef}
        style={{ gap }}
      >
        {Array(repeat)
          .fill(undefined)
          .map((_, index) => {
            return (
              <div key={index} css={[cycleCss]} style={{ gap }}>
                {tracks.map((track) => (
                  <SsafyIcon.Track
                    key={`${track}${index}`}
                    size={TrackSize.LG2}
                    name={track}
                  />
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RollingAllTracks;

const selfCss = css({ width: '100%' });

const contentCss = css(inlineFlex('center', 'flex-start', 'row'));

const cycleCss = css(inlineFlex('center', 'flex-start', 'row'));

const rollingAnimationCss = (width: number, duration: number) => {
  const animation = keyframes`
    0% {
      transform: translate3d(0, 0, 0);
    } 
    
    100% {
      transform: translate3d(-${width}px, 0, 0);
    }
  `;

  return css({
    animation: `${duration}s linear infinite ${animation}`,
  });
};
