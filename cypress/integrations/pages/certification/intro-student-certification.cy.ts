it('SSAFY 멤버가 아닌 유저는 인증 버튼이 비활성화 된다.', () => {
  cy.visitStory(
    'page-ssafy-인증-ssafy-인증-소개--non-ssafy-user'
  );
  cy.findByText(/SSAFY 학생만 인증할 수 있습니다/)
    .should('exist')
    .and('be.disabled');
});

it('SSAFY 멤버이면서 학생 인증을 하지 않은 유저는 인증 버튼이 활성화 된다.', () => {
  cy.visitStory(
    'page-ssafy-인증-ssafy-인증-소개--uncertified-user'
  );

  cy.findByText(/SSAFY 재학생 인증하기/)
    .should('exist')
    .and('be.not.disabled');
});

it('SSAFY 멤버이면서 학생 인증을 이미 마친 유저는 인증 버튼이 비활성화 된다.', () => {
  cy.visitStory(
    'page-ssafy-인증-ssafy-인증-소개--certified-user'
  );

  cy.findByText(/이미 인증된 계정입니다/)
    .should('exist')
    .and('be.disabled');
});
