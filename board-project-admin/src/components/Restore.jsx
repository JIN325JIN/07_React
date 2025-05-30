import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Restore() {
  // 함수형 컴포넌트
  const [withdrawnMembers, setWithdrawnMembers] = useState(null); // 탈퇴 회원 목록 ( 빈배열대신에 null)
  const [deleteBoards, setDeleteBoards] = useState(null); // 삭제 게시글 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 탈퇴한 회원 목록 조회용 함수
  const getWithdrawnMemberList = async () => {
    try {
      const resp = await axiosApi.get("/admin/withdrawnMemberList");

      console.log(resp.data);

      if (resp.status === 200) {
        setWithdrawnMembers(resp.data);
      }
    } catch (error) {
      console.log("탈퇴 회원 목록 조회중 에러 발생 : ", error);
    }
  };
  // 탈퇴한 회원 복구 요청 함수
  const restoreMember = async (member) => {
    // 복구 요청
    // 복구 되었음 하고 응답 옴
    // ->

    if (window.confirm(member.memberNickname + "님을 복구 시키겠습니까?")) {
      try {
        const resp = await axiosApi.put("/admin/restoreMember", {
          memberNo: member.memberNo,
        });
        if (resp.status === 200) {
          alert("복구 되었습니다!");
          getWithdrawnMemberList(); // 꼭 필요함
          // 복구된 데이터 ( 업데이트된 내역을 확인하기 위해서)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 삭제된 게시글 목록 조회용 함수
  const getDeleteBoardList = async () => {
    try {
      const resp = await axiosApi.get("/admin/deleteBoardList");
      console.log(resp.data);

      if (resp.status === 200) {
        setDeleteBoards(resp.data);
      }
    } catch (error) {
      console.log("삭제된 게시글 목록 조회중 에러 발생 : ", error);
    }
  };
  // 삭제된 게시글 복구 요청 함수
  const restoreBoard = async (board) => {
    if (window.confirm(board.boardNo + "번 게시글을 복구 시키겠습니까?")) {
      try {
        const resp = await axiosApi.put("/admin/restoreBoard", {
          boardNo: board.boardNo,
        });
        if (resp.status === 200) {
          alert("복구 되었습니다!");
          getDeleteBoardList(); // 꼭 필요함
          // 복구된 데이터 ( 업데이트된 내역을 확인하기 위해서)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Restore 컴포넌트가 처음 렌더링 될 때 수행시킬 훅
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardList();
  }, []);
  // withdrawMembers, deleteBoards 상태가 변경되었을때 (IsLoading 값 false로 변경)
  useEffect(() => {
    if (withdrawnMembers != null && deleteBoards != null) {
      setIsLoading(false);
    }
  }, [withdrawnMembers, deleteBoards]);
  if (isLoading) {
    return <h1>Loading.....</h1>;
  } else {
    return (
      <div className="menu-box">
        <RestoreMember
          withdrawnMembers={withdrawnMembers}
          restoreMember={restoreMember}
        />
        <RestoreBoard deleteBoards={deleteBoards} restoreBoard={restoreBoard} />
      </div>
    );
  }
}
const RestoreMember = ({ withdrawnMembers, restoreMember }) => {
  // = const RestoreMember = (props) => {
  return (
    <section className="section-border">
      <h2>탈퇴 회원 복구</h2>

      <h3>탈퇴한 회원 목록</h3>

      {withdrawnMembers.length === 0 ? (
        <p>탈퇴한 회원이 없습니다</p>
      ) : (
        withdrawnMembers.map(() => {
          return (
            // 중괄호{} 쓰면 return 필수
            // return 생략하려면 ()
            <ul className="ul-board" key={index}>
              <li>회원 번호 : {member.memberNo}</li>
              <li>회원 이메일 : {member.memberEmail}</li>
              <li>회원 닉네임 : {member.memberNickname}</li>
              <button
                className="restoreBtn"
                onClick={() => RestoreMember(Member)}
              >
                {" "}
                복구{" "}
              </button>
            </ul>
          );
        })
      )}
    </section>
  );
};

const RestoreBoard = ({ deleteBoards, restoreBoard }) => {
  return (
    <section className="section-border">
      <h2>삭제 게시글 복구</h2>

      <h3>삭제된 게시글 목록</h3>
      {deleteBoards.length === 0 ? (
        <p>삭제된 게시글이 없습니다</p>
      ) : (
        deleteBoards.map((board, index) => (
          <ul className="ul-board" key={index}>
            <li>게시글 번호 : {board.boardNo} </li>
            <li>게시글 카테고리 : {board.boardName}</li>
            <li>게시글 제목 : {board.boardTitle}</li>
            <li>작성자 닉네임 : {board.memberNickname}</li>
            <button className="restoreBtn" onClick={() => restoreBoard(board)}>
              복구
            </button>
          </ul>
        ))
      )}
    </section>
  );
};
