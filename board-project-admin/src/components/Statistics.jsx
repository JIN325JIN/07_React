import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Statistics() {
  const [readCountData, setReadCountData] = useState(null);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commentCountData, setCommentCountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentSignUp, setRecentSignUp] = useState([]);

  // 최근 가입한 회원의 수
  const getRecentSignUp = async (i) => {
    try {
      const resp = await axiosApi.get("/admin/getRecentSignUp");
      console.log(resp.data);

      if (resp.status === 200) {
        setRecentSignUp(resp.data);
      }
    } catch (error) {
      console.log("최근 회원 가입 회원 수 조회 중 예외 발생 : ", error);
    }
  };

  // 최대 조회수 게시글 조회
  const getMaxReadCount = async () => {
    try {
      const resp = await axiosApi.get("/admin/maxReadCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setReadCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 조회 수 게시글 조회 중 예외 발생 : ", error);
    }
  };
  // 최대 좋아요수 게시글 조회
  const getMaxLikeCount = async () => {
    try {
      const resp = await axiosApi.get("/admin/maxLikeCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setLikeCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 좋아요 수 게시글 조회 중 예외 발생 : ", error);
    }
  };
  // 최대 댓글수 게시글 조회
  const getMaxCommentCount = async () => {
    try {
      const resp = await axiosApi.get("/admin/maxCommentCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setCommentCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 댓글 수 게시글 조회 중 예외 발생 : ", error);
    }
  };
  // 컴포넌트가 처음 마운트 될 때 딱 1번만 실행
  // -> Statistics 컴포넌트가 화면에 마운트 될때 서버로 세가지 데이터 요청, 응답 받아야 함.

  useEffect(() => {
    getMaxReadCount();
    getMaxLikeCount();
    getMaxCommentCount();
  }, []); // 의존성 배열이 비어있기 때문에 1번만 실행

  //readCountData, likeCountData, commentCountData에 변화가 감지될 때
  // -> isLoading 상태값을 false 로 변경하기
  useEffect(() => {
    if (
      readCountData != null &&
      likeCountData != null &&
      commentCountData != null
    ) {
      setIsLoading(false);
    }
  }, [readCountData, likeCountData, commentCountData]);

  if (isLoading) {
    return <h1>Loading.....</h1>;
  } else {
    return (
      <div>
        <p1>신규 가입회원 ( {re} 명)</p1>
        <P>회원 번호 : {recentSignUp.memberNo}</P>
        <P>이메일 : {recentSignUp.memberEmail}</P>
        <P>닉네임 : {recentSignUp.memberNickname}</P>
        <p>가입일 : {recentSignUp.enrollDate}</p>

        <section className="statistics-section">
          <h2>가장 조회수 많은 게시글</h2>
          <p>게시판 종류 : {readCountData.boardName}</p>
          <p>
            게시글 번호/ 제목 : NO. {readCountData.boardNo}/{""}
            {readCountData.boardTitle}
          </p>
          <p>게시글 조회 수 : {readCountData.readCount}</p>
          <p>작성자 닉네임 : {readCountData.memberNickname}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 좋아요 많은 게시글</h2>
          <p>게시판 종류 : {likeCountData.boardName}</p>
          <p>
            게시글 번호/ 제목 : NO. {likeCountData.boardNo}/{""}
            {likeCountData.boardTitle}
          </p>
          <p>게시글 좋아요 수 : {likeCountData.likeCount}</p>
          <p>작성자 닉네임 : {likeCountData.memberNickname}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 댓글 많은 게시글</h2>
          <p>게시판 종류 : {commentCountData.boardName}</p>
          <p>
            게시글 번호/ 제목 : NO. {commentCountData.boardNo}/{""}
            {commentCountData.boardTitle}
          </p>
          <p>게시글 댓글 수 : {commentCountData.commentCount}</p>
          <p>작성자 닉네임 : {commentCountData.memberNickname}</p>
        </section>
      </div>
    );
  }
}
