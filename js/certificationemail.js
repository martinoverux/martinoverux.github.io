document.addEventListener("DOMContentLoaded", function(){
    const parentname = opener.document.querySelector("#user_name").value;
    document.querySelector("#nameId").value = parentname;
});
    
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
    function sendCertcode() {
      
      const inputName =  document.querySelector("#nameId").value;
      const inputEmail = document.querySelector("#emailId").value;
      const certcode = certificationCode;

      inputvaildate();
        
      let templateParams  = {
          name : inputName,
          email : inputEmail,
          message : certcode
      };
      console.log(templateParams);
      emailjs.send('service_q105rgm', 'template_xtqu1tv', templateParams)
            .then(function(response){
            console.log('Success!', response.status, response.text);
             }, function(error){
            console.log('Failed...', error);
        }); 
    };
  
    function checkCertCode(){
        const memberList = JSON.parse(localStorage.getItem('memberList')) || [];
        const inputCode = document.querySelector("#certificationcode").value;
        const inputEmail = document.querySelector("#emailId").value;
        const certcode = certificationCode;

        if(certcode == inputCode){
            if(memberList.length ==  0){
                alert("본인인증이 완료되었습니다.");
                // 본인 인증에 통과된 이메일의 값을 해당 필드에 넣는다.
                opener.document.querySelector("#email").value = inputEmail;
                // 커서를 주소 필드로 이동한다.
                opener.document.querySelector("#address").focus();
                // 현재 창 닫기
                self.close();
            }
            else {
                for(let i = 0; i < memberList.length; i++){
                    if(memberList[i].useremail == inputEmail){
                        alert("입력하신 이메일은 이미 등록된 이메일입니다.");
                        self.close();
                    }
                } 
                alert("본인인증이 완료되었습니다.");
                // 본인 인증에 통과된 이메일의 값을 해당 필드에 넣는다.
                opener.document.querySelector("#email").value = inputEmail;
                // 커서를 주소 필드로 이동한다.
                opener.document.querySelector("#address").focus();
                    // 현재 창 닫기
                self.close();
            } 
        }
        else{
            alert("인증코드가 일치하지 않습니다. 다시 시도해 주세요.");
        }
        
    };

    function inputvaildate() {
        const usernameVal = document.querySelector("#nameId").value;
        const useremailVal = document.querySelector("#emailId").value;
        if(!usernameVal) {
            alert("이름을 작성해주세요.");
            return false
           }

        if(!useremailVal) {
            alert("이메일을 작성해주세요.");
            return false
          }
           
        //.이름검사 : 한글2글자 이상만 허용. 
        if(!/^[가-힣]{2,}$/.test(usernameVal)){
            alert('이름에는 2글자 이상의 한글만 사용할 수 있습니다.');
            return false;
        }

        //이메일 검사
        if(!/^[a-z0-9]{4,12}[@].+[.][a-zA-Z]{2,3}$/i.test(useremailVal)){
            alert('이메일은 @가 포함되어야 하며, 아이디의 길이는 4~12자리이어야 합니다.');
            return false;
       }  
    };