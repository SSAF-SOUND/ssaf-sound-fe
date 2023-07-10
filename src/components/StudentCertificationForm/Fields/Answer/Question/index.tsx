import Blank from './Blank';

interface QuestionProps {
  year: number;
}

const Question = (props: QuestionProps) => {
  const { year } = props;

  switch (year) {
    case 1:
      return (
        <p>
          SSAFY는 <Blank length={2} />
          이다!
        </p>
      );
    case 2:
      return (
        <p>
          SSAFY는 <Blank length={2} /> 다!
        </p>
      );
    case 3:
      return (
        <p>
          SSAFY는 <Blank length={2} /> 다!
        </p>
      );
    case 4:
      return (
        <p>
          사기로 <Blank length={2} />
          ~~
        </p>
      );
    case 5:
      return (
        <p>
          오기로 <Blank length={2} />
          !!
        </p>
      );
    case 6:
      return (
        <p>
          열정6기 <Blank length={3} />~<Blank length={2} />
        </p>
      );
    case 7:
      return (
        <p>
          <Blank length={2} />
          7기
        </p>
      );
    case 8:
      return (
        <p>
          <Blank length={3} />기
        </p>
      );
    case 9:
      return (
        <p>
          <Blank length={5} />~ 9기
        </p>
      );
    case 10:
      return (
        <p>
          <Blank length={2} />
          Up!
        </p>
      );
    default:
      throw new Error(`잘못된 기수가 입력되었습니다. year: ${year}`);
  }
};

export default Question;
