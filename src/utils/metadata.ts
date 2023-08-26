const url = (process.env.NEXT_PUBLIC_APP_URL as string) || '';

const title = 'SSAF SOUND';

export const globalMetaData = {
  title,
  description: `${title}는 삼성 청년 SW 아카데미(SSAFY) 학생들과 예비 SSAFY인들의 커뮤니티 공간입니다.`,
  locale: 'ko_KR',
  url,
  imageUrl: '',
  imageWidth: '1200',
  imageHeight: '630',
  pageType: 'website',
};
