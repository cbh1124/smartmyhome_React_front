import { API_BASE_URL } from "../app-config";
import { Link } from 'react-router-dom'
const ACCESS_TOKEN = "ACCESS_TOKEN";

export const call = (api, method, request) => {
  
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET method
    options.body = JSON.stringify(request);
    console.log(request)
  }
  let temp;
  return fetch(options.url, options)
    .then ((response) =>{
      if(response.status=== 403 && response.url === "http://localhost:8095/auth/usersearch"){
        window.location.href = "/login";
      }
      return response
    })
    .then((response) =>
        response.json().then((json) => {
          if (!response.ok) {
            // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
            return Promise.reject(json);
          }
            console.log(response)
            temp = json;
          return temp;
        })
    )
    .catch((error) => {
      // 추가된 부분
      if(error === null){
          console.log("에러발생")
      }
      console.log(error)
      if (error.status === 403) {
        window.location.href = "/login"; // redirect
      }else if(error.error === "Login failed"){
        alert("로그인에 실패하였습니다. (아이디, 비밀번호 재확인 필요)")
      }else if(error.error === "NOTUSER"){
        alert("로그인 권한이 존재하지 않습니다.(관리자 로그인 권한 수락 필요)")
      }     
      return Promise.reject(error);
    });
    
}

export const signin = (userDTO) => {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    
    if (response.token) {
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem(ACCESS_TOKEN, response.token);
      // token이 존재하는 경우 메인 화면으로 리디렉트
      if(response.role === "ADMIN"){
        window.location.href= "/usermanage";
      }else{
        window.location.href = "/";
      }
    }

  });
}

export const signout = () => {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/login";
}

export const signup = (userDTO) => {
  return call("/auth/signup", "POST", userDTO);
}

export const useridcheck = (userDTO) => {
  return call("/auth/useridcheck", "POST", userDTO);
}

export const emailcheck = (userDTO) => {
  return call("/auth/emailcheck", "POST", userDTO);
}

export const passwordfind = (userDTO) =>{
  return call("/auth/passwordfind", "POST", userDTO)
}

export const temporaryauth = (userDTO) =>{
  return call("/auth/temporary", "POST", userDTO)
}

export const sensorregist = (userDTO) => {
  return call("/user/regist", "POST", userDTO);
}

export const sensoredit = (userDTO) => {
  return call("/user/edit", "PUT", userDTO);
}

export const sensordelete = (userDTO) => {
  return call("/user/delete", "DELETE", userDTO);
}

export const manager = () => {
  window.location.href = "/manager";
}

export const useredit = (userDTO) =>{
  return call("/auth/useredit", "PUT", userDTO);
}

export const userdelete = (userDTO)=>{
  return call("/auth/userdelete", "DELETE", userDTO);
}

export const noticeregist = (userDTO) => {
  return call("/notice","POST", userDTO);
}

export const noticedelete = (userDTO) =>{
  return call("/notice", "DELETE", userDTO)
}

export const adminmanage = ()=>{
  window.location.href = "/usermanage";
}