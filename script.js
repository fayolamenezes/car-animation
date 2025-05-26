gsap.registerPlugin(ScrollTrigger);

const car = document.querySelector(".car");
const road = document.querySelector(".road");
const roadText = document.querySelector(".road-text");
const valueCards = document.querySelector(".value-cards");
const roadContainer = document.querySelector(".road-container");

const text = roadText.textContent.trim();
roadText.innerHTML = "";

text.split("").forEach(char => {
  const span = document.createElement("span");
  if (char === " ") {
    span.innerHTML = "&nbsp;";
    span.style.width = "0.3em";
    span.style.display = "inline-block";
  } else {
    span.textContent = char;
    span.style.opacity = "0";
    span.style.display = "inline-block";
  }
  roadText.appendChild(span);
});

let scrollTween;

function createAnimation() {
  if (scrollTween) {
    scrollTween.scrollTrigger.kill();
    scrollTween.kill();
  }

  const containerRect = roadContainer.getBoundingClientRect();
  const totalScroll = containerRect.width * 2;
  const targetX = containerRect.width + 500;

  scrollTween = gsap.to(car, {
    x: targetX,
    ease: "none",
    scrollTrigger: {
      trigger: ".road-container",
      start: "top top",
      end: "+=" + totalScroll,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: self => {
        const roadRect = road.getBoundingClientRect();
        const carRect = car.getBoundingClientRect();
        const carFrontX = carRect.left + carRect.width * 0.5;

        const roadBackgroundX = -carFrontX * 0.5;
        gsap.set(".road", { backgroundPositionX: `${roadBackgroundX}px` });

        const greenWidth = Math.max(0, carFrontX - roadRect.left);
        gsap.set(".road-green", { width: greenWidth });

        const spans = roadText.querySelectorAll("span");
        spans.forEach(span => {
          const spanRect = span.getBoundingClientRect();
          const spanCenter = spanRect.left + spanRect.width / 2;
          span.style.opacity = carFrontX >= spanCenter ? "1" : "0";
        });

        const shiftStartX = window.innerWidth * 0.3;

        if (carFrontX >= shiftStartX) {
          const maxShift = window.innerWidth * 1.0;
          const progress = (carFrontX - shiftStartX) / window.innerWidth;
          const shiftAmount = Math.min(progress * totalScroll * 0.5, maxShift);

          gsap.to([roadText, valueCards], {
            x: -shiftAmount,
            duration: 0.2,
            ease: "power1.out"
          });
        } else {
          gsap.set([roadText, valueCards], { x: 0 });
        }

        const fadeDistance = 200;
        const cards = document.querySelectorAll('.value-card');
        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;

          const distance = carFrontX - cardCenterX;
          let opacity;

          if (distance >= 0) {
            opacity = 1;
          } else if (distance >= -fadeDistance && distance < 0) {
            opacity = 1 + distance / fadeDistance;
          } else {
            opacity = 0;
          }

          opacity = Math.min(Math.max(opacity, 0), 1);

          gsap.set(card, { opacity, scale: 1 });

          if (opacity > 0 && !card.classList.contains('visible')) {
            card.classList.add('visible');
          } else if (opacity === 0 && card.classList.contains('visible')) {
            card.classList.remove('visible');
          }
        });
      }
    }
  });
}

createAnimation();

window.addEventListener("resize", () => {
  createAnimation();
});
