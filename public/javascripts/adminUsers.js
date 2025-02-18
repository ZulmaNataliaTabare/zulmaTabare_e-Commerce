
function filterTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#usersTable tbody tr');

    rows.forEach(row => {
        const name = row.children[1].innerText.toLowerCase();
        const username = row.children[2].innerText.toLowerCase();
        if (name.includes(input) || username.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}