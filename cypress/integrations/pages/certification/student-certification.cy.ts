const answerValue = 'ans';
const skipToSubmitAnswer = (value: string) => {
  cy.findByRole('combobox').realClick();
  cy.findByRole('option', { name: 'Python' }).realClick();
  cy.findByPlaceholderText('단어를 입력해주세요').realClick().realType(value);
  cy.findByRole('button', { name: '확인' }).realClick();
};

it('정답을 입력하는 경우 인증 완료 알림창이 팝업되고, 확인 버튼을 누르면 생성된 유저의 네임카드를 볼 수 있다.', () => {
  cy.visitStory('page-certification-student-certification--correct-answer');

  skipToSubmitAnswer(answerValue);
  cy.findByRole('dialog').should('be.exist');
  cy.findByRole('dialog').findByRole('button', { name: '확인' }).realClick();
  cy.findByText(/프로필이 생성되었습니다/).should('be.exist');

  cy.get('a').should('have.attr', 'href', '/main');
});

it('오답을 입력하는 경우 오답 알림창이 팝업된다.', () => {
  cy.visitStory('page-certification-student-certification--incorrect-answer');

  skipToSubmitAnswer(answerValue);
  cy.findByRole('dialog').should('be.exist');
  cy.findByRole('dialog').findByRole('button', { name: '확인' }).realClick();
  cy.findByRole('textbox').should('be.exist');
});

it('시도 횟수를 초과했는데 입력하는 경우 알림 메세지가 팝업된다.', () => {
  cy.visitStory('page-certification-student-certification--no-more-attempts');

  skipToSubmitAnswer(answerValue);
  cy.findByRole('status').should('be.exist');
});
