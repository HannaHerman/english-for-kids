import create from './create';

export class Card {
  constructor(isGame, cardsData) {
    this.isGame = isGame;
    this.cardsData = cardsData;
    this.container = document.querySelector('.cards-list');
  };

  generateMenu(menuInfo) {
    const menuItem = create('a', 'menu-item', [
      create('img', 'menu-item-img', null, null, null, ['src', menuInfo.image]),
      create('h2', 'menu-item-title', menuInfo.title)
    ], this.container, null, ['href', menuInfo.link]);
  };

  generateCard(elementInfo) {
    let cardDescription = 'card-description';
    let imgDisplay = 'card-img';
    if(this.isGame) {
      cardDescription = 'card-description hidden-description';
      imgDisplay = 'card-img game-img';
    } 

    const wordCard = create('div', 'cards-list-item', null, this.container, null, ['word', elementInfo.word]);
    this.frontSide = create('div', 'front-side', [
      create('div', `${imgDisplay}`, '', null, `url(${elementInfo.image})`),
      create('div', `${cardDescription}`, [
        create('h2', 'card-word-eng', elementInfo.word),
        create('button', 'card-turn')
      ])
    ], wordCard, null, ['audio', elementInfo.audioSrc]);

    this.backSide = create('div', 'back-side hidden-card', [
      create('div', 'card-img', '', null, `url(${elementInfo.image})`),
      create('div', `${cardDescription}`, [
        create('h2', 'card-word-rus', elementInfo.translation),
      ])
    ], wordCard);

    if (this.isGame) {
      return
    }

    this.frontSide.addEventListener('click', this.handle);
  };

  handle(e) {
    const target = e.target;

    if(e.type === 'click') {
      const frontCard = target.closest('.front-side');
      const audio = frontCard.dataset.audio;
      const sayWord = new Audio(`${audio}`);
      sayWord.play();
    }
    
    if(e.type === 'click' && target.tagName === 'BUTTON') {
      const card = target.closest('.cards-list-item');
      const [frontCard, backCard] = [card.firstChild, card.lastChild];
      const { left, top } = card.getBoundingClientRect();
      const [width, height] = [card.offsetWidth, card.offsetHeight];
      backCard.classList.remove('hidden-card');
      frontCard.classList.add('hidden-card');
      document.addEventListener('mousemove', (event) => {
        const { clientX: x, clientY: y } = event;
        if (x < left || x > left + width
        || y < top || y > top + height) {
          backCard.classList.add('hidden-card');
          frontCard.classList.remove('hidden-card');
        }
      });
    }
  };
    deactivateStartBtn(mode) {
    const btnElement = document.querySelector('.game-button');
    btnElement.classList.toggle('hidden-btn', (!mode));
  };
}