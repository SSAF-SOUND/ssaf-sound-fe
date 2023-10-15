import Blank from './Blank';

interface QuestionMapProps {
  year: number;
}

const QuestionMap = (props: QuestionMapProps) => {
  const { year } = props;

  switch (year) {
    case 1:
      return (
        <span>
          SSAFY는 <Blank length={2} />
          이다!
        </span>
      );
    case 2:
      return (
        <span>
          SSAFY는 <Blank length={2} /> 다!
        </span>
      );
    case 3:
      return (
        <span>
          SSAFY는 <Blank length={2} /> 다!
        </span>
      );
    case 4:
      return (
        <span>
          사기로 <Blank length={2} />
          ~~
        </span>
      );
    case 5:
      return (
        <span>
          오기로 <Blank length={2} />
          !!
        </span>
      );
    case 6:
      return (
        <span>
          열정6기 <Blank length={3} isAlphabet />~<Blank length={2} />
        </span>
      );
    case 7:
      return (
        <span>
          <Blank length={2} />
          7기
        </span>
      );
    case 8:
      return (
        <span>
          <Blank length={3} />기
        </span>
      );
    case 9:
      return (
        <span>
          <Blank length={5} isAlphabet />~ 9기
        </span>
      );
    case 10:
      return (
        <span>
          <Blank length={2} />
          Up!
        </span>
      );
    default:
      throw new Error(`잘못된 기수가 입력되었습니다. year: ${year}`);
  }
};

export default QuestionMap;
