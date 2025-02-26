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

// 메인 동영상 슬라이드 --------------------------------------

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  const panel = document.querySelector(".video1");
  let panels = gsap.utils.toArray(".up");
  let tops = panels.map((panel) =>
    ScrollTrigger.create({ trigger: panel, start: "top top" })
  );

  panels.forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: () =>
        panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
      pin: true,
      pinSpacing: false,
    });
  });

  // 슬라이드 중간에 멈추면 가까운 쪽으로 채우기
  ScrollTrigger.create({
    snap: {
      snapTo: (progress, self) => {
        let panelStarts = tops.map((st) => st.start); // 모든 패널의 start 값 가져오기
        let snapScroll = gsap.utils.snap(panelStarts, self.scroll());

        // 현재 스크롤 위치가 마지막 슬라이드에 해당하면 snap 적용 X
        let maxScroll = ScrollTrigger.maxScroll(window);
        if (self.scroll() >= maxScroll - 10) {
          return self.scroll(); // 현재 위치 유지 (snap 적용 안 함)
        }

        return gsap.utils.normalize(0, maxScroll, snapScroll);
      },
      duration: 0.5,
    },
  });

  const boxes = gsap.utils.toArray(".box");

  boxes.forEach((box, index) => {
    const nextBox = boxes[index + 1];

    if (nextBox) {
      gsap.to(box, {
        y: -200, // 위로 밀려남
        scrollTrigger: {
          trigger: ".up",
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: true,
          duration: 1,
        },
      });

      gsap.fromTo(
        nextBox,
        { scale: 0 },
        {
          scale: 1, // 커짐
          transformOrigin: "bottom left",
          scrollTrigger: {
            trigger: ".up",
            start: "top 10vh", // 현재 박스가 화면 중앙에 올 때 새 박스 등장
            end: "bottom top",
            stagger: {
              each: 1,
            },
            scrub: true,
            duration: 1,
          },
        }
      );
    }
  });
});
