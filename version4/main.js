document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('side-nav');
    const navHighlight = document.getElementById('nav-highlight');
    const navItems = Array.from(nav.querySelectorAll('li.nav-cta'));
    const mainContent = document.getElementById('main-content');

    function updateHighlight() {
        const scrollPosition = mainContent.scrollTop + mainContent.clientHeight / 2;

        let activeIndex = 0;

        navItems.forEach((item, i) => {
            const targetId = item.dataset.target;
            const section = document.getElementById(targetId);
            if (section) {
                if (scrollPosition >= section.offsetTop) {
                    activeIndex = i;
                }
            }
        });

        const activeItem = navItems[activeIndex];
        const offsetTop = activeItem.offsetTop;
        navHighlight.style.top = offsetTop + 'px';

        navItems.forEach((item, i) => {
            item.classList.toggle('active', i === activeIndex);
        });
    }

    mainContent.addEventListener('scroll', updateHighlight);
    updateHighlight();
});
