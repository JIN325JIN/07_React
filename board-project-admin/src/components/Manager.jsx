import React, { useState, useEffect } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Manager() {
  const [isLoading, setIsLoading] = useState(true);

  // 이메일 , 닉네임 , 전화번호
  // 객체 하나로 상태 관리하는 방식

  // const [email, setEmail] = useState("");
  // 이게 그동안 우리가 썻던 방식

  const [form, setForm] = useState({
    email: "",
    nickname: "",
    tel: "",
  });

  const [adminAccountList, setAdminAccountList] = useState([]); // ✅ 관리자 목록 상태

  // 객체 형태 상태 변경 함수
  const handleChange = (e) => {
    const { id, value } = e.target; // 대상 id속성값, value값을 꺼내옴

    setForm((prev) => ({
      ...prev, // 전개 : 전개 연산자
      [id]: value,
    }));
  };

  // ✅ 관리자 목록 조회
  const fetchAdminAccountList = async () => {
    setIsLoading(true); // ✅ 로딩 시작
    try {
      const response = await axiosApi.get("/admin/adminAccountList");
      if (response.status === 200) {
        setAdminAccountList(response.data);
      }
    } catch (error) {
      console.error("관리자 목록 조회 실패", error);
    } finally {
      setIsLoading(false); // ✅ 로딩 종료
    }
  };

  // ✅ 페이지 로드 시 목록 조회
  useEffect(() => {
    fetchAdminAccountList();
  }, []);

  //관리자 계정 발급
  async function createAdminAccount() {
    const { email, nickname, tel } = form; // form 상태 안에 있는 값들 하나씩 꺼내오기

    if (email.length === 0 || nickname.length === 0 || tel.length === 0) {
      alert("모든 필드를 입력해주세요!");
      return;
    }
    try {
      const response = await axiosApi.post("/admin/createAdminAccount", {
        memberEmail: email,
        memberNickname: nickname,
        memberTel: tel,
      });
      if (response.status === 201) {
        const result = response.data; // 서버에서 응답해준 데이터(body)
        alert(`발급 된 비밀번호는 ${result} 입니다. 다시 확인할 수 없으니 저장해주시기 바랍니다.
          메모 필수 !!!!`);
        console.log(result);
      }

      //입력 필드 초기화
      setForm({
        email: "",
        nickname: "",
        tel: "",
      });

      fetchAdminAccountList(); // ✅ 리스트 갱신
    } catch (error) {
      alert(error.response.data);
      // 409 일때, 500 일때 응답받은 body 내용이 반영되어 alert 출력할 수 있게끔 함
    }
  }
  return (
    <>
      <div className="manager-div">
        <section className="manager-section">
          <h2>관리자 계정 발급</h2>
          <table>
            <tr>
              <td>사용할 이메일 : </td>
              <td>
                <input
                  id="email"
                  type="email"
                  placeholder="ex) admin2@kh.or.kr"
                  value={form.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>사용할 이름 : </td>
              <td>
                <input
                  id="nickname"
                  type="text"
                  placeholder="ex) 관리자2"
                  value={form.nickname}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>사용할 전화번호 : </td>
              <td>
                <input
                  id="tel"
                  type="text"
                  placeholder="ex) 01012341234"
                  value={form.tel}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </table>
          <button className="issueBtn" onClick={createAdminAccount}>
            발급
          </button>
        </section>

        <section className="manager-section">
          <h2>관리자 계정 목록</h2>
          {isLoading ? (
            <p>⏳ 관리자 목록을 불러오는 중입니다...</p>
          ) : (
            <table className="manager-list-table" border={1}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>이메일</th>
                  <th>관리자명</th>
                </tr>
              </thead>
              <tbody>
                {adminAccountList.map((admin) => (
                  <tr key={admin.memberNo}>
                    <td>{admin.memberNo}</td>
                    <td>{admin.memberEmail}</td>
                    <td>{admin.memberNickname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </>
  );
}
