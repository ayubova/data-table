import initTable from './modules/initTable';
import renderPage from './modules/renderPage';
import filterTable from './modules/filterTable';
import sortTable from './modules/sortTable';

//задаем количество строк на странице
const rowsPerPage = 10;

//формируем таблицу из файла json
initTable();

// отображаем страницу с пагинацией и добавляем события на кнопки
renderPage(rowsPerPage);

// поиск по таблице
filterTable(rowsPerPage);

// сортировка
sortTable(rowsPerPage);
