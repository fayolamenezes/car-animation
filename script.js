gsap.registerPlugin(ScrollTrigger);

const car = document.querySelector(".car");
const road = document.querySelector(".road");
const roadText = document.querySelector(".road-text");

// Wrap each letter of the text in a <span>
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
    span.style.opacity = "0"; // initially hidden
    span.style.display = "inline-block";
  }
  roadText.appendChild(span);
});

// Increase totalScroll to allow longer scroll distance
const totalScroll = 1900;  // doubled from 1500

// Adjust this to wherever you want the text shift to start (in px or fraction of window width)
const shiftStartX = window.innerWidth * 0.3;  // same as before

gsap.to(car, {
  // move car farther based on the new totalScroll (increase offset too)
  x: () => window.innerWidth + 500,  // increased from 450 to 900

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

      // Update green bar width
      const greenWidth = Math.max(0, carFrontX - roadRect.left);
      gsap.set(".road-green", { width: greenWidth });

      // Reveal each letter as car front crosses it
      const spans = roadText.querySelectorAll("span");
      spans.forEach(span => {
        const spanRect = span.getBoundingClientRect();
        const spanCenter = spanRect.left + spanRect.width / 2;

        span.style.opacity = carFrontX >= spanCenter ? "1" : "0";
      });

      // Shift text left only after car passes shiftStartX
      if (carFrontX >= shiftStartX) {
        // Increase maxShift so text can move fully out
        const maxShift = window.innerWidth * 1.0;  // was 0.5, now full width
        const progressAfterShiftStart = (carFrontX - shiftStartX) / window.innerWidth;
        const shiftAmount = Math.min(progressAfterShiftStart * totalScroll * 0.5, maxShift);

        gsap.to(roadText, {
          x: -shiftAmount,
          duration: 0.2,
          ease: "power1.out"
        });
      } else {
        // Reset text position before shift start
        gsap.set(roadText, { x: 0 });
      }
    }
  }
});
