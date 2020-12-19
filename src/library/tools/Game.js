import create from './create';
import { router } from './router';
import { get } from './storage';
import { set } from './storage';

export class Game {
  constructor(cardsData) {
    this.cardsData = cardsData;
    this.genArr;
    this.mistakes = 0;
    this.container = document.querySelector('.cards-list');
  };

  generateRandomArr() {
    let arr = [];
    const cardsNumber = 8;
    while (cardsNumber > arr.length) {
      let number = Math.floor(Math.random()*cardsNumber);
      if (!(arr.includes(number))) {
        arr.push(number);
      }
    }
    this.genArr = arr;
  };

  activateStartBtn() {
    if (router.getUrl() !== ''){
      const btnElement = document.querySelector('.game-button');
      btnElement.addEventListener('click', this.handleGame.bind(this));
    }
  };

  selectInfo() {
    let rout = router.getUrl();
    return this.cardsData[rout];
  };

  handleGame() {
    document.querySelector('.game-button').classList.add('hidden-btn');
    const controlsContainer = document.querySelector('.game__controls');
    const repeatBtn = create('button', 'repeat-word', 'Repeat');
    controlsContainer.prepend(repeatBtn);

    setTimeout(() => {
      this.playSelectedAudio();
    }, 1000);

    this.generateRandomArr();
    this.cardsData = this.selectInfo();
    

    repeatBtn.addEventListener('click', this.playSelectedAudio.bind(this));

    document.querySelectorAll('.cards-list-item').forEach(el => {
      el.addEventListener('click', this.processGame.bind(this));
    });

  };

  processGame(e) {
    let index = this.genArr[this.genArr.length - 1];
    const attemptsContainer = document.querySelector('.game-attempts');

    let choosenElement = e.target.closest('.cards-list-item');
    
    if (choosenElement.dataset.wasted === 'true') {
      return
    }

    let choosenWord = choosenElement.dataset.word;
    let spokenWord = this.cardsData[index].word;

    if (choosenWord === spokenWord) {
      this.playRight();
      this.saveStats(spokenWord, true);
      let el = create('span', 'correct-answer', null);
      attemptsContainer.prepend(el);
      this.genArr.splice(this.genArr.length - 1, 1);
      choosenElement.classList.add('guessed-element');
      choosenElement.dataset.wasted = 'true';
      if (this.genArr.length === 0) {
        document.querySelector('.game-attempts').innerHTML = '';
        document.querySelector('.repeat-word').classList.add('hidden-btn');
        if (this.mistakes === 0) {
          this.winEnd();
        } else {
          this.looseEnd();
        }
      } else {
        setTimeout(() => {
          this.playSelectedAudio();
        }, 1000);
      }
    } else {
      this.playError();
      this.saveStats(spokenWord, false);
      this.mistakes++;
      let el = create('span', 'error-answer', null);
      attemptsContainer.prepend(el);
    }
  };

  playSelectedAudio() {
    let index = this.genArr[this.genArr.length - 1]
    let audio = this.cardsData[index].audioSrc;
    let sayWord = new Audio(`${audio}`);
    sayWord.play();
  };

  playError() {
    const soundError = new Audio('./assets/audio/error.mp3');
    soundError.play();
  };

  playRight() {
    const soundRight = new Audio('./assets/audio/correct.mp3');
    soundRight.play();
  };

  winEnd() {
    const winScreen = document.querySelector('.win-screen');
    const soundWin = new Audio('./assets/audio/win.mp3');
    const cardsList = document.querySelector('.cards-list');
    cardsList.innerHTML = '';
    soundWin.play();
    winScreen.classList.add('win-end');
    create('h2', 'win-screen__title', 'Win!', winScreen);
    create('img', 'win-screen__img', null, winScreen, null, ['src', './assets/img/win.png']);
    setTimeout( () => {
      window.location.href = '#';
    }, 5000);
  };

  looseEnd() {
    const looseScreen = document.querySelector('.lose-screen');
    const soundLoose = new Audio('./assets/audio/loose.mp3');
    const cardsList = document.querySelector('.cards-list');
    cardsList.innerHTML = '';
    soundLoose.play();
    looseScreen.classList.add('loose-end');
    create('h2', 'lose-screen__title', `Mistakes: ${this.mistakes}`, looseScreen);
    create('img', 'lose-screen__img', null, looseScreen, null, ['src', './assets/img/loose.png']);
    setTimeout( () => {
      window.location.href = '#';
    }, 5000);
  };

  saveStats(word, isRight) {
    const statObj = get('stat');
    if(statObj) {
      if (word in statObj) {
        const wordStats = statObj[word];
        wordStats.choosen = (wordStats.choosen + 1);

        if (isRight) {
          wordStats.right = (wordStats.right + 1);
        } else {
          wordStats.error = (wordStats.error + 1);
        }

        statObj[word] = wordStats;
        set('stat', statObj);
      } else {
        if (isRight) {
          statObj[word] = {
            choosen: 1,
            right: 1,
            error: 0
          };
          set('stat', statObj);
        } else {
          statObj[word] = {
            choosen: 1,
            right: 0,
            error: 1
          };
          set('stat', statObj);
        }
      }
    } else {
      if (isRight) {
        let newStatObj = {
          [word]: {
            choosen: 1,
            right: 1,
            error: 0
          }
        };
        set('stat', newStatObj);
      } else {
        let newStatObj = {
          [word]: {
            choosen: 1,
            right: 0,
            error: 1
          }
        };
        set('stat', newStatObj);
      }
    }
  };
};
