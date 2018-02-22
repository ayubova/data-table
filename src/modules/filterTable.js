import renderPage from './renderPage';

export default rowsPerPage => {
    document.getElementById('submit').addEventListener('click', filterRows);

    function filterRows(e) {
        e.preventDefault();
        const rows = document.querySelectorAll('tbody > tr');
        [...rows].forEach(row => {
            row.classList.remove('filtered', 'hidden');
        });
        [...rows].forEach(row => {
            const querySearch = document.getElementById('search').value; //получаем значение, введенное в поле поиска
            //проверяем наличие как минимум в одной ячейки строки искомого запороса
            if (
                ![...row.children].some(td =>
                    td.textContent.toLowerCase().includes(querySearch.toLowerCase()))
            ) {
                row.classList.add('filtered');
            }
        });
        renderPage(rowsPerPage);
    }
};
