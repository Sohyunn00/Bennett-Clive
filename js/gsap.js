gsap.registerPlugin(ScrollTrigger);

// 인트로 --------------------------------------

// gsap
//   .timeline()
//   .fromTo(".intro .slide_wrap", { y: 200 }, { y: 0, duration: 1 })
//   .to(".center_title .left", { scale: 0.15, duration: 1 }, "+=1")
//   .to(
//     ".center_title .center",
//     {
//       scale: 0.15,
//       left: "50%",
//       xPercent: -50,
//       duration: 1,
//     },
//     "-=1"
//   )
//   .to(".center_title .right", { scale: 0.15, duration: 1 }, "-=1")
//   .to(".intro > p", { y: -100 }, "-=1")
//   .to(".intro .slide_wrap", { y: 100 }, "-=1");

// 메인 동영상 슬라이드 --------------------------------------

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".home",
    start: "0% 0%",
    end: "100%, 100%",
    scrub: 0,
    snap: {
      snapTo: "labels",
      duration: { min: 0.2, max: 1 },
      delay: 0.1,
    },
  },
});

const slideEls = document.querySelectorAll(".slide");

slideEls.forEach(function (slideEl, index) {
  const lastIndex = slideEls.length - 1;

  if (index !== lastIndex) {
    tl.to(slideEl, { height: 0 }, `a${index}`);
  }
});

// 왼쪽 텍스트 슬라이드 --------------------------------------

for (let i = 1; i < $(".brand-list.left .brand-item").length; i++) {
  tl.to(
    `.brand-list.left .brand-item:nth-child(${i})`,
    {
      yPercent: `-${i}00`,
    },
    `a${i - 1}`
  )
    .to(
      `.brand-list.left .brand-item:nth-child(${i + 1})`,
      {
        scale: 1,
      },
      `a${i - 1}`
    )
    .to(
      `.brand-list.left .brand-item:nth-child(n+${i + 1})`,
      {
        yPercent: `-${i}00`,
      },
      `a${i - 1}`
    );
}

// 오른쪽 텍스트 슬라이드 --------------------------------------

for (let i = 1; i <= $(".brand-list.right .brand-item").length; i++) {
  tl.to(
    `.brand-list.right .brand-item:nth-child(${i})`,
    {
      scale: 0,
    },
    `a${i - 1}`
  ).to(
    `.brand-list.right .brand-item:nth-child(n+${i + 1})`,
    {
      yPercent: `-${i}00`,
    },
    `a${i - 1}`
  );
}

// 섹션2 텍스트 슬라이드 --------------------------------------

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".sec2",
    start: "50% 50%",
    end: "100% 100%",
    pin: true,
    scrub: 1,
    duration: 3,
  },
});

const leftItems = document.querySelectorAll(".left_list li");
const rightItems = document.querySelectorAll(".right_list li");

leftItems.forEach((item, i) => {
  // 왼쪽
  tl2
    .to(leftItems[i], { scale: 1 }) // 현재 요소 확대
    .to(leftItems[i - 1], { yPercent: -90 * i }, "<") // 이전 요소 이동
    .to(leftItems, { yPercent: -90 * i }, "<") // 모든 요소 이동
    // 오른쪽
    .to(rightItems[i], { scale: 0 }, "<") // 오른쪽 요소 축소
    .to(rightItems[i - 1], { yPercent: -90 * i }, "<") // 오른쪽 요소 이동
    .to(rightItems, { yPercent: -100 * i }, "<"); // 모든 오른쪽 요소 이동
});

// 큰 화면에서만 동작하는 애니메이션

ScrollTrigger.matchMedia({
  "(min-width: 1024px)": function () {
    // sec3 브랜드 & 효과 --------------------------------------

    gsap.utils.toArray(".brand_row").forEach((row, i) => {
      let left = row.querySelector(".left");
      let right = row.querySelector(".right");

      gsap.fromTo(
        [left, right],
        { x: 0 }, // 처음엔 중앙에 붙어 있음
        {
          x: (index) => (index === 0 ? -90 : 90), // 왼쪽 요소는 왼쪽으로, 오른쪽 요소는 오른쪽으로 이동
          scrollTrigger: {
            trigger: row,
            start: "top 60%",
            end: "top 45%",
            scrub: true,
          },
        }
      );

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

    // 푸터에서 제목 커지는 효과 --------------------------------------

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
