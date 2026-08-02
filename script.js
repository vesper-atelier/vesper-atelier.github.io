const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(`Projet Vesper Atelier : ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\nRéponse souhaitée à : ${data.get('email')}`);
    window.location.href = `mailto:bonjour@vesper-atelier.fr?subject=${subject}&body=${body}`;
  });
}
