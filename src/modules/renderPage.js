export default rowsPerPage => {
  const rows = document.querySelectorAll('tbody > tr');
  const paginator = document.getElementById('paginator');

  //считаем количество отображаемых кнопок
  const pagesCount = Math.ceil(
    [...rows].filter(row => !row.classList.contains('filtered')).length / //выбираем строки с учетом фильтра при поиске и делим их количество на количество строк на страницу
      rowsPerPage,
  );
  // добавляем кнопки
  paginator.innerHTML = ''; //обновляем кнопки при изменении количества страниц при фильтрации
  for (let i = 1; i <= pagesCount; i++) {
    paginator.innerHTML += `<a id="${i}">${i}</a>`;
  }
  paginator.children[0].classList.add('current'); //на первую кнопку ставим класс 'current'
  //добавляем кнопки previous и next (на previous сразу ставим disabled, чтобы он был неактивным при загрузке)
  paginator.innerHTML = `<a id="prevButton" class="disabled">Previous</a>${
    paginator.innerHTML
  }<a id="nextButton">Next</a>`;

  //отображаем страницу с учетом фильтра (выводим на первой странице 10 элементов, остальные скрываем)
  [...rows]
    .filter(row => !row.classList.contains('filtered'))
    .slice(rowsPerPage)
    .forEach(row => row.classList.add('hidden'));

  let currentPage = 1; //задаем текущую страницу по умолчанию

  //показываем содержимое страницы в зависимости от ее номера
  const refreshPage = targetPage => {
    currentPage = targetPage;
    const activeRows = [...rows].filter(
      //строки, не попавшие под фильтр при поиске
      row => !row.classList.contains('filtered'),
    );
    const activeRowsNumber = activeRows.length;
    const nextButton = document.getElementById('nextButton');
    if (currentPage >= activeRowsNumber / rowsPerPage) {
      //если текущая страница === последняя страница - делаем кнопку Next неактивной
      nextButton.classList.add('disabled');
    } else {
      //иначе делаем активной
      nextButton.classList.remove('disabled');
    }

    const prevButton = document.getElementById('prevButton');
    if (currentPage == 1) {
      //если текущая страница === первая страница - делаем кнопку Previous неактивной
      prevButton.classList.add('disabled');
    } else {
      //иначе делаем активной
      prevButton.classList.remove('disabled');
    }

    [...rows].forEach(row => row.classList.add('hidden')); //скрываем все строки
    const maxIndex = // Определяем максимально возможный индекс строки таблицы на отображаемой странице (учитывая случай последней страницы, где записей меньше, чем строк на странице)
      targetPage * rowsPerPage > activeRowsNumber
        ? activeRowsNumber - 1
        : targetPage * rowsPerPage - 1;

    // отображаем все необходимые строки на странице, снимая класс hidden
    for (
      let rowIndex = (targetPage - 1) * rowsPerPage;
      rowIndex <= maxIndex;
      rowIndex++
    ) {
      activeRows[rowIndex].classList.remove('hidden');
    }
    currentPage = targetPage; //меняем номер текущей страницы
    document.querySelector('.current').classList.remove('current'); //снимаем класс 'current'
    document.getElementById(targetPage).classList.add('current'); //добавляем на текущую страницу класс 'current'
  };

  //добавляем событие на кпопку Next
  document
    .getElementById('nextButton')
    .addEventListener('click', () => refreshPage(currentPage + 1));

  //добавляем событие на кпопку Previous
  document
    .getElementById('prevButton')
    .addEventListener('click', () => refreshPage(currentPage - 1));

  //добавляем события на номерные кнопки
  const buttons = [...document.getElementById('paginator').children];
  const numButtons = buttons.slice(1, -1); //выбираем все номерные кнопки
  numButtons.forEach(numButton =>
    numButton.addEventListener('click', () =>
      refreshPage(parseInt(numButton.id)),
    ),
  );
};
