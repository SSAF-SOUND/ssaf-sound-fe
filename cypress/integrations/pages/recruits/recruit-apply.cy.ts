const checkNotApplicable = () => {
  cy.findByRole('heading', { name: /지원할 수 없습니다/ }).should('be.exist');
};

const checkApplicable = () => {
  cy.findByRole('heading', { name: /지원할 수 없습니다/ }).should(
    'not.be.exist'
  );
};

it('내 리쿠르팅은 신청할 수 없다.', () => {
  cy.visitStory('page-리쿠르팅-리쿠르팅-신청하기--mine');

  // 신청할 수 없다.
  checkNotApplicable();
});

it('신청 후 응답 대기중에는, 다시 신청할 수 없다.', () => {
  cy.visitStory('page-리쿠르팅-리쿠르팅-신청하기--pending-applicant');

  checkNotApplicable();
});

it('신청 후 거절되었다면, 다시 신청할 수 있다.', () => {
  cy.visitStory('page-리쿠르팅-리쿠르팅-신청하기--rejected-applicant');

  checkApplicable();
});

it('신청 후 수락되었다면, 다시 신청할 수 없다.', () => {
  cy.visitStory('page-리쿠르팅-리쿠르팅-신청하기--success-applicant');

  checkNotApplicable();
});

it('종료된 리쿠르팅에는 신청할 수 없다.', () => {
  cy.visitStory('page-리쿠르팅-리쿠르팅-신청하기--completed-recruit');

  checkNotApplicable();
});
