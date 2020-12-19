import { homeComponent } from '../components/home/home.component';
import { appCardsList } from '../components/cards-list/cards-list.component';
import { appStats } from '../components/stats/stats.component';


export const appRoutes = [
  { path: '', component: homeComponent },
  { path: 'action-a', component: appCardsList },
  { path: 'action-b', component: appCardsList },
  { path: 'food', component: appCardsList },
  { path: 'emotions', component: appCardsList },
  { path: 'animal-a', component: appCardsList },
  { path: 'animal-b', component: appCardsList },
  { path: 'clothes', component: appCardsList },
  { path: 'transport', component: appCardsList },
  { path: 'stats', component: appStats}
];