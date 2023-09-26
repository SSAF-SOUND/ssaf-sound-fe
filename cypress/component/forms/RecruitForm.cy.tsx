import RecruitForm from '~/components/Forms/RecruitForm';

describe('', () => {
  it('', () => {
    const onValidSubmit = cy.stub();

    cy.mount(<RecruitForm onValidSubmit={onValidSubmit} />);
    cy.findByText('모집 인원').should('be.exist');
  });
});
