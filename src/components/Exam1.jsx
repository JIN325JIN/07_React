import { Component } from "react";

// 클래스형 컴포넌트 Exam1 정의
class Exam1 extends Component {
  //React. Component 클래스 상속받아 클래스형 컴포넌트 정의

  //생성자 정의 . props 는 부모 컴포넌트로 부터 전달 받은 data
  constructor(props) {
    super(); //부모 클래스( 부모 컴포넌트)의  생성자를 호출.

    // this.state : 클래스형 컴포넌트에서 컴포넌트의 상태 (state) 객체를 의미함
    this.state = { count: 0 }; // state(상태) 중 count 상태 0으로 초기화

    console.log("생성자 호출");
  }

  // 생명 주기 코드

  // 컴포넌트가 처음 화면에 나타났을 때
  componentDidMount() {
    console.log("componentDidMount : 마운트 완료");
  }

  // props 나 state가 변경된 후
  componentDidUpdate(prevProps, prevState) {
    console.log("compontDidUpdate : 업데이트 완료");
    console.log("이전 state :", prevState.count);
    console.log("현재 state :", this.state.count);
  }

  // 컴포넌트가 화면에서 제거 될 때
  componentWillUnmount() {
    console.log("componentwillUnmount : 언마운트 됨");
  }

  //클래스형 컴포넌트 문법으로 정의된 함수.
  // 버튼 클릭 시 호출되는 이벤트 핸들러 함수
  handleClick = () => {
    //상태 업데이트 . count 값을 기존 값 + 1으로 업데이트
    this.setState({ count: this.state.count + 1 });
  };

  //랜더링 되는 메서드 . JSX를 반환하여 화면에 UI 랜더링( 그린다)
  render() {
    return (
      <div>
        <h1>Count name :{this.state.count}</h1>
        <button onClick={this.handleClick}>증가 버튼 </button>

        <h2>
          부모로 부터 전달 받은 값 : {this.props.yoonjin} {this.props.test}
        </h2>
      </div>
    );
  }
}

// 다른 파일에서 해당 파일 (Exam1.jsx)으로 지정된 컴포넌트 (Examp1)를 사용할 수 있도록 내보냄 (수출함)
export default Exam1;
