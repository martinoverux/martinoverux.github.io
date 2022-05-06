const checkloginuser = () => {
    const logincheck = JSON.parse(sessionStorage.getItem("loginuser"));
      if(logincheck){
          const memberVal = document.querySelector('.member');
          memberVal.style.display = "none";
          const memberlogin = document.querySelector('.member-login');
          memberlogin.style.display = "block";
      }
}
checkloginuser();

const logout = () => {
  sessionStorage.clear();
  const member = document.querySelector('.member');
  member.style.display = "block";
  const memberlogin = document.querySelector('.member-login');
  memberlogin.style.display = "none";
  newWindow = open("index.html", "_self", "");
}

