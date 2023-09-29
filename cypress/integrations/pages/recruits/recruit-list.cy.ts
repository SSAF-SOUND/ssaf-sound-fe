it('로그인 하지 않은 경우, 리쿠르팅 작성 버튼이 보이지 않는다.', () => {
  cy.visitStory('page-recruit-전체-리쿠르팅-조회--not-signed-in');

  cy.findByRole('link', { name: /리쿠르팅 작성 버튼/ }).should('not.be.exist');
});

it('로그인 한 경우, 리쿠르팅 작성 버튼이 보인다.', () => {
  cy.visitStory('page-recruit-전체-리쿠르팅-조회--signed-in');

  cy.findByRole('link', { name: /리쿠르팅 작성 버튼/ }).should('be.exist');
});
