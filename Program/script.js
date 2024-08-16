document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  // Load theme from localStorage if it exists
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    body.classList.add(currentTheme);
  } else {
    // Default to light mode
    body.classList.add("light-mode");
  }

  toggleButton.addEventListener("click", function () {
    if (body.classList.contains("light-mode")) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light-mode");
    }
  });
});
// Hamburger menu bar

const menu = document.querySelector("#navbar_toggle_btn");
const navtab = document.querySelector(".nav_tab");

menu.addEventListener("click", function () {
  // menu.classList.toggle('active');
  navtab.classList.toggle("active");
});

// to change the nav position as window scroll

const nav = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  let heroSection = document.getElementById("herosection");
  let heroHeight = heroSection.offsetHeight;
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > heroHeight) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

let navLinks = document.querySelectorAll(".nav_links");
let sections = document.querySelectorAll("section");

window.onscroll = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 200; // Adjust as necessary
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        let sectionLink = document.querySelector(`.nav_links[href="#${id}"]`);
        if (sectionLink) {
          sectionLink.classList.add("active");
        }
      });
    }
  });
};

document.addEventListener("mousemove", function (e) {
  const sphere = document.querySelector(".ball");
  const iris = document.querySelector(".iris");

  const sphereRect = sphere.getBoundingClientRect();
  const sphereCenterX = sphereRect.left + sphereRect.width / 2;
  const sphereCenterY = sphereRect.top + sphereRect.height / 2;

  const distX = e.clientX - sphereCenterX;
  const distY = e.clientY - sphereCenterY;
  const distance = Math.sqrt(distX * distX + distY * distY);

  // Limit iris movement to within the sphere
  const maxIrisMove = sphereRect.width / 2 - iris.offsetWidth / 2;

  // Handle the case where the cursor is at the center of the sphere
  if (distance < 1) {
    iris.style.transform = `translate(0, 0)`;
    return;
  }

  // Normalize the distance components
  const normalizedDistX = distX / distance;
  const normalizedDistY = distY / distance;

  // Calculate the iris position within the sphere
  const irisOffsetX = maxIrisMove * normalizedDistX;
  const irisOffsetY = maxIrisMove * normalizedDistY;

  // Define transformations for different directions
  let skewX = 0,
    skewY = 0,
    scale = 1,
    rotateX = 0;
  rotateY = 0;

  if (distance < 70) {
    iris.style.transform = `translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scale(1)`;
    return;
  }

  if (normalizedDistY < -0.5 && normalizedDistX < -0.5) {
    // Top-left
    skewX = -17;
    skewY = -9;
    scale = 0.95;
    rotateX = 0;
    rotateY = 0;
  } else if (normalizedDistY < -0.5 && normalizedDistX > 0.5) {
    // Top-right
    skewX = 30;
    skewY = -15;
    scale = 0.95;
    rotateX = 0;
    rotateY = 0;
  } else if (normalizedDistY > 0.5 && normalizedDistX < -0.5) {
    // Bottom-left
    skewX = 10;
    skewY = 10;
    scale = 0.95;
    rotateX = 0;
    rotateY = 0;
  } else if (normalizedDistY > 0.5 && normalizedDistX > 0.5) {
    // Bottom-right
    skewX = -15;
    skewY = -15;
    scale = 0.95;
    rotateX = 0;
    rotateY = 0;
  } else if (normalizedDistY < -0.5) {
    // Top
    skewX = 0;
    skewY = 0;
    scale = 0.95;
    rotateX = -30;
    rotateY = 0;
  } else if (normalizedDistY > 0.5) {
    // Bottom
    skewX = 0;
    skewY = 0;
    scale = 0.95;
    rotateX = 30;
    rotateY = 0;
  } else if (normalizedDistX < -0.5) {
    // Left
    skewX = 0;
    skewY = 0;
    scale = 0.95;
    rotateX = 0;
    rotateY = 30;
  } else if (normalizedDistX > 0.5) {
    // Right
    skewX = 0;
    skewY = 0;
    scale = 0.95;
    rotateX = 0;
    rotateY = -40;
  }

  // Apply the translation, skew, scale, and rotate to the iris
  iris.style.transform = `translate(${irisOffsetX}px, ${irisOffsetY}px) skewX(${skewX}deg) skewY(${skewY}deg) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
