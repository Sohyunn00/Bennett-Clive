"use strict";

// 부드러운 스크롤 -----------------------------------------
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 햄버거 메뉴 -----------------------------------------

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
