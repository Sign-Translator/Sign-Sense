document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  });
  
//public urls
  function cleanUpUrls() {
    const links = document.querySelectorAll('.footer__socials a');
    links.forEach(link => {
      let href = link.getAttribute('href');
      if (href.startsWith('http://localhost:3000/')) {
        href = href.replace('http://localhost:3000/', 'http://');
      }

      // Set the updated href attribute
      link.setAttribute('href', href);
    });
  }

  document.addEventListener('DOMContentLoaded', cleanUpUrls);


  const menuBtn = document.querySelector('.nav__menu__btn');
  const navLinks = document.querySelector('.nav__links');
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  
    