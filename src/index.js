import { init } from './library/core/init';
import { appModule as applicationModule } from './app/app.module';
import { NewTab } from './app/app.tabs';
import { cards as cardsInfo } from './data/cards';
import { appHeader } from './components/header/header.component';
import { appCardsList } from './components/cards-list/cards-list.component';
import { Game } from './library/tools/Game';


let isGame = false;

init(applicationModule);
new NewTab(isGame, cardsInfo).generateLayout();
appHeader.hideBurger();

window.addEventListener('hashchange', (e) => {
  console.log(appHeader.hideBurger());
  appCardsList.render();
  appHeader.hideBurger();
  new NewTab(isGame, cardsInfo).generateLayout();
  if (isGame) {
    new Game(cardsInfo).activateStartBtn();
  }
});

const checkMode = document.querySelector('.check');

checkMode.addEventListener('click', () => {
  isGame = checkMode.checked;
  appCardsList.render();
  console.log(appHeader.hideBurger());
  appHeader.hideBurger();
  new NewTab(isGame, cardsInfo).generateLayout();
  new Game(cardsInfo).activateStartBtn();
});


