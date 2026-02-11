
document.addEventListener('astro:page-load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }

   
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('.lang-switch');
        if (target) {
            sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        }
    });
});
