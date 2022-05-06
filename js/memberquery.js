const adminCheck = () => {
    const inputidVal = document.querySelector("#adminId").value;
        if(inputidVal != "administrator") {
          alert("관리자가 아닙니다. 관리자만 접속할 수 있습니다.")
        }
        else{
          alert("관리자로 확인되었습니다. 조회를 시작합니다.");
          document.querySelector('#formmemberquery').reset();
          renderMemberInfo();         
        }
};


const renderMemberInfo = (memberList = JSON.parse(localStorage.getItem('memberList'))) => {
    const forms = document.querySelector('.pop-memberquery-inner-wrapper');
    forms.style.display = "none";
    const contents = document.querySelector('.content-wrapper');
    contents.style.display = "block";

    const tbody = document.querySelector("#tb-memberinfo tbody");
    tbody.innerHTML = ""; // 초기화

    memberList.forEach((member, index) => {
      const {userid, userpassword, username, userphone, useremail, useraddress, userbirth, datetime} = member;
      const html = `<tr>
        <td>${index + 1}</td>  
        <td>${userid}</td>  
        <td>${userpassword}</td>  
        <td>${username}</td>  
        <td>${userphone}</td>  
        <td>${useremail}</td>  
        <td>${useraddress}</td>  
        <td>${userbirth}</td>  
        <td>${formatDatetime(datetime)}</td>  
      </tr>`;
      tbody.innerHTML += html;
    });

  }

  const formatDatetime = (millis) => {
    const d = new Date(millis);
    const f = (n) => n < 10 ? "0" + n : n;
    const MM = f(d.getMonth() + 1);
    const dd = f(d.getDate());
    const HH = f(d.getHours());
    const mm = f(d.getMinutes());
    return `${MM}/${dd} ${HH}:${mm}`; 
  };
