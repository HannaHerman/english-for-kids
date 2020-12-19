import { Component } from '../../library/index';

class AppCardsList extends Component {
  constructor(config) {
    super(config);
  }
}

export const appCardsList = new AppCardsList({
  selector: '#content',
  template: require('./cards-list.html'),
});