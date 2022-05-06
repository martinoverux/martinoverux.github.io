    // 인증코드 생성
    const generateRandomCode = () => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789012345678901234567890123456789';
        let resultCode= '';
        const charLen = characters.length;
        for(let i = 0; i < 6; i++ ){
            resultCode += characters.charAt(Math.floor(Math.random() * charLen));
        }
        return resultCode;
    }
  
    const certificationCode = generateRandomCode();
    console.log(certificationCode);

    let newWindow;

    function sendCertcodeForPassword() {
        const inputId = document.querySelector("#idPw").value;
        const inputEmail = document.querySelector("#emailPw").value;
        const certcode = certificationCode;

        inputvaildate();

        let templateParams  = {
            name : inputId,
            email :inputEmail,
            message : certcode,
        }
        console.log(templateParams);
        emailjs.send('service_q105rgm', 'template_rzfxw6f', templateParams).then(function(response){
            console.log('Success!', response.status, response.text);
        }, function(error){
            console.log('Failed...', error);
        })
    }

    const checkCertCode = () => {
        const memberList = JSON.parse(localStorage.getItem('memberList')) || [];
        const inputId = document.querySelector("#idPw").value;
        const inputCode = document.querySelector("#certificationCodePw").value;
        const inputEmail = document.querySelector("#emailPw").value;
        const certcode = certificationCode;

        if(certcode == inputCode){
            if(memberList.length ==  0){
                alert("일치하는 정보가 없습니다. 신규가입을 해주세요.");
                // 커서를 아이디 필드로 이동한다.
                opener.document.querySelector("#input-user-id").focus();
                // 현재 창 닫기
                self.close();
            }
            else {
                for(let i = 0; i < memberList.length; i++){
                    if(memberList[i].useremail == inputEmail && memberList[i].userid == inputId){
                        alert(`본인인증이 완료되었습니다. ${inputId} 회원님의 비밀번호를 재설정해주세요.`);
                        // 비밀번호 재설정 창으로 이동
                        localStorage.setItem('id', inputId);
                        newWindow = open("resetPassword.html", "_self", "");
                    }
                } 
            } 
        }
        else{
            alert("인증코드가 일치하지 않습니다. 다시 시도해 주세요.");
        }
    }

function inputvaildate(){
    const userIdVal = document.querySelector("#idPw").value;
    const useremailVal = document.querySelector("#emailPw").value;

    if(!userIdVal) {
        alert("아이디를 입력해주세요.");
        return false;
      }

    if(!useremailVal) {
        alert("이메일을 입력해주세요.");
        return false;
      }

    //1.아이디검사
    //아이디의 길이는(6~16자 영문, 숫자포함)
    if(!/^[a-zA-Z0-9]{6,16}$/.test(userIdVal)){
        alert('규칙에 맞게 아이디를 6-16자 사이의 숫자를 포함하는 영문자로 입력해주세요.');
        return false;
    }

    //2..이메일 검사
    if(!/^[a-z0-9]{4,12}[@].+[.][a-zA-Z]{2,3}$/i.test(useremailVal)){
        alert('이메일은 @가 포함되어야 하며, 아이디의 길이는 4~12자리이어야 합니다.');
        return false;
    }

}