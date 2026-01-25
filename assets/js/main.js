/**
* Template Name: Style
* Template URL: https://bootstrapmade.com/style-bootstrap-portfolio-template/
* Updated: Jul 02 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
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
   * Initiate Pure Counter
   */
  new PureCounter();

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
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

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

  /**
   * Edit Mode Functionality
   */
  const editBtn = document.getElementById('edit-btn');
  let isEditMode = false;

  editBtn.addEventListener('click', function() {
    const password = prompt('Enter password to enable editing:');
    if (password === '21321007') {
      isEditMode = !isEditMode;
      toggleEditMode();
    } else {
      alert('Incorrect password');
    }
  });

  function toggleEditMode() {
    const editableElements = document.querySelectorAll('.editable');
    if (isEditMode) {
      editBtn.textContent = 'Save';
      editBtn.classList.add('btn-primary');
      editBtn.classList.remove('btn-outline-primary');
      editableElements.forEach(el => {
        el.contentEditable = true;
        el.classList.add('editing');
        // Load from localStorage
        const key = el.dataset.key;
        if (key && localStorage.getItem(key)) {
          el.textContent = localStorage.getItem(key);
        }
      });
      // Show file upload
      showFileUpload();
    } else {
      editBtn.textContent = 'Edit';
      editBtn.classList.remove('btn-primary');
      editBtn.classList.add('btn-outline-primary');
      editableElements.forEach(el => {
        el.contentEditable = false;
        el.classList.remove('editing');
        // Save to localStorage
        const key = el.dataset.key;
        if (key) {
          localStorage.setItem(key, el.textContent);
        }
      });
      // Hide file upload
      hideFileUpload();
    }
  }

  function showFileUpload() {
    let uploadSection = document.getElementById('file-upload-section');
    if (!uploadSection) {
      uploadSection = document.createElement('div');
      uploadSection.id = 'file-upload-section';
      uploadSection.innerHTML = `
        <div class="container section-title">
          <h2>Upload Files</h2>
        </div>
        <div class="container">
          <input type="file" id="file-input" multiple accept="image/*">
          <div id="uploaded-files" class="row g-4 mt-4"></div>
        </div>
      `;
      document.querySelector('main').appendChild(uploadSection);
      
      const fileInput = document.getElementById('file-input');
      fileInput.addEventListener('change', handleFileUpload);
    }
    uploadSection.style.display = 'block';
    loadUploadedFiles();
  }

  function hideFileUpload() {
    const uploadSection = document.getElementById('file-upload-section');
    if (uploadSection) {
      uploadSection.style.display = 'none';
    }
  }

  function handleFileUpload(event) {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
        uploadedFiles.push({
          name: file.name,
          data: e.target.result,
          type: file.type
        });
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
        loadUploadedFiles();
      };
      reader.readAsDataURL(file);
    }
  }

  function loadUploadedFiles() {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    const container = document.getElementById('uploaded-files');
    container.innerHTML = '';
    uploadedFiles.forEach((file, index) => {
      const col = document.createElement('div');
      col.className = 'col-lg-3 col-md-6';
      col.innerHTML = `
        <div class="photo-item">
          <img src="${file.data}" alt="${file.name}" class="img-fluid">
          <div class="photo-overlay">
            <h4>${file.name}</h4>
            <button class="btn btn-danger btn-sm delete-file" data-index="${index}">Delete</button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
    // Add delete listeners
    document.querySelectorAll('.delete-file').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = this.dataset.index;
        const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
        uploadedFiles.splice(index, 1);
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
        loadUploadedFiles();
      });
    });
  }

})();