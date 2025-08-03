'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (modalTitle && title) {
      modalTitle.innerHTML = title.innerHTML;
    }
    if (modalText && text) {
      modalText.innerHTML = text.innerHTML;
    }

    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]"); // Fixed typo from original
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    if (select) {
      elementToggleFunc(select);
    }
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    filterFunc(selectedValue);

    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Enhanced project filtering with animation support
const projectItems = document.querySelectorAll("[data-project-item]");

const projectFilterFunc = function (selectedValue) {
  for (let i = 0; i < projectItems.length; i++) {
    const item = projectItems[i];
    
    if (selectedValue === "all") {
      item.classList.add("active");
      item.style.display = "block";
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
      item.style.display = "block";
    } else {
      item.classList.remove("active");
      item.style.display = "none";
    }
  }
}

// Update filter function to handle both regular items and projects
const enhancedFilterFunc = function (selectedValue) {
  filterFunc(selectedValue);
  projectFilterFunc(selectedValue);
}

// Update existing filter events to use enhanced function
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].removeEventListener("click", selectItems[i].clickHandler);
  selectItems[i].clickHandler = function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    if (select) {
      elementToggleFunc(select);
    }
    enhancedFilterFunc(selectedValue);
  };
  selectItems[i].addEventListener("click", selectItems[i].clickHandler);
}

// Update filter buttons to use enhanced function
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].removeEventListener("click", filterBtn[i].clickHandler);
  filterBtn[i].clickHandler = function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
    }
    enhancedFilterFunc(selectedValue);

    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtn = this;
  };
  filterBtn[i].addEventListener("click", filterBtn[i].clickHandler);
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form && form.checkValidity()) {
      if (formBtn) {
        formBtn.removeAttribute("disabled");
      }
    } else {
      if (formBtn) {
        formBtn.setAttribute("disabled", "");
      }
    }
  });
}

// Enhanced form submission
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Add your form submission logic here
    // For example, you could send the data to a server or show a success message
    
    const formData = new FormData(form);
    console.log("Form submitted with data:", Object.fromEntries(formData));
    
    // Show success message (you can customize this)
    alert("Thank you for your message! I'll get back to you soon.");
    
    // Reset form
    form.reset();
    if (formBtn) {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    const targetPage = this.innerHTML.toLowerCase();
    
    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
for (let i = 0; i < anchorLinks.length; i++) {
  anchorLinks[i].addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

// Initialize page on load
document.addEventListener("DOMContentLoaded", function() {
  // Set first navigation item as active if none are active
  if (navigationLinks.length > 0) {
    let hasActiveNav = false;
    for (let i = 0; i < navigationLinks.length; i++) {
      if (navigationLinks[i].classList.contains("active")) {
        hasActiveNav = true;
        break;
      }
    }
    
    if (!hasActiveNav) {
      navigationLinks[0].classList.add("active");
      if (pages[0]) {
        pages[0].classList.add("active");
      }
    }
  }
  
  // Initialize filter - show all items by default
  if (filterItems.length > 0 || projectItems.length > 0) {
    enhancedFilterFunc("all");
  }
  
  // Initialize form button state
  if (form && formBtn) {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  }
});

// Add keyboard navigation support
document.addEventListener("keydown", function(e) {
  // Close modal with Escape key
  if (e.key === "Escape" && modalContainer && modalContainer.classList.contains("active")) {
    testimonialsModalFunc();
  }
  
  // Navigate through portfolio filters with arrow keys
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const activeFilter = document.querySelector("[data-filter-btn].active");
    if (activeFilter) {
      const filterButtons = Array.from(filterBtn);
      const currentIndex = filterButtons.indexOf(activeFilter);
      let nextIndex;
      
      if (e.key === "ArrowLeft") {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : filterButtons.length - 1;
      } else {
        nextIndex = currentIndex < filterButtons.length - 1 ? currentIndex + 1 : 0;
      }
      
      filterButtons[nextIndex].click();
    }
  }
});

// Add resize handler for responsive behavior
window.addEventListener("resize", function() {
  // Close mobile sidebar on resize to desktop
  if (window.innerWidth > 1024 && sidebar && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  }
});