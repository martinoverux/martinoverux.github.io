let newWindowCheckId;
const openCheckId= () => {
  newWindowCheckId = open("checkid.html", "popup", "width=510, height=350, top=300, left=200");
};

let newWindowCertificationByEmail;
const openCertEmail= () => {
  newWindowCertificationByEmail = open("certificationemail.html", "popup", "width=520, height=500, top=300, left=200");
};


function searchAddress() {
    const width = 500;
    const height = 600;
    new daum.Postcode({
        width: width,
        height: height,
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let addr = ''; // 주소 변수
            let extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("extraAddress").value = extraAddr;
                
            } else {
                document.getElementById("extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("address_detail").focus();
        }
    }).open({
        left: (window.screen.width /2 ) -(width / 2 ),
        height: (window.screen.height /2 ) -(height / 2 )
    });
}

// 검사
const checkValues = () => {
    const useridVal = document.querySelector("#id").value;
    const userpasswordVal = document.querySelector("#password").value;
    const userpasswordCfVal = document.querySelector("#password_confirm").value;
    const usernameVal = document.querySelector("#user_name").value;
    const userphoneVal = document.querySelector("#phone").value;
    const useremailVal = document.querySelector("#email").value;
    
    if(!useridVal) {
      alert("아이디를 작성해주세요.");
      return false;
    }
    if(!userpasswordVal) {
      alert("비밀번호를 작성해주세요.");
      return false;
    }
    if(!userpasswordCfVal) {
      alert("비밀번호 확인을 작성해주세요.");
      return false;
    }
    if(!usernameVal) {
      alert("이름을 작성해주세요.");
      return false;
    }
    if(!userphoneVal) {
      alert("전화번호를 작성해주세요.");
      return false;
    }
    if(!useremailVal) {
      alert("이메일을 작성해주세요.");
      return false;
    }

        //1.아이디검사
    //아이디의 길이는(6~16자 영문, 숫자포함)
    if(!/^[a-zA-Z0-9]{6,16}$/.test(useridVal)){
        alert('규칙에 맞게 아이디를 6-16자 사이의 숫자를 포함하는 영문자로 만들어 주세요.');
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

    //3.이름검사 : 한글2글자 이상만 허용. 
    
    // 한글 검사
    if(!/^[가-힣]{2,}$/.test(usernameVal)){
        alert('이름에는 2글자 이상의 한글만 사용할 수 있습니다.');
        return false;
    }

    //4. 휴대폰 번호 검사
    // 01x 시작, 총 10~11자리
    // 숫자 여부 검사
    
    if(!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(userphoneVal)){
        alert('전화번호에는 숫자만 입력해야 합니다.');
        return false;
    }

    //5.이메일 검사
    if(!/^[a-z0-9]{4,12}[@].+[.][a-zA-Z]{2,3}$/i.test(useremailVal)){
        alert('이메일은 @가 포함되어야 하며, 아이디의 길이는 4~12자리이어야 합니다.');
        return false;
    }
  };

  // 신규회원 등록 함수
    let newWindow;
    const enrollMemberInfo = () => {
        checkValues();
        const day = pluszero(document.querySelector("#day").value);
        
        console.log("enrollMemberInfo 호출!");
        const useridVal = document.querySelector("#id").value;
        const userpasswordVal = document.querySelector("#password").value;
        const usernameVal = document.querySelector("#user_name").value;
        const userphoneVal = document.querySelector("#phone").value;
        const useremailVal = document.querySelector("#email").value;
        const useraddressVal = document.querySelector("#address").value + " " + document.querySelector("#address_detail").value + " " + document.querySelector("#extraAddress").value;
        const usebirthVal = document.querySelector("#year").value + document.querySelector("#month").value + day;

        // 신규 회원 생성
        const member = new Member(useridVal, userpasswordVal, usernameVal, userphoneVal, useremailVal, useraddressVal, usebirthVal);

        // memberList 관리
        const memberList = JSON.parse(localStorage.getItem('memberList')) || [];
        
        memberList.push(member);
        
        localStorage.setItem('memberList', JSON.stringify(memberList));
        
        // 폼초기화
        document.querySelector('#signupFrm').reset();

        // 현재 창에서 페이지 이동
        newWindow = open("index.html", "_self", "");
        
        alert(`${usernameVal}님 회원가입이 완료되었습니다.`);
    
    };

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

  // 생년월일 중 일이 10보다 작을 때 0을 추가하는 함수
  const pluszero = (day) => {
    if(day < 10) {
        return day = "0"+ day;
    }
    else  {
        return day
    }
  }