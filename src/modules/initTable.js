import data from './data';

export default () => {
  const tablebody = document.querySelector('#tablebody');
  data.forEach(person => {
    const row = `<tr>${Object.keys(person)
      .map(key => `<td>${person[key]}</td>`)
      .join('')}</tr>`;
    tablebody.innerHTML += row;
  });
};
