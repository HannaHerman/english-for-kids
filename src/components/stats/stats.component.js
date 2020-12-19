import { Component } from '../../library/index';

class AppStats extends Component {
  constructor(config) {
    super(config);
  }
}

export const appStats = new AppStats({
  selector: '#stats',
  template: require('./stats.html'),
});