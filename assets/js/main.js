/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('submit-form').addEventListener('submit', function(event) {
//     var email = document.querySelector('input[name="email"]').value;
//     // var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     let isValidEmail = !validateEmail(email);
//     console.log("Hello");
//     console.log(isValidEmail);
//     if (isValidEmail) {
//       alert('You have entered an invalid email address!!!!');
//       event.preventDefault(); // Prevent the form from submitting
//     } else {
//       $("#submit-form").submit((e) => {
//         e.preventDefault();
     
//         // Show loading message
//         $(".loading").show();
     
//         $.ajax({
//           url: "https://script.google.com/macros/s/AKfycbzciIq_bPnlLw_3xhRpiQoZ7ojDUxJ3LgPEA25RgDDSQVl3aw3lQsUNb6DZrw0wIOxZ/exec",
//           data: $("#submit-form").serialize(),
//           method: "post",
//           success: function(response) {
//             // Hide loading message
//             $(".loading").hide();
     
//             // Show the sent message
//             $(".sent-message").show();
           
//             // Optionally, you can hide the form if you want after successful submission
//             // $("#submit-form").hide();
//           },
//           error: function(err) {
//             // Hide loading message
//             $(".loading").hide();
     
//             // Show error message
//             $(".error-message").text("Something went wrong. Please try again.").show();
//           }
//         });
//       });
//     }
//   });
// });

// const validateEmail = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };



// // document.getElementById('submit-form').addEventListener('submit', function(event) {
// // // Prevent form submission
// // event.preventDefault();

// // // Clear previous errors
// // document.getElementById('nameError').textContent = '';
// // document.getElementById('mailError').textContent = '';
// // document.getElementById('subjectError').textContent = '';
// // document.getElementById('messageError').textContent = '';

// // // Get form values
// // const name = document.getElementById('name').value.trim();
// // const email = document.getElementById('mail').value.trim();
// // const subject = document.getElementById('subject').value.trim();
// // const message = document.getElementById('message').value.trim();

// // // Initialize a flag to track if the form is valid
// // let isValid = true;

// // // Validate Name (Only alphabets, min length 3)

// // //  const namePattern = /^[A-Za-z\s]+$/;
// // //  if (name === '') {
// // //      document.getElementById('nameError').textContent = '* Name is required';
// // //      isValid = false;
// // //  } else if (!namePattern.test(name)) {
// //      document.getElementById('nameError').textContent = '* Name must contain only alphabets';
// //      isValid = false;
// //  } else if (name.length < 3) {
// //      document.getElementById('nameError').textContent = '* Name must be at least 3 characters long';
// //      isValid = false;
// //  }

// // Validate Email (must contain @ and .) 
// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// if (email === '') {
//    document.getElementById('mailError').textContent = '* Email is required';
//    isValid = false;
// } else if (!emailPattern.test(email)) {
//    document.getElementById('mailError').textContent = '* Please enter a valid email address';
//    isValid = false;
// }

// // Validate Subject (at least 3 characters)
// if (subject === '') {
//    document.getElementById('subjectError').textContent = '* Subject is required';
//    isValid = false;
// } else if (subject.length < 3) {
//    document.getElementById('subjectError').textContent = '* Subject must be at least 3 characters long';
//    isValid = false;
// }

// // Validate Message (at least 10 characters)
// if (message === '') {
//    document.getElementById('messageError').textContent = '* Message is required';
//    isValid = false;
// } else if (message.length < 10) {
//    document.getElementById('messageError').textContent = '* Message must be at least 10 characters long';
//    isValid = false;
// }

// // If the form is valid, submit it
// if (isValid) {
//    document.getElementById('submit-form').submit(); // Submit the form to Formspree
// }
// });



var  nameError = document.getElementById('name-error')
var companyError = document.getElementById('company-error')
var emailError = document.getElementById('email-error')
var phoneError = document.getElementById('phone-error')
var messageError = document.getElementById('message-error')
var submitError = document.getElementById('submit-error')

function validateName(){
    var name =document.getElementById('contact-name').value;
    if(name.lenght == 0){
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if(!name.match(/^[A-Za-z]+(\s{1}[A-Za-z]+)+$/)){
        nameError.innerHTML = 'Enter full Name';
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;

}
function validateEmail(){
    var email = document.getElementById('contact-email').value;
    var emailError = document.getElementById('email-error')

    if(email.length == 0){
        emailError.innerHTML = 'Email is required';
        return false;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.match(emailPattern)){
        emailError.innerHTML = 'Invalid Email';
        return false;
    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}
function validateMessage() {
    var message = document.getElementById('contact-message').value;
    if(message.length === 0) {
        messageError.innerHTML = 'Message is required';
        return false;
    }
    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
}
function validatePhone() {
    var phone = document.getElementById('contact-phone').value;
    var phoneError = document.getElementById('phone-error'); // Ensure this ID is correct

    if(phone.length == 0) {
        phoneError.innerHTML = 'Phone number is required';
        return false;
    }
    if (!/^[0-9]*$/.test(phone)) {
        phoneError.innerHTML = 'Enter numbers only';
        return false;
    }
    if(phone.length !== 10) {
        phoneError.innerHTML = 'Enter 10 digit';
        return false;
    }
    if(!phone.match(/^[0-9]{10}$/)) {
        phoneError.innerHTML = 'Invalid phone number';
        return false;
    }
    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; 
    return true;
}

function validateForm(){

    if(!validateName() || !validatePhone() || !validateEmail() || !validateMessage()){
        submitError.innerHTML ='please fill contents';
        return false;
        

    }
    submitError.innerHTML ='';
    return true;

}

//submission


      $(document).ready(function(){
       $("#submit-form").submit((e) => {
        e.preventDefault()
        if (validateForm()){
        $.ajax({
          url: "https://script.google.com/macros/s/AKfycbzciIq_bPnlLw_3xhRpiQoZ7ojDUxJ3LgPEA25RgDDSQVl3aw3lQsUNb6DZrw0wIOxZ/exec",
          data: $("#submit-form").serialize(),
          method: "post",
          success: function (response) {
            alert("Form Submitted Successfully")
            window.location.reload()
            //window.location.href="https://google.com"
          },
          error: function (err) {
            alert("Something Error")
          }
        });
      }
      })
    }) 
    
