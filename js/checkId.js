
 function vaildateCheck() {
     const useridVal = document.querySelector("#inputid").value;
     if(!useridVal) {
         alert("아이디를 작성해주세요.");
            return false
        }
        
        //1.아이디검사
        //아이디의 길이는(6~16자 영문, 숫자포함)
        if(!/^[a-zA-Z0-9]{6,16}$/.test(useridVal)){
            alert('규칙에 맞게 아이디를 6-16자 사이의 숫자를 포함하는 영문자로 만들어 주세요.');
            return false;
        }
        checkId();
    }
    
    function checkId(){
    const useridVal = document.querySelector("#inputid").value;
    const memberList = JSON.parse(localStorage.getItem('memberList')) || [];
    
    function inputIdValue() {
        // 중복검사에 통과된 아이디의 값을 해당 필드에 넣는다.
        opener.document.querySelector("#id").value = useridVal;
        
        // 커서를 비밀번호 필드로 이동한다.
        opener.document.querySelector("#password").focus();
    
        // 현재 창 닫기
        self.close();
    }

        if(memberList.length == 0){
            alert("사용할 수 있는 아이디입니다.");
            inputIdValue(useridVal);
        }
        else{
            for(let i = 0; i < memberList.length; i++){
                if(memberList[i].userid == useridVal) {
                    alert("중복되는 아이디가 이미 있습니다. 다른 아이디를 사용해주세요.");
                    document.querySelector('#formId').reset();
                    exit();
                }
            }
            alert("사용할 수 있는 아이디입니다.");
            inputIdValue();
        }
    }

