import { Card } from '../library/tools/Card';
import create from '../library/tools/create';
import { router } from '../library/tools/router';
import { get } from '../library/tools/storage';
import { del } from '../library/tools/storage';

export class NewTab extends Card {
  constructor(...args) {
    super(...args);
  };
  
  selectInfo() {
    let rout = router.getUrl();
    if (rout === 'stats') {
      this.onLoad();
      document.addEventListener('click', this.handleStats.bind(this));
    } else {
      return this.cardsData[rout];
    }
  };

  generateLayout() {
    let rout = router.getUrl();

    if (rout === 'stats') {
      this.deactivateStartBtn(false);
      this.onLoad();
      document.addEventListener('click', this.handleStats.bind(this));
      return
    } else if (rout !== 'stats') {
      let statistics = document.querySelector('.stats');
      if (statistics) {
        document.querySelector('.stats').classList.add('hidden-stat');
        document.querySelector('.cards-list').classList.remove('stat-mode');
      }
    }

    let genObject = this.cardsData[rout];
    const actLink = document.querySelector('.active-link');

    if (actLink) {
      actLink.classList.remove('active-link');
    }

    const visitedLink = document.getElementById(`${rout}`);

    if (visitedLink) {
      visitedLink.classList.add('active-link');
    } else {
      document.getElementById('main-page').classList.add('active-link');
    }
    
    if (!genObject) {
      this.deactivateStartBtn(false);
      this.cardsData['menu'].forEach(element => {
      this.generateMenu(element);
      });
    } else {
      this.deactivateStartBtn(this.isGame);
      genObject.forEach(element => {
      this.generateCard(element);
      });
    };
  };

  handleStats(e) {
    if (e.target.tagName === 'TH') {
      this.sortTable(e);
    }

    if (e.target.dataset.value === 'reset') {
      this.resetStats();
    }
    if (e.target.dataset.value === 'repeat') {
      this.repeatWords();
    }
    
  };

  resetStats() {
    del('stat');
    this.onLoad();
  };

  sortTable(e) {
    const th = e.target;
    const tableContent = document.getElementById('table-content');

    const sortedTable = (index, type, asc) => {
      const rowsArray = Array.from(tableContent.rows);
      let compare;

      if (type === 'number') {
        compare = (rowA, rowB) => rowA.cells[index].innerHTML - rowB.cells[index].innerHTML;
      } else {
        compare = (rowA, rowB) => (rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? 1 : -1);
      }
      rowsArray.sort(compare);

      if (asc) rowsArray.reverse();

      tableContent.append(...rowsArray);
    };

    if (!th || !tableContent || th.tagName !== 'TH') return;
    const ths = th.parentNode.querySelectorAll('th');
    let asc;

    ths.forEach(el => {
      if (el === th) {
        asc = th.classList.contains('asc');
        th.classList.add('sorted');

        if (asc) {
          th.classList.remove('asc');
        } else {
          th.classList.add('asc');
        }
        return;
      }
      el.removeAttribute('class');
    });

    tableContent.className = `sorted-col-${th.cellIndex + 1}`;
    sortedTable(th.cellIndex, th.dataset.type, asc);
  };

  onLoad() {
    document.querySelector('.cards-list').innerHTML = '';
    const statField = document.querySelector('.hidden-stat');
    if (statField) {
      statField.classList.remove('hidden-stat');
      document.querySelector('.cards-list').classList.add('stat-mode');
    }
    const table = document.getElementById('stats-game');
    const categories = this.cardsData.menu.map(cat => ({ title: cat.title, key: cat.link.slice(1) }));
    let tbody = '';
    let json = get('stat');

    categories.forEach(el => {
      tbody += `${this.cardsData[el.key].map(group => {
        let choosen = 0; let right = 0; let error = 0; let percent = 0;
        const wordStat = json ? json[group.word] : 0;

        if (json) {
          choosen = wordStat ? wordStat.choosen : 0;
          right = wordStat ? wordStat.right : 0;
          error = wordStat ? wordStat.error : 0;
          if (right && !error) {
            percent = 0;
          } else if (!right && error) {
            percent = 100;
          } else if (right && error) {
            percent = (error / (right + error) * 100).toFixed(2);
          }
        }

        return `
        <tr>
          <td class="td-1 fixed-col">
            ${group.word[0].toUpperCase()}${group.word.slice(1)}
          </td>
          <td class="td-2">${el.title}</td>
          <td class="td-3">
            ${group.translation[0].toUpperCase()}${group.translation.slice(1)}
          </td>
          <td class="td-4">${choosen}</td>
          <td class="td-5">${right}</td>
          <td class="td-6">${error}</td>
          <td class="td-7">${percent}</td>
        </tr>`;
      }).join('')}
        `;
    });
    table.tBodies[0].innerHTML = tbody;
  };

  repeatWords() {
    let json = get('stat');
    if(!json) {
      let infoContainer = document.querySelector('.stats');
      create('div', 'info-message', "Oops! You haven't got statistics yet", infoContainer);
      setTimeout(() => {
        document.querySelector('.info-message').remove();
      }, 2000);
      return
    }
    let mistakesArr = [];

    for (let key in json) {
      if ((json[key]).error !== 0) {
        mistakesArr.push([key, (json[key]).error]);
      }
    }
    mistakesArr.sort((a, b) => {
      return b[1] - a[1];
    });

    let genInfo = this.generateInfoFromCards(mistakesArr);

    let statistics = document.querySelector('.stats');

    if (statistics) {
      document.querySelector('.stats').classList.add('hidden-stat');
      document.querySelector('.cards-list').classList.remove('stat-mode');
    }

    this.deactivateStartBtn(false);
    genInfo.forEach(element => {
      this.isGame = false;
      this.generateCard(element);
      this.isGame = document.querySelector('.check').checked;
    });
  };
  
  generateInfoFromCards(arr) {
    if (arr.length > 10) {
      arr.splice(8, arr.length - 8);
    }

    let infoArr = [];

    for (let i = 0; i < arr.length; i++) {
      for (let key in this.cardsData) {
        this.cardsData[key].forEach(el => {
          if(el.word === (arr[i])[0]) {
            infoArr.push(el);
          };
        });
      };
    };

    return infoArr;
  };
};




