document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  elements.forEach((element) => {
    observer.observe(element);
  });
});
function updateTextColors() {
  const backgroundElement = document.querySelector(".before-yellow");
  if (!backgroundElement) return;
  const elementRect = backgroundElement.getBoundingClientRect();
  const pseudoStyle = getComputedStyle(backgroundElement, "::before");
  const pseudoTop = parseFloat(pseudoStyle.top) || 0;
  const pseudoHeight = parseFloat(pseudoStyle.height) || 0;
  const transform = pseudoStyle.transform;
  let translateY = 0;
  if (transform && transform !== "none") {
    const matrix = new DOMMatrixReadOnly(transform);
    translateY = matrix.m42;
  }
  const blueBottom = elementRect.top + pseudoTop + translateY + pseudoHeight;
  document.querySelectorAll(".check-text").forEach((textElement) => {
    const textRect = textElement.getBoundingClientRect();
    let boundary = blueBottom - textRect.top;
    boundary = Math.max(0, Math.min(boundary, textRect.height));
    textElement.style.setProperty("--blue-bottom", `${boundary}px`);
  });
}
window.addEventListener("DOMContentLoaded", updateTextColors);
window.addEventListener("load", updateTextColors);
window.addEventListener("resize", updateTextColors);
window.addEventListener("scroll", updateTextColors);
document.addEventListener("animationend", updateTextColors);
document.addEventListener("transitionend", updateTextColors);
