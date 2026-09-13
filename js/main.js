/**
 * VED PATHOLOGY LABORATORY - MAIN JAVASCRIPT
 * Doctor: Dr. Dhwani Bhatt M.D. (Pathology)
 * Credentials: Fellowship in Hemato-oncology at GCRI | 15+ Years Experience | Expertise in Hematology & Clinical Pathology
 * Phone / WhatsApp: +91 93161 04101
 * Email: ved.pathlab.ahmd@gmail.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initActiveNavLink();
  initMobileMenu();
  initSearchFilter();
  initPackageCategoryTabs();
  initHomeVisitForm();
});

const WHATSAPP_NUMBER = '919316104101';

/**
 * Robust active page detection supporting clean URLs (e.g. /contact, /about, /packages)
 */
function initActiveNavLink() {
  let path = window.location.pathname;
  let rawPage = path.split('/').filter(Boolean).pop() || 'index';
  let pageName = rawPage.split('#')[0].split('?')[0].toLowerCase().replace('.html', '');

  if (pageName === '' || pageName === 'index') {
    pageName = 'index';
  }

  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  const updateLinks = (linkList) => {
    linkList.forEach(link => {
      let hrefRaw = link.getAttribute('href') || '';
      let hrefName = hrefRaw.split('/').filter(Boolean).pop() || 'index';
      hrefName = hrefName.split('#')[0].split('?')[0].toLowerCase().replace('.html', '');

      if (hrefName === '' || hrefName === 'index') {
        hrefName = 'index';
      }

      if (hrefName === pageName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  updateLinks(desktopLinks);
  updateLinks(mobileLinks);
}

/**
 * Direct WhatsApp Message Dispatcher
 */
function sendWhatsAppMessage(customText) {
  const encodedText = encodeURIComponent(customText);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Book specific test package directly via WhatsApp
 */
function bookPackageWhatsApp(packageName, price) {
  const message = `Hello Ved Pathology Laboratory (+91 93161 04101),

I would like to inquire / book the *${packageName}* (${price || 'Standard Rate'}).

Please share the fasting guidelines and available appointment slots.

Thank you!`;
  sendWhatsAppMessage(message);
}

/**
 * General WhatsApp Quick Inquiry
 */
function quickWhatsAppInquiry(topic) {
  const topicText = topic ? ` regarding *${topic}*` : '';
  const message = `Hello Ved Pathology Laboratory (+91 93161 04101),

I have an inquiry${topicText}. Could you please assist me with details?

Doctor In-charge: Dr. Dhwani Bhatt M.D. (Pathology)
Fellowship in Hemato-oncology at GCRI`;
  sendWhatsAppMessage(message);
}

/**
 * Handle Home Sample Collection Form Submission
 */
function initHomeVisitForm() {
  const homeVisitForm = document.getElementById('homeVisitForm');
  if (!homeVisitForm) return;

  homeVisitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const patientName = document.getElementById('hvName').value.trim();
    const phone = document.getElementById('hvPhone').value.trim();
    const address = document.getElementById('hvAddress').value.trim();
    const testRequired = document.getElementById('hvTest').value.trim();
    const prefDate = document.getElementById('hvDate').value;
    const prefTime = document.getElementById('hvTime').value;

    if (!patientName || !phone || !address) {
      alert('Please fill in your Name, Phone Number, and Delivery Address.');
      return;
    }

    const whatsappMessage = `*HOME SAMPLE COLLECTION REQUEST*
🏥 *Ved Pathology Laboratory (+91 93161 04101)*

*Patient Details:*
• *Name:* ${patientName}
• *Phone:* ${phone}
• *Address:* ${address}
• *Test/Package:* ${testRequired || 'General Checkup / To be advised'}
• *Preferred Date:* ${prefDate || 'Earliest available'}
• *Preferred Time:* ${prefTime || 'Morning (7:30 AM - 11:30 AM)'}

Please confirm my home visit appointment slot. Thank you!`;

    sendWhatsAppMessage(whatsappMessage);
    closeModal('homeVisitModal');
    homeVisitForm.reset();
  });
}

/**
 * Mobile Drawer Menu Handler
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/**
 * Filter Packages by Category Tab
 */
function initPackageCategoryTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.package-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Live Search Filter for Packages and Tests
 */
function initSearchFilter() {
  const searchInput = document.getElementById('searchInput');
  const packageCards = document.querySelectorAll('.package-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    packageCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/**
 * Modal Popup Utilities
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
