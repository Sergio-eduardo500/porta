document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btnVerMas');
    let expanded = false;

    if (!btn) return;

    btn.addEventListener('click', function () {
        const items = document.querySelectorAll('.proyecto-extra');

        if (!expanded) {
            items.forEach((el, i) => {
                setTimeout(() => el.classList.add('show'), i * 120);
            });
            btn.textContent = 'Ver menos';
        } else {
            items.forEach(el => el.classList.remove('show'));
            btn.textContent = 'Ver más proyectos';
        }

        expanded = !expanded;
    });
});