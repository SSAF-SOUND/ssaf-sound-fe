it('SSAFY 멤버 + SSAFY 인증 안한 경우', () => {
  cy.visitStory(
    'page-프로필-내-정보-세팅-ssafy-기본정보-수정--un-certified-ssafy-user'
  );

  cy.findByLabelText(/SSAFY인 여부/)
    .as('ssafyMemberSelectBox')
    .should('not.be.disabled');

  // SSAFY 멤버 여부 "네" 체크시, 나머지 Select 활성화
  cy.get('@ssafyMemberSelectBox').click();
  cy.findByRole('option', { name: /네/ }).click();
  cy.findByLabelText(/SSAFY 기수 선택/)
    .as('ssafyYearSelectBox')
    .should('not.be.disabled');
  cy.findByLabelText(/SSAFY 캠퍼스 선택/)
    .as('ssafyCampusSelectBox')
    .should('not.be.disabled');

  // SSAFY 멤버 여부 "아니오" 체크시, 나머지 Select 비활성화
  cy.get('@ssafyMemberSelectBox').click();
  cy.findByRole('option', { name: /아니오/ }).click();
  cy.findByLabelText(/SSAFY 기수 선택/)
    .as('ssafyYearSelectBox')
    .should('be.disabled');
  cy.findByLabelText(/SSAFY 캠퍼스 선택/)
    .as('ssafyCampusSelectBox')
    .should('be.disabled');
});

it('SSAFY 멤버 + SSAFY 인증 완료한 경우', () => {
  cy.visitStory(
    'page-프로필-내-정보-세팅-ssafy-기본정보-수정--certified-ssafy-user'
  );

  // SSAFY 멤버 여부 수정 불가능, 나머지 Select 활성화
  cy.findByLabelText(/SSAFY인 여부/).should('be.disabled');

  cy.findByLabelText(/SSAFY 기수 선택/).should('not.be.disabled');

  cy.findByLabelText(/SSAFY 캠퍼스 선택/).should('not.be.disabled');
});
