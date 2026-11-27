const gallery = document.querySelector('.product-gallery');

if (gallery?.querySelector('.gallery-open')) {
    const openButton = gallery.querySelector('.gallery-open');
    const mainImage = gallery.querySelector('#gallery-main');
    const thumbnails = [...gallery.querySelectorAll('[data-image]')];
    const dialog = gallery.querySelector('.gallery-dialog');
    const enlarged = dialog.querySelector('.gallery-enlarged');
    const count = dialog.querySelector('.gallery-count');
    const images = thumbnails.length ? thumbnails.map(button => button.dataset.image) : [mainImage.src];
    let current = 0;
    let touchStart = null;

    function selectImage(index) {
        current = (index + images.length) % images.length;
        mainImage.src = images[current];
        if (dialog.open) enlarged.src = images[current];
        thumbnails.forEach((button, position) => {
            button.setAttribute('aria-pressed', String(position === current));
        });
        if (count) count.textContent = `${current + 1} / ${images.length}`;
    }

    thumbnails.forEach((button, index) => {
        button.addEventListener('click', () => selectImage(index));
    });

    openButton.addEventListener('click', () => {
        dialog.showModal();
        selectImage(current);
    });
    dialog.addEventListener('close', () => openButton.focus());
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });

    dialog.querySelector('.gallery-prev')?.addEventListener('click', () => selectImage(current - 1));
    dialog.querySelector('.gallery-next')?.addEventListener('click', () => selectImage(current + 1));
    dialog.addEventListener('keydown', event => {
        if (images.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        selectImage(current + (event.key === 'ArrowLeft' ? -1 : 1));
    });

    enlarged.addEventListener('touchstart', event => {
        touchStart = event.touches.length === 1 ? event.touches[0] : null;
    }, { passive: true });
    enlarged.addEventListener('touchend', event => {
        if (!touchStart || images.length < 2) return;
        const end = event.changedTouches[0];
        const dx = end.clientX - touchStart.clientX;
        const dy = end.clientY - touchStart.clientY;
        touchStart = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            selectImage(current + (dx < 0 ? 1 : -1));
        }
    }, { passive: true });
    enlarged.addEventListener('touchcancel', () => { touchStart = null; });
}

const contactMessage = document.querySelector('.floating-wa-copy');

if (contactMessage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const messages = ['7/24 Online Sipariş', 'Ürün Bilgisi Al', 'WhatsApp’tan Teklif Al'];
    let messageIndex = 0;

    window.setInterval(() => {
        if (document.hidden || contactMessage.parentElement.matches(':hover, :focus-within')) return;
        messageIndex = (messageIndex + 1) % messages.length;
        contactMessage.textContent = messages[messageIndex];
        contactMessage.animate([
            { opacity: 0, transform: 'translateX(5px)' },
            { opacity: 1, transform: 'translateX(0)' }
        ], { duration: 240, easing: 'ease-out' });
    }, 3500);
}
