let crsr = document.querySelector(".cursor");
let video = document.querySelector(".page1 video");
let boxes = document.querySelectorAll(".box");
let navh4 = document.querySelectorAll("#nav h4");
let purple = document.querySelector("#purple");
let circle = document.querySelector("#circle");

let topstart1 = 25;
let topend1 = 0;
let topstart2 = 100;
let topend2 = 105;
let topstart3 = 330;
let topend3 = 335;

function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    smoothMobile: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

init();

document.addEventListener("mousemove", function (dets) {
  gsap.to(crsr, {
    duration: 0.5,
    x: dets.x,
    y: dets.y,
    ease: "power2.out",
  });
});

video.addEventListener("mouseenter", function () {
  crsr.innerHTML = "<p>START SOUND</p>";
  crsr.style.width = "120px";
  crsr.style.borderRadius = "50px";
  crsr.style.mixBlendMode = "normal";
});

video.addEventListener("mouseleave", function () {
  crsr.innerHTML = "";
  crsr.style.width = "20px";
  crsr.style.borderRadius = "50%";
  crsr.style.mixBlendMode = "difference";
});

gsap.from(".page1 h1, .page1 h2", {
  y: 10,
  rotate: 10,
  opacity: 0,
  delay: 0.3,
  duration: 0.7,
});

if (window.innerWidth < 768) {
  topstart1 = 30;
  topend1 = 3;
  topstart2 = 5;
  topend2 = 10;
  topstart3 = 160;
  topend3 = 165;
}

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    markers: false,
    start: `top ${topstart1}%`,
    end: `top ${topend1}%`,
    scrub: 3,
  },
});

tl.to(
  ".page1 h1",
  {
    x: -500,
    opacity: 0.2,
    scale: 1.3,
  },
  "anim"
);

tl.to(
  ".page1 h2",
  {
    x: 500,
    opacity: 0.2,
    scale: 1.3,
  },
  "anim"
);

tl.to(
  ".page1 video",
  {
    width: "90%",
  },
  "anim"
);

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    markers: false,
    start: `top -${topstart2}%`,
    end: `top -${topend2}%`,
    scrub: 3,
  },
});

tl2.to(".main", {
  backgroundColor: "#fff",
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    markers: false,
    start: `top -${topstart3}%`,
    end: `top -${topend3}%`,
    scrub: 3,
  },
});

tl3.to(".main", {
  backgroundColor: "#0F0D0D",
});

boxes.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    var att = elem.getAttribute("data-image");
    crsr.style.width = "30vw";
    crsr.style.height = "25vw";
    crsr.style.borderRadius = "15px";
    crsr.style.mixBlendMode = "normal";
    crsr.style.backgroundImage = `url(${att})`;
    crsr.style.left = "-10%";
    crsr.style.top = "-20%";
  });
  elem.addEventListener("mouseleave", function () {
    crsr.style.width = "20px";
    crsr.style.height = "20px";
    crsr.style.borderRadius = "50%";
    crsr.style.mixBlendMode = "difference";
    crsr.style.backgroundImage = "none";
    crsr.style.left = "0";
    crsr.style.top = "0";
  });
});

navh4.forEach(function (elem, index) {
  let interval;

  elem.addEventListener("mouseenter", () => {
    if (index > 0) {
      purple.style.display = "block";
      purple.style.opacity = "1";

      let Text = elem.textContent;

      for (let i = 0; i < 50; i++) {
        let h1 = document.createElement("h1");
        h1.innerHTML = Text;
        h1.style.position = "absolute";
        h1.style.left = `${i * 22}%`;
        purple.appendChild(h1);
      }

      let h1s = document.querySelectorAll("#purple h1");

      const carousel = () => {
        h1s.forEach((h1, i) => {
          let currentLeft = parseFloat(h1.style.left);
          h1.style.left = `${currentLeft - 1}%`;

          if (currentLeft < -150) {
            h1.style.left = `${(h1s.length - 1) * 10}%`;
          }
        });
      };

      interval = setInterval(carousel, 30);
    }
  });

  elem.addEventListener("mouseleave", () => {
    clearInterval(interval);
    purple.innerHTML = "";
    purple.style.display = "none";
    purple.style.opacity = "0";
  });
});

circle.addEventListener("mouseenter", () => {
  purple.style.display = "block";
  purple.style.opacity = "1";

  for (let i = 0; i < 50; i++) {
    let h1 = document.createElement("h1");
    h1.innerHTML = "<h1>Extra Credit</h1>";
    h1.style.position = "absolute";
    h1.style.left = `${i * 22}%`;
    purple.appendChild(h1);
  }

  let h1s = document.querySelectorAll("#purple h1");

  const carousel = () => {
    h1s.forEach((h1, i) => {
      let currentLeft = parseFloat(h1.style.left);
      h1.style.left = `${currentLeft - 1}%`;

      if (currentLeft < -150) {
        h1.style.left = `${(h1s.length - 1) * 10}%`;
      }
    });
  };

  interval = setInterval(carousel, 30);
});

circle.addEventListener("mouseleave", () => {
  clearInterval(interval);
  purple.innerHTML = "";
  purple.style.display = "none";
  purple.style.opacity = "0";
});
