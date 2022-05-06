document.addEventListener("DOMContentLoaded", function() {

// 모달창 오픈용
const btn = document.querySelectorAll("button.modal-custom-button");

// 모든 모달을 저장
const modals = document.querySelectorAll('.modal-custom');

// 모달창 종료용
const spans = document.getElementsByClassName("close-modal");

// 버튼 클릭 시 모달 창 띄우기
for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = function (e) {
        e.preventDefault();
        modal = document.querySelector(e.target.getAttribute("href"));
        modal.style.display = 'block';
    }
}

// x 클릭 시 모달창 닫기
for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function () {
        for (let index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
        }
    }
}

// 모달 외부를 클릭 시 모달창 닫기
window.onclick = function (event) {
    if (event.target.classList.contains('modal-custom')) {
        for (let index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
        }
    }
}

const tabList = document.querySelectorAll('.tab_menu .list li');
const contents = document.querySelectorAll('.cont');
const defaultContent = document.querySelector('.default-cont');
let activeCont = '#tab1'; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)

for(let i = 0; i < tabList.length; i++){
  tabList[i].querySelector('.btn-tab').addEventListener('click', function(e){
    e.preventDefault();
    defaultContent.style.display = 'none';
    for(let j = 0; j < tabList.length; j++){
      // 나머지 버튼 클래스 제거
      tabList[j].classList.remove('is_on');

      // 나머지 컨텐츠 display:none 처리
      contents[j].style.display = 'none';
    }
    // 버튼 관련 이벤트
    this.parentNode.classList.add('is_on');

    // 버튼 클릭시 컨텐츠 전환
    activeCont = this.getAttribute('href');

    document.querySelector(activeCont).style.display = 'block';
  });
}

});
