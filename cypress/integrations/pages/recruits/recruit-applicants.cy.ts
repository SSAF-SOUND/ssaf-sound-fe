it('내 리쿠르팅이 아닌 경우 권한 없음 오류 메세지가 나타난다.', () => {
  cy.visitStory('page-recruit-리쿠르팅-신청서-목록--not-mine');
  cy.contains(/권한이 없어요/).should('be.exist');
});

it('모집중인 리쿠르팅의 신청서 목록의 경우, 모집 종료 안내문이 보이지 않는다.', () => {
  cy.visitStory('page-recruit-리쿠르팅-신청서-목록--pending-recruit');
  cy.contains(/모집 종료되었습니다/).should('not.be.exist');
});

it('모집 종료된 리쿠르팅의 신청서 목록의 경우, 모집 종료 안내문이 보인다.', () => {
  cy.visitStory('page-recruit-리쿠르팅-신청서-목록--completed-recruit');
  cy.contains(/모집 종료되었습니다/).should('be.exist');
});
