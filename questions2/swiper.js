document.addEventListener("DOMContentLoaded", function () {
  const survGroups = document.querySelectorAll(".surv-group");
  const swiperPagination = document.querySelector(".custom-pagination");
  const prevButton = document.querySelector(".swip-prev");
  const nextButton = document.querySelector(".swip-nxt");

  let currentIndex = 0;

  survGroups.forEach((group, index) => {
      const circle = document.createElement("span");
      circle.classList.add("circle");
      if (index === 0) {
          circle.classList.add("act");
      }
      swiperPagination.appendChild(circle);
  });

  const circles = swiperPagination.querySelectorAll(".circle");

  let animationCounter = 0;
  function updateActiveGroup(newIndex) {
      // Loop through each survey group
      survGroups.forEach(group => {
          group.style.cssText = 'opacity: 0';
          if (animationCounter === 2) {
              group.classList.add('anim');
              survGroups[newIndex].classList.remove('anim');
          } else {
              group.classList.remove('anim'); 
          }

          setTimeout(() => {
              group.classList.remove('act');
          }, 500);
      });

      circles.forEach(circle => circle.classList.remove('act'));
      survGroups[newIndex].style.cssText = 'opacity: 1';
      setTimeout(() => {
          survGroups[newIndex].classList.add('act');
      }, 500);

      circles[newIndex].classList.add('act');
      animationCounter = (animationCounter + 1) % 3;
  }

  function disableButtonsTemporarily() {
    nextButton.disabled = true;
    prevButton.disabled = true;
    setTimeout(() => {
        nextButton.disabled = false;
        prevButton.disabled = false;
    }, 500);
}

  nextButton.addEventListener("click", function () {
      if (currentIndex < survGroups.length - 1) {
          currentIndex++;
          updateActiveGroup(currentIndex);
      }
      disableButtonsTemporarily();
  });

  prevButton.addEventListener("click", function () {
      if (currentIndex > 0) {
          currentIndex--;
          updateActiveGroup(currentIndex);
      }
      disableButtonsTemporarily();
  });
});
