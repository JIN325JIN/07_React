// JSX 예제

import { useState } from "react";
import test1 from "../assets/test1.jpg";

const Exam5 = () => {
  // return <Exam5_1 />;
  // return <Exam5_2 />;
  // return <Exam5_3 isLogin={false} />;
  //return <Exam5_4 isLogin={true} />;
  return <Exam5_5 />;
};

//JSX 예제 1: 자바 스크립트 변수로 사용하기
const Exam5_1 = () => {
  const name = "React";
  const element = <h1>HELLO, {name}</h1>;

  return element;
};

// JSX 예제 2: img 태그 이미지 사용
const Exam5_2 = () => {
  const [userImg, setUserImg] = useState(
    "https://www.cnbnews.com/data/photos/cdn/20180206/art_1517968243.jpg"
  );

  return <img src={test1} />;
};

//JSX 예제 3 : 로그인 여부에 따라 화면 다르게 보이기(if else문)
const Exam5_3 = (props) => {
  //const Exam5_3 = ({isLogin}) => {};
  // 조건문 사용!

  if (props.isLogin) {
    return <h1>환영합니다.</h1>;
  } else {
    return <h1>로그인 해주세요~!</h1>;
  }
};

// JSX 예제 4: 로그인 여부에 따라 화면 다르게 보이기 ( 삼항 연산자)
const Exam5_4 = (props) => {
  return <h1>{props.isLogin ? "환영합니다" : "로그인 바람;;"}</h1>;
};

// JSX 예제 5 : 배열을 이용한 화면 렌더링 방법 ( ***중요 : 자주 사용 !!! ***)
// - 클라이언트 (React) <-> 서버 (SpringBoot)
// - 서버에서 응답받은 데이터는 대부분 배열 ( List ) 형태
const Exam5_5 = () => {
  // 서버에서 아래 배열 (list) 를 응답 받았다고 가정
  const members = ["짱구", "유리", "철수", "훈이", "맹구"];

  // JS 내장 함수 중 배열을 하나씩 순차접근 해서 콜백 함수 내에 있는 내용 수행 후
  // 새로운 배열을 만들어 반환 -> map
  // [<li>짱구</li>,<li>유리</li>,<li>철수</li>,<li>훈이</li>,<li>맹구</li>]

  //1. filter : 콜백 함수 내에서 걸러서 필요한것만 추출
  //2. map
  //3. reduce : 누적

  const listItems = members.map((mem, index) => <li key={index}>{mem}</li>);

  //Each child in a list should have a unique "key" prop.
  // -> React 에서 동적인 리스트를 렌더링 할 때
  // 각 자식 컴포넌트가 고유한 key 속성을 가져야 한다는 규칙 위배시 발생하는 경고

  return <ul>{listItems}</ul>;
};

export default Exam5;
