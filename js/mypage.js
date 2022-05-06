let memberInfo;

document.addEventListener("DOMContentLoaded", function(){
const loginUserInfo = (memberList = JSON.parse(localStorage.getItem('memberList'))) => {
    const loginUser = JSON.parse(sessionStorage.getItem("loginuser"));
    const sessionId = loginUser.userid;
    for(let i = 0; i < memberList.length; i++){
        if(memberList[i].userid == sessionId) {
                return memberList[i];
        }
    }
};

const renderMemberInfo = (members) => {

    const tbodyid = document.querySelector("#memberInfoTable > tbody  #idinfo");
    const tbodypw = document.querySelector("#pwinfo");
    const tbodyname = document.querySelector("#nameinfo");
    const tbodyphone = document.querySelector("#phoneinfo");
    const tbodyemail = document.querySelector("#emailinfo");
    const tbodyaddress = document.querySelector("#addrinfo");
    const tbodybirth = document.querySelector("#birthinfo");
    const tbodyenrolldate = document.querySelector("#enrollinfo");
    tbodyid.innerHTML = ""; // 초기화
    tbodypw.innerHTML = ""; // 초기화
    tbodyname.innerHTML = ""; // 초기화
    tbodyphone.innerHTML = ""; // 초기화
    tbodyemail.innerHTML = ""; // 초기화
    tbodyaddress.innerHTML = ""; // 초기화
    tbodybirth.innerHTML = ""; // 초기화
    tbodyenrolldate.innerHTML = ""; // 초기화

    
     
      const htmlid = `<td class="tbtext" colspan="2">${members.userid}</td>`;  
      const htmlpw = `<td class="tbtext">${members.userpassword}</td>`; 
      const htmlname = `<td class="tbtext">${members.username}</td>`;  
      const htmlphone = `<td class="tbtext">${members.userphone}</td>`;  
      const htmlemail = `<td class="tbtext">${members.useremail}</td>`;  
      const htmladdress = `<td class="tbtext">${members.useraddress}</td>`;  
      const htmlbirth =  `<td class="tbtext">${members.userbirth}</td>`;  
      const htmlenrolldate =  `<td class="tbtext" colspan="2">${formatDatetime(members.datetime)}</td>`;
      tbodyid.innerHTML = htmlid;
      tbodypw.innerHTML = htmlpw;
      tbodyname.innerHTML = htmlname;
      tbodyphone.innerHTML = htmlphone;
      tbodyemail.innerHTML = htmlemail;
      tbodyaddress.innerHTML = htmladdress;
      tbodybirth.innerHTML = htmlbirth;
      tbodyenrolldate.innerHTML = htmlenrolldate;


  }

  const formatDatetime = (millis) => {
    const d = new Date(millis);
    const f = (n) => n < 10 ? "0" + n : n;
    const yy = f(d.getFullYear());
    const MM = f(d.getMonth() + 1);
    const dd = f(d.getDate());
    const HH = f(d.getHours());
    const mm = f(d.getMinutes());
    return `${yy}/${MM}/${dd} ${HH}:${mm}`; 
  };

  memberInfo = loginUserInfo();
  renderMemberInfo(memberInfo);
});

    let newWindowPw;
  const resetPw = () => {
    newWindowPw = open("resetpassword.html", "popup", "width=510, height=450, top=300, left=200");
  }
    let newWindowName;
  const resetName = () => {
    newWindowName = open("resetName.html", "popup", "width=510, height=450, top=300, left=200");
  }
    let newWindowPhone;
  const resetPhone = () => {
    newWindowPhone = open("resetPhone.html", "popup", "width=510, height=450, top=300, left=200");
  }
    let newWindowEmail;
  const resetEmail = () => {
    newWindowEmail = open("resetEmail.html", "popup", "width=510, height=450, top=300, left=200");
  }
    let newWindowAddress;
  const resetAddress = () => {
    newWindowAddress = open("resetAddress.html", "popup", "width=510, height=450, top=300, left=200");
  }
    let newWindowBirth;
  const resetBirth = () => {
    newWindowBirth = open("resetBirth.html", "popup", "width=510, height=450, top=300, left=200");
  }