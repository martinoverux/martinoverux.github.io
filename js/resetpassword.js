document.addEventListener("DOMContentLoaded", function(){
    const parentid = localStorage.getItem('id');
    document.querySelector("#idre").value = parentid;
    localStorage.removeItem('id');
});


function signUpVaildate(){
    const userpasswordVal = document.querySelector("#password").value;
    const userpasswordCfVal = document.querySelector("#passwordCheck").value;

    if(!userpasswordVal) {
        alert("비밀번호를 작성해주세요.");
        return false;
      }
      if(!userpasswordCfVal) {
        alert("비밀번호 확인을 작성해주세요.");
        return false;
      }

      // a(?=b)    a이후 b가 나오는 것 매칭. b가 뒤따르는 a를 조회(b는 조회만 하고 최종매칭되지 않는다.)
      //2.비밀번호 확인 검사 
      //숫자/문자/특수문자 포함 형태의 8~16자리 이내의 암호 정규식 
      if(!/(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[a-z0-9!@#$%&*]{8,16}/i.test(userpasswordVal)){
          alert('규칙에 맞게 비밀번호를 8-16자 사이의 영문, 숫자, 특수문자를 포함시켜 만들어 주세요.');
          return false;
      }
  
      //비밀번호일치여부 검사
      if(!(userpasswordVal === userpasswordCfVal)){
          alert('비밀번호가 비밀번호 재입력에 입력된 값과 일치하지 않습니다. 다시 입력해주세요.');
          return false;
      }
}

function resetpassword(){
    const inputId = document.querySelector("#idre").value
    const inputPasword = document.querySelector("#password").value;
    const memberList = JSON.parse(localStorage.getItem('memberList')) || [];

        if(memberList.length == 0){
            alert("정보를 확인할 수 없습니다. 신규가입을 해주세요.");
             // 현재 창 닫기
             self.close();
        }
        else {
            for(let i = 0; i < memberList.length; i++){
                if(memberList[i].userid == inputId){

                    const member = new Member(memberList[i].userid, inputPasword, memberList[i].username, memberList[i].userphone, memberList[i].useremail, memberList[i].useraddress,  memberList[i].userbirth,  memberList[i].datetime);
                    memberList[i] = member;
                    localStorage.setItem('memberList', JSON.stringify(memberList));

                    alert(`비밀번호 재설정이 완료되었습니다.`);
                    
                    // 현재 창 닫기
                    self.close();
                }
            } 
        } 
    }

    class Member {
        constructor(userid, userpassword, username, userphone, useremail, useraddress = "", userbirth = "", datetime = Date.now()){
            this.userid = userid;
            this.userpassword = userpassword;
            this.username = username;
            this.userphone = userphone;
            this.useremail = useremail;
            this.useraddress = useraddress;
            this.userbirth = userbirth;
            this.datetime = datetime;
        }
      }