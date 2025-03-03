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
    end: "100%, 50%",
    scrub: 0,
  },
});

for (let i = 1; i < $(".left_title p").length; i++) {
  tl2
    .to(
      `.left_title p:nth-child(${i})`,
      {
        scale: 1,
      },
      `a${i - 1}`
    )
    .to(
      `.left_title p:nth-child(${i + 1})`,
      {
        yPercent: `-${i}00`,
      },
      `a${i - 1}`
    )
    .to(
      `.left_title p:nth-child(n+${i + 1})`,
      {
        yPercent: `-${i}00`,
      },
      `a${i - 1}`
    );
}

// 오른쪽 텍스트 슬라이드 --------------------------------------

for (let i = 1; i <= $(".right_title p").length; i++) {
  tl2
    .to(
      `.right_title p:nth-child(${i})`,
      {
        scale: 0,
      },
      `a${i - 1}`
    )
    .to(
      `.right_title p:nth-child(n+${i + 1})`,
      {
        yPercent: `-${i}00`,
      },
      `a${i - 1}`
    );
}
