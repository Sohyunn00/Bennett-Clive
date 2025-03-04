gsap.registerPlugin(ScrollTrigger);

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

// 섹션2 왼쪽 텍스트 슬라이드 --------------------------------------

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".sec2",
    start: "50% 50%",
    end: "100%, 100%",
    scrub: 0,
    markers: true,
  },
});

for (let i = 1; i < $(".left_list li").length; i++) {
  tl2
    .to(`.left_list li:nth-child(${i})`, {
      scale: 1,
    })
    .to(`.left_list li:nth-child(${i + 1})`, {
      yPercent: `-${i}00`,
    })
    .to(`.left_list li:nth-child(n+${i + 1})`, {
      yPercent: `-${i}00`,
    });
}

// 오른쪽 텍스트 슬라이드 --------------------------------------

for (let i = 1; i <= $(".right_list li").length; i++) {
  tl2
    .to(`.right_list li:nth-child(${i})`, {
      scale: 0,
    })
    .to(`.right_list li:nth-child(n+${i + 1})`, {
      yPercent: `-${i}00`,
    });
}

// sec3 브랜드 & 효과 --------------------------------------

// gsap.utils.toArray(".brand_row").forEach((row, i) => {
//   let left = row.querySelector(".left"),
//     right = row.querySelector(".right");

//   gsap.to(left, {
//     xPercent: -10, // 왼쪽 이동
//     opacity: 0.8,
//     scrollTrigger: {
//       trigger: row,
//       end: "top 20%",
//       scrub: 1,
//       ease: "power2.out",
//       stagger: 0.1,
//       toggleActions: "play reverse play reverse",
//     },
//   });

//   gsap.to(right, {
//     xPercent: 10, // 오른쪽 이동
//     opacity: 0.8,
//     scrollTrigger: {
//       trigger: row,
//       start: "top 80%",
//       end: "top 20%",
//       scrub: 1,
//       ease: "power2.out",
//       stagger: 0.1,
//       toggleActions: "play reverse play reverse",
//     },
//   });
// });

gsap.utils.toArray(".brand_row").forEach((row, i) => {
  let left = row.querySelector(".left");
  let right = row.querySelector(".right");

  gsap.fromTo(
    [left, right],
    { x: 0 }, // 처음엔 중앙에 붙어 있음
    {
      x: (index) => (index === 0 ? -100 : 100), // 왼쪽 요소는 왼쪽으로, 오른쪽 요소는 오른쪽으로 이동
      scrollTrigger: {
        trigger: row,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    }
  );

  // 다시 중앙으로 붙는 효과
  gsap.fromTo(
    [left, right],
    { x: (index) => (index === 0 ? -100 : 100) },
    {
      x: 0,
      scrollTrigger: {
        trigger: row,
        start: "top 30%",
        end: "top 0%",
        scrub: true,
      },
    }
  );
});

// 푸터 제목 --------------------------------------
gsap
  .timeline({
    scrollTrigger: {
      trigger: "footer",
      start: "0% 95%",
      end: "100%, 100%",
      scrub: 1,
      markers: true,
    },
  })
  .to(".footer_title a:first-child", { scale: 1 })
  .to(".footer_title a:last-child", { scale: 1 });
