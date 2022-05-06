  let newWindowId;
  const openFindId = () => {
    newWindowId = open("findid.html", "popup", "width=510, height=430, top=300, left=200");
  };

  let newWindowPw;
  const openFindPassword = () => {
    newWindowPw = open("findpassword.html", "popup", "width=510, height=450, top=300, left=200");
  };

  let newWindowQue;
  const memberquery = () => {
    newWindowQue = open("memberquery.html", "popup", "width=1024, height=900, top=300, left=200");
  };


 function login(){
    const memberList = JSON.parse(localStorage.getItem('memberList'));
    const inputidVal = document.querySelector("#input-user-id").value;
    const inputpasswordVal = document.querySelector("#input-password").value;
    console.log(inputidVal, inputpasswordVal);
    let loginIndexHtml;
    if(!memberList.length){
      document.querySelector('#login-form').reset();
      alert("확인되지 않습니다. 없는 아이디이거나 아이디나 비밀번호를 잘못 입력하였습니다.");
    }
    else{
      for(let i = 0; i < memberList.length; i++){
        if(memberList[i].userid == inputidVal && memberList[i].userpassword == inputpasswordVal) {
            console.log(memberList[i].userid, inputpasswordVal);
              const loginuser = new User(inputidVal, inputpasswordVal);
              sessionStorage.setItem("loginuser", JSON.stringify(loginuser));
              alert(`${memberList[i].username}님 환영합니다!`);
              loginIndexHtml =  open("index.html", "_self", "");
              document.querySelector('#login-form').reset();
              exit();
            }
          }
      document.querySelector('#login-form').reset();
      alert("확인되지 않습니다. 없는 아이디이거나 아이디나 비밀번호를 잘못 입력하였습니다.");
    }
  }

  class User {
    constructor(userid, userpassword){
        this.userid = userid;
        this.userpassword = userpassword;
    }
  }
