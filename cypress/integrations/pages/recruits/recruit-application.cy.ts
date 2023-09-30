const assertExistsApproveButton = () => {
  cy.findByRole('button', { name: /수락/ })
    .as('approveButton')
    .should('be.exist');
};

const assertExistsRejectButton = () => {
  cy.findByRole('button', { name: /거절/ })
    .as('rejectButton')
    .should('be.exist');
};

const assertExistsApproveConfirmText = () => {
  cy.contains('수락함').should('be.exist');
};

const assertExistsRejectConfirmText = () => {
  cy.contains('거절함').should('be.exist');
};

it('내 리쿠르팅이 아니면, 해당 리쿠르팅에 대한 다른 사람의 신청서는 조회할 수 없다.', () => {
  cy.visitStory('page-리쿠르팅-리쿠르팅-신청서--not-mine');

  cy.contains('권한이 없어요').should('be.exist');
});

describe('응답 대기중인 신청서', () => {
  beforeEach(() => {
    cy.visitStory('page-리쿠르팅-리쿠르팅-신청서--pending-recruit-application');
  });

  it('수락할 수 있다.', () => {
    assertExistsApproveButton();
    cy.get('@approveButton').click();
    assertExistsApproveConfirmText();
  });

  it('거절할 수 있다.', () => {
    assertExistsRejectButton();
    cy.get('@rejectButton').click();
    assertExistsRejectConfirmText();
  });
});

describe('모집이 종료될 때 까지 응답하지 않은 신청서', () => {
  it('응답 안함 텍스트가 보인다.', () => {
    cy.visitStory('page-리쿠르팅-리쿠르팅-신청서--initial-recruit-application');

    cy.contains('응답 안함').should('be.exist');
  });
});
