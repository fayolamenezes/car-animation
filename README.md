# Car Scroll Animation

This project replicates the car animation along the given sections from the reference website [Deed Delivery](https://www.deeddelivery.com/). Specifically, the focus was on replicating the second section of the website with smooth scroll-triggered animations using GSAP and ScrollTrigger.

## Demo

The project is hosted and can be viewed live at:  
[https://car-animation-nine.vercel.app/](https://car-animation-nine.vercel.app/)

## Features

- **Scroll-triggered car movement:** The car smoothly moves horizontally across the screen as the user scrolls.
- **Dynamic background animation:** The road background scrolls with a parallax effect synced to the car’s movement.
- **Progressive text reveal:** The text "VALUE ADD" appears progressively as the car moves forward.
- **Dynamic green road fill:** The green road section fills up progressively based on the car’s position.
- **Value cards animations:** Four value cards on either side of the road fade in and out with scaling effects triggered by the car's position.
- **Responsive design:** The animation recalculates and adjusts on window resize to maintain correct behavior across screen sizes.
- **Pinning and scrub effect:** The road section is pinned during scroll to create a seamless and immersive animation experience.

## Technologies Used

- HTML5 & CSS3
- JavaScript (ES6)
- [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- [GSAP ScrollTrigger plugin](https://greensock.com/scrolltrigger/)

## Project Structure

- `index.html` — Markup for the animation section including the road, car, text, and value cards.
- `style.css` — Styling for layout, colors, positioning, and transitions.
- `script.js` — JavaScript containing GSAP animation logic and ScrollTrigger setup.

## How to Run Locally

1. Clone or download the repository.
2. Open `index.html` in a modern browser.
3. Scroll down to see the car animation with synchronized effects.

## Notes

- The animation dynamically calculates scroll distance and car movement based on container width for responsiveness.
- The car moves off screen beyond the viewport width to allow smooth exit animations.
- Value cards fade in as the car passes them and fade out when the car moves away.

---

This project replicates the visual and interactive experience of the second section on [Deed Delivery](https://www.deeddelivery.com/) using GSAP scroll animations.
