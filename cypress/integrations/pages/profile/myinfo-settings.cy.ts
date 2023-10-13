const assertRequiredActionButtonsExist = () => {
  cy.findByRole('link', { name: /닉네임 수정/ }).should('be.exist');
  cy.findByRole('link', { name: /전공자 여부/ }).should('be.exist');
  cy.findByText(/내 프로필 공개/)
    .next('button')
    .should('be.exist');
  cy.findByRole('link', { name: /SSAFY 기본 정보/ }).should('be.exist');
};

it('SSAFY 멤버가 아닌 경우', () => {
  cy.visitStory('page-프로필-내-정보-세팅-루트-페이지--non-ssafy-user');

  assertRequiredActionButtonsExist();

  cy.findByRole('link', { name: /SSAFY 인증/ }).should('not.be.exist');
  cy.findByRole('link', { name: /SSAFY 트랙/ }).should('not.be.exist');
});

it('인증되지 않은 SSAFY 멤버', () => {
  cy.visitStory(
    'page-프로필-내-정보-세팅-루트-페이지--un-certified-ssafy-user'
  );

  assertRequiredActionButtonsExist();

  cy.findByRole('link', { name: /SSAFY 인증/ }).should('be.exist');
  cy.findByRole('link', { name: /SSAFY 트랙/ }).should('not.be.exist');
});

it('인증 완료된 SSAFY 멤버', () => {
  cy.visitStory('page-프로필-내-정보-세팅-루트-페이지--certified-ssafy-user');

  assertRequiredActionButtonsExist();

  cy.findByRole('link', { name: /SSAFY 인증/ }).should('not.be.exist');
  cy.findByRole('link', { name: /SSAFY 트랙/ }).should('be.exist');
});

