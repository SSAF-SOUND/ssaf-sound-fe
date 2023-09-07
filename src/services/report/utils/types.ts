export enum ReportDomain {
  ARTICLE = 'POST',
  ARTICLE_COMMENT = 'COMMENT',
  RECRUIT = 'RECRUIT',
  RECRUIT_COMMENT = 'RECRUIT_COMMENT',
}

export const reportReasons = [
  '게시판 및 성격에 부적절함',
  '욕설/비하',
  '음란물/불건전한 만남 및 대화',
  '상업적 광고 및 판매',
  '유출/사칭/사기',
  '낚시/놀람/도배',
  '정당/정치인 비하 및 운동',
].map((reason, index) => {
  const reasonId = index + 1;
  return {
    reasonId,
    reason,
  };
});
