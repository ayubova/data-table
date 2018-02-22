import renderPage from './renderPage';

export default rowsPerPage => {
    const headers = [...document.getElementsByTagName('th')];
    headers.forEach(header => header.addEventListener('click', sortRows));
    //функции сравнения для разных типов
    const compareDates = (a, b) => new Date(a) - new Date(b);
    const compareWords = (a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1);
    const compareNumbers = (a, b) => Number(a) - Number(b);
    const compareSalary = (a, b) =>
        +a.replace(/[$,]/g, '') - +b.replace(/[$,]/g, '');
    //реализуем полиморфизм типов
    const compareByType = {
        name: compareWords,
        position: compareWords,
        office: compareWords,
        age: compareNumbers,
        date: compareDates,
        salary: compareSalary,
    };
    //callback-функция сортировки
    function sortRows(e) {
    //определяем тип столбца
        const cellType = e.target.dataset.type;
        //находим инцекс столбца
        const cellIndex = headers.findIndex(th => th.dataset.type === cellType);
        //задаем фукнцию сравнения
        const compare = (row1, row2) =>
            compareByType[cellType](
                row1.cells[cellIndex].innerHTML,
                row2.cells[cellIndex].innerHTML);

        const rows = [...document.querySelectorAll('tbody > tr')];
        const header = headers[cellIndex];
        let sortedRows;

        // снимаем класс active со всех стрелок
        [...document.querySelectorAll('.arrow-up, .arrow-down')].forEach(element =>
            element.classList.remove('inactive'));

        // выставляем условия сортировки и отображения стрелок
        const arrowUp = header.getElementsByClassName('arrow-up')[0];
        const arrowDown = header.getElementsByClassName('arrow-down')[0];
        if (header.classList.contains('sort-asc')) {
            arrowUp.classList.add('inactive');
            arrowDown.classList.remove('inactive');
            sortedRows = rows.sort(compare).reverse();
            header.classList.remove('sort-asc');
            header.classList.add('sort-desc');
        } else if (header.classList.contains('sort-desc')) {
            arrowDown.classList.add('inactive');
            arrowUp.classList.remove('inactive');
            sortedRows = rows.sort(compare);
            header.classList.remove('sort-desc');
            header.classList.add('sort-asc');
        } else {
            arrowDown.classList.add('inactive');
            arrowUp.classList.remove('inactive');
            sortedRows = rows.sort(compare);
            header.classList.add('sort-asc');
        }

        //меняем содержимое таблицы
        const tbody = document.getElementById('tablebody');
        tbody.innerHTML = '';
        sortedRows.forEach(row => {
            row.classList.remove('hidden');
            tbody.appendChild(row);
        });
        renderPage(rowsPerPage);
    }
};
