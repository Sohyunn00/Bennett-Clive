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

  const blur = document.querySelector(".slide-area .slide:first-child");
  function blurEffect() {
    blur.style.filter = "blur(0)";
  }

  setTimeout(blurEffect, 4000);
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

// 화면 크기가 변경될 때 메뉴 자동 닫기
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    $(".ham_menu").removeClass("on");
  }
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
      getTime(-5);
    }
    if (clockEl.dataset.zone === "los-angeles") {
      getTime(-8);
    }
    if (clockEl.dataset.zone === "miami") {
      getTime(-5);
    }

    hour.textContent = currentHour;
    minute.textContent = currentMinute;
  });
  setTimeout(() => {
    printTime();
  }, 60000);
};
printTime();
