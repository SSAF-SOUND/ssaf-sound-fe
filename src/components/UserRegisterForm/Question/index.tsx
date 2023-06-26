import QuestionRoot from './Root';
import QuestionRow from './Row';

const Question = Object.assign(QuestionRoot, {
  Row: QuestionRow,
});

export default Question;
