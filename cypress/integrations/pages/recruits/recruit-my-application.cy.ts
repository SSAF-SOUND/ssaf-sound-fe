describe('응답 대기 + 모집중', () => {
  it('리쿠르팅 신청 취소가 가능하다. 신청 취소시, 신청 취소 버튼이 사라지고 재신청 링크가 나타난다.', () => {
    cy.visitStory('page-recruit-리쿠르팅-내-신청서--pending-and-not-completed-recruit');

    cy.findByRole('button', { name: /리쿠르팅 신청 취소/ })
      .as('cancelButton')
      .click();

    cy.findByRole('dialog').within(() => {
      cy.findByRole('button', { name: /네/ }).click();
    });

    cy.get('@cancelButton').should('not.be.exist');
    cy.findByRole('link', { name: /다시 신청하기/ }).should('be.exist');
  });
});

describe('응답 대기 + 모집완료', () => {
  it('리쿠르팅 신청 취소가 불가능하다', () => {
    cy.visitStory('page-recruit-리쿠르팅-내-신청서--pending-and-completed-recruit');

    cy.findByRole('button', { name: /리쿠르팅 신청 취소/ }).should(
      'not.be.exist'
    );
  });
});

describe('신청 취소 + 모집중', () => {
  it('리쿠르팅 재신청이 가능하다.', () => {
    cy.visitStory('page-recruit-리쿠르팅-내-신청서--initial-and-not-completed-recruit');

    cy.findByRole('link', { name: /다시 신청하기/ }).should('be.exist');
  });
});

describe('신청 취소 + 모집완료', () => {
  it('리쿠르팅 재신청이 불가능하다.', () => {
    cy.visitStory('page-recruit-리쿠르팅-내-신청서--initial-and-completed-recruit');

    cy.findByRole('link', { name: /다시 신청하기/ }).should('not.be.exist');
  });
});

describe('거절됨 + 모집중', () => {
  it('리쿠르팅 재신청이 가능하다.', () => {
    cy.visitStory('page-recruit-리쿠르팅-내-신청서--rejected-and-not-completed-recruit');

    cy.findByRole('link', { name: /다시 신청하기/ }).should('be.exist');
  });
});

describe('거절됨 + 모집완료', () => {
  it('리쿠르팅 재신청이 불가능하다.', () => {
    cy.visitStory('page-recruit-리쿠르팅-내-신청서--rejected-and-completed-recruit');

    cy.findByRole('link', { name: /다시 신청하기/ }).should('not.be.exist');
  });
});
