"use strict";

// 인트로 화면 ------------------------------

window.addEventListener("load", function () {
  const introElement = document.querySelector(".intro");

  function hideIntro() {
    introElement.style.opacity = 0;
    setTimeout(() => {
      introElement.style.display = "none"; // 완전히 숨김
    }, 500); // 0.5초 뒤 display: none 적용
  }

  introElement.style.opacity = 1;
  setTimeout(hideIntro, 3000); // 3초 후 사라짐
});

// 부드러운 스크롤 ------------------------------
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 햄버거 메뉴 -----------------------------------

$(function () {
  $(".ham_button").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $(".ham_menu").removeClass("on");
      $(".bottom_menu").removeClass("on");
    } else {
      $(this).addClass("on");
      $(".ham_menu").addClass("on");
      $(".bottom_menu").addClass("on");
    }
  });
});

// 세계 시간 -----------------------------------

let currentHour = 0;
let currentMinute = 0;

const printTime = () => {
  function getTime(offset) {
    const current = new Date();
    const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
    const diff = offset * 60 * 60 * 1000;
    const currentTime = new Date(utc + diff);

    currentHour = String(currentTime.getHours()).padStart(2, "0");
    currentMinute = String(currentTime.getMinutes()).padStart(2, "0");
  }

  const clockEls = document.querySelectorAll(".clock");

  clockEls.forEach(function (clockEl, index) {
    const hour = clockEl.querySelector(".hour");
    const minute = clockEl.querySelector(".minute");

    if (clockEl.dataset.zone === "new-york") {
      getTime(-4);
    }
    if (clockEl.dataset.zone === "los-angeles") {
      getTime(-7);
    }
    if (clockEl.dataset.zone === "miami") {
      getTime(-4);
    }

    hour.textContent = currentHour;
    minute.textContent = currentMinute;
  });
  setTimeout(() => {
    printTime();
  }, 60000);
};
printTime();
