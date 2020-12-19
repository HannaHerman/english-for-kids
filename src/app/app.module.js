import { CoreModule } from '../library/index';
import { homeComponent } from '../components/home/home.component';
import { appHeader } from '../components/header/header.component';
import { appCardsList } from '../components/cards-list/cards-list.component';
import { appStats } from '../components/stats/stats.component';
import { appFooter } from '../components/footer/footer.component';
import { appRoutes } from './app.routes';


class AppModule extends CoreModule {
  constructor(config) {
    super(config);
  }
};


export const appModule = new AppModule({
  components: [
    appHeader,
    appCardsList,
    appStats,
    appFooter
  ],
  start: homeComponent,
  routes: appRoutes
});
