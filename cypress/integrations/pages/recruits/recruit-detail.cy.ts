it('로그인 하지 않은 유저', () => {
  cy.visitStory('page-recruit-리쿠르팅-상세--not-signed-in');

  // 헤더 영역에 게시글 더보기(옵션) 버튼이 없어야 한다.
  cy.contains(/조회수/)
    .next()
    .within(() => {
      cy.findByRole('button', { name: /더보기/ }).should('not.be.exist');
    });

  // 스크랩 버튼을 누르면 로그인 유도 모달이 나타난다.
  cy.findByRole('button', { name: /스크랩/ }).click();
  cy.findByRole('dialog').within(() => {
    cy.contains(/로그인이 필요한 기능입니다/).should('be.exist');
  });

  // 댓글 작성 폼이 활성화되어있지 않고, 로그인이 필요하다는 메세지가 보인다.
  cy.contains(/댓글을 쓰려면 로그인이 필요합니다/).should('be.exist');
});

it('로그인 유저', () => {
  cy.visitStory('page-recruit-리쿠르팅-상세--mine');

  // 헤더 영역에 게시글 더보기(옵션) 버튼이 있어야 한다.
  cy.contains(/조회수/)
    .next()
    .within(() => {
      cy.findByRole('button', { name: /더보기/ }).should('be.exist');
    });

  // 댓글 작성 폼이 활성화 되어있다.
  cy.findByPlaceholderText(/댓글을 입력하세요/).should('be.exist');
});

it('내 리쿠르팅', () => {
  cy.visitStory('page-recruit-리쿠르팅-상세--mine');

  // 게시글 더보기 버튼 클릭시 팝업되는 모달에 수정하기와 삭제하기 버튼이 보인다.
  cy.contains(/조회수/)
    .next()
    .within(() => {
      cy.findByRole('button', { name: /더보기/ }).click();
    });

  cy.findByRole('dialog').within(() => {
    cy.contains(/수정하기/).should('be.exist');
    cy.contains(/삭제하기/).should('be.exist');
    cy.contains(/닫기/).click();
  });

  // 리쿠르팅 신청자 목록보기 버튼이 보인다.
  cy.findByRole('link', { name: /리쿠르팅 신청목록 보기/ }).should('be.exist');
});

describe('다른 사람의 리쿠르팅', () => {
  describe('아직 신청하지 않음 + 모집중인 리쿠르팅', () => {
    it('리쿠르팅 신청 버튼이 보인다.', () => {
      cy.visitStory(
        'page-recruit-리쿠르팅-상세--initial-and-not-completed-recruit'
      );

      cy.findByRole('link', { name: /리쿠르팅 신청/ }).should('be.exist');
    });
  });

  describe('아직 신청하지 않음 + 모집완료된 리쿠르팅', () => {
    it('리쿠르팅 신청 버튼이 보인다.', () => {
      cy.visitStory(
        'page-recruit-리쿠르팅-상세--initial-and-completed-recruit'
      );

      cy.findByRole('link', { name: /리쿠르팅 신청/ }).should('be.exist');
    });
  });

  describe('응답 대기 + 모집중인 리쿠르팅', () => {
    it('내 신청서 보기 버튼이 보인다.', () => {
      cy.visitStory(
        'page-recruit-리쿠르팅-상세--pending-and-not-completed-recruit'
      );

      cy.findByRole('link', { name: /리쿠르팅 신청내용 보기/ }).should(
        'be.exist'
      );
    });
  });

  describe('응답 대기 + 모집완료된 리쿠르팅', () => {
    it('내 신청서 보기 버튼이 보인다.', () => {
      cy.visitStory(
        'page-recruit-리쿠르팅-상세--pending-and-completed-recruit'
      );

      cy.findByRole('link', { name: /리쿠르팅 신청내용 보기/ }).should(
        'be.exist'
      );
    });
  });

  describe('거절된 리쿠르팅 + 모집중인 리쿠르팅', () => {
    it('내 신청서 보기 버튼이 보인다.', () => {
      cy.visitStory(
        'page-recruit-리쿠르팅-상세--rejected-and-not-completed-recruit'
      );

      cy.findByRole('link', { name: /리쿠르팅 신청내용 보기/ }).should(
        'be.exist'
      );
    });
  });

  describe('거절된 리쿠르팅 + 모집완료된 리쿠르팅', () => {
    it('내 신청서 보기 버튼이 보인다.', () => {
      cy.visitStory(
        'page-recruit-리쿠르팅-상세--rejected-and-completed-recruit'
      );

      cy.findByRole('link', { name: /리쿠르팅 신청내용 보기/ }).should(
        'be.exist'
      );
    });
  });

  describe('수락된 리쿠르팅 + 모집중인 리쿠르팅', () => {
    it('내 신청서 보기 버튼이 보인다.', () => {
      cy.visitStory(
        'page-recruit-리쿠르팅-상세--success-and-not-completed-recruit'
      );

      cy.findByRole('link', { name: /리쿠르팅 신청내용 보기/ }).should(
        'be.exist'
      );
    });
  });

  describe('수락된 리쿠르팅 + 모집완료된 리쿠르팅', () => {
    it('내 신청서 보기 버튼이 보인다.', () => {
      cy.visitStory(
        'page-recruit-리쿠르팅-상세--success-and-completed-recruit'
      );

      cy.findByRole('link', { name: /리쿠르팅 신청내용 보기/ }).should(
        'be.exist'
      );
    });
  });
});
