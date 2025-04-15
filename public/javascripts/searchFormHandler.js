document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.input-group-text i.fa-magnifying-glass');
    const searchForm = document.querySelector('.d-flex[action="/products/search"]');

    console.log('Script de búsqueda cargado'); // <--- Añade esto

    if (searchIcon && searchForm) {
        console.log('Icono y formulario encontrados'); // <--- Añade esto
        searchIcon.addEventListener('click', function() {
            console.log('Clic en el icono de búsqueda'); // <--- Añade esto
            searchForm.submit();
        });
    } else {
        console.log('No se encontraron el icono o el formulario de búsqueda'); // <--- Añade esto
    }
});