"use strict";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  // 🍅🍅 인트로 ---------------------------------

  gsap
    .timeline({
      scrub: 2,
      ease: "power4.out",
    })
    .fromTo(".intro .slide_wrap", { y: 200 }, { y: 0, duration: 1 })
    .to(
      ".center_title .left",
      { scale: 0.15, duration: 0.6, delay: 1.5 },
      "+=0.6"
    )
    .to(
      ".center_title .center",
      {
        scale: 0.15,
        left: "50%",
        xPercent: -50,
        duration: 0.6,
      },
      "-=0.6"
    )
    .to(".center_title .right", { scale: 0.15, duration: 0.6 }, "-=0.6")
    .to(".intro > p", { y: -100 }, "-=1")
    .to(".intro .slide_wrap", { y: 100 }, "-=1")

    // 인트로 재생 다음 메인 효과 ---------------------------------
    .fromTo(".sticky .left", { scale: 0 }, { scale: 1, duration: 0.4 })
    .fromTo(
      ".right .brand-item:nth-child(1)",
      { scale: 0 },
      { scale: 1, duration: 0.2 }
    )
    .fromTo(
      ".right .brand-item:nth-child(2)",
      { scale: 0 },
      { scale: 1, duration: 0.2 }
    )
    .fromTo(
      ".right .brand-item:nth-child(3)",
      { scale: 0 },
      { scale: 1, duration: 0.2 }
    )
    .fromTo(
      ".right .brand-item:nth-child(4)",
      { scale: 0 },
      { scale: 1, duration: 0.2 }
    )
    .fromTo(
      ".right .brand-item:nth-child(5)",
      { scale: 0 },
      { scale: 1, duration: 0.2 }
    );

  // 🍅🍅 메인 동영상 슬라이드 --------------------------------
  const slideEls = document.querySelectorAll(".slide");
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".home",
      start: "0% 0%",
      end: "100%, 90%",
      scrub: 1,
      snap: {
        snapTo: 1 / (slideEls.length - 1),
        //duration: { min: 0.2, max: 0.8 },
        duration: 0.2,
        delay: 0.1,
      },
    },
  });

  slideEls.forEach(function (slideEl, index) {
    const lastIndex = slideEls.length - 1;

    if (index !== lastIndex) {
      tl.to(slideEl, { height: 0 }, `${index}`);
    }
  });

  // 🍅🍅 메인 왼쪽 텍스트 슬라이드 ----------------------------

  for (let i = 1; i < $(".brand-list.left .brand-item").length; i++) {
    tl.to(
      `.brand-list.left .brand-item:nth-child(${i})`,
      {
        yPercent: `-${i}00`,
      },
      `${i - 1}`
    )
      .to(
        `.brand-list.left .brand-item:nth-child(${i + 1})`,
        {
          scale: 1,
        },
        `${i - 1}`
      )
      .to(
        `.brand-list.left .brand-item:nth-child(n+${i + 1})`,
        {
          yPercent: `-${i}00`,
        },
        `${i - 1}`
      );
  }

  // 🍅🍅 메인 오른쪽 텍스트 슬라이드 -------------------------

  for (let i = 1; i <= $(".brand-list.right .brand-item").length; i++) {
    tl.to(
      `.brand-list.right .brand-item:nth-child(${i})`,
      {
        scale: 0,
      },
      `${i - 1}`
    ).to(
      `.brand-list.right .brand-item:nth-child(n+${i + 1})`,
      {
        yPercent: `-${i}00`,
      },
      `${i - 1}`
    );
  }

  // 🍅🍅 섹션2 텍스트 슬라이드 -----------------------

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".sec2",
      start: "0% 0%",
      end: "100% 100%",
      scrub: 1,
    },
  });

  const leftItems = document.querySelectorAll(".left_list li");
  const rightItems = document.querySelectorAll(".right_list li");

  leftItems.forEach((item, i) => {
    tl2
      // 왼쪽
      .to(leftItems[i], { scale: 1 }) // 현재 요소 확대
      .to(leftItems[i - 1], { yPercent: -100 * i }, "<") // 이전 요소 이동
      .to(leftItems, { yPercent: -100 * i }, "<") // 모든 요소 이동
      // 오른쪽
      .to(rightItems[i], { scale: 0 }, "<")
      .to(rightItems[i - 1], { yPercent: -100 * i }, "<")
      .to(rightItems, { yPercent: -100 * i }, "<");
  });

  // 큰 화면에서만 동작하는 애니메이션

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      // 🍅🍅 sec3 브랜드 & 효과 --------------------------

      gsap.utils.toArray(".brand_row").forEach((row, i) => {
        let left = row.querySelector(".left");
        let right = row.querySelector(".right");

        // 초기 상태를 설정 (중앙에 위치)
        gsap.to([left, right], { x: 0 });

        gsap.to([left, right], {
          x: (index) => (index === 0 ? -90 : 90), // 왼쪽 요소는 왼쪽으로, 오른쪽 요소는 오른쪽으로 이동
          scrollTrigger: {
            trigger: row,
            start: "top 60%",
            end: "top 45%",
            scrub: true,
          },
        });

        // 다시 중앙으로 붙는 효과
        gsap.fromTo(
          [left, right],
          { x: (index) => (index === 0 ? -90 : 90) },
          {
            x: 0,
            scrollTrigger: {
              trigger: row,
              start: "top 45%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      });

      // 🍅🍅 푸터에서 제목 커지는 효과 -----------------------

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".container",
            start: "90% 90%",
            end: "100%, 100%",
            scrub: true,
          },
        })
        .to(
          ".center_text .left, .center_text .right",
          {
            y: 500,
            duration: 2,
            ease: "power2.out",
          },
          "+=1"
        )
        .to(".center_text .left, .center_text .right", {
          scale: 6.6,
          duration: 2,
          ease: "power2.out",
        });
    },
  });
});
