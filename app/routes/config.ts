import {
  AuthManagement,
  DashboardManagement,
  LocationAddManagement,
  LocationDetailsManagement,
  LocationListManagement,
  RestaurantListManagement,
  RestaurantAddManagement,
  RestaurantDetailsManagement,
  ActivityListManagement,
  ActivityAddManagement,
  ActivityDetailsManagement,
  UserListManagement,
  UserDetailsManagement,
  ProfileManagement,
  EntriesManagement
} from 'pages';

export const appRoutes = [
  { label: 'Dashboard', href: '/dashboard' },
  {
    label: 'Location',
    initiallyOpened: false,
    href: '/locations',
    links: [
      { label: 'Locations', href: '/locations' },
      { label: 'Add location', href: '/locations/new' }
    ]
  },
  {
    label: 'Restaurant',
    initiallyOpened: false,
    href: '/restaurants',
    links: [
      { label: 'Restaurants', href: '/restaurants' },
      { label: 'Add Restaurant', href: '/restaurants/new' }
    ]
  },
  {
    label: 'Activity',
    initiallyOpened: false,
    href: '/activities',
    links: [
      { label: 'Activities', href: '/activities' },
      { label: 'Add Activity', href: '/activities/new' }
    ]
  },
  {
    label: 'Entries',
    initiallyOpened: false,
    href: '/entries'
  },
  {
    label: 'User Data',
    initiallyOpened: false,
    href: '/users'
  }
];

export const pageRoutes = {
  public: [
    { path: '/login', component: AuthManagement, section: 'login' },
    { path: '/forgot-password', component: AuthManagement, section: 'fp' },
    { path: '/reset-password/:verificationId', component: AuthManagement, section: 'reset' }
  ],
  private: [
    { path: '/dashboard', component: DashboardManagement },
    { path: '/locations', component: LocationListManagement },
    { path: '/locations/new', component: LocationAddManagement },
    { path: '/locations/:id/update', component: LocationAddManagement },
    { path: '/locations/:id', component: LocationDetailsManagement },
    { path: '/restaurants', component: RestaurantListManagement },
    { path: '/restaurants/new', component: RestaurantAddManagement },
    { path: '/restaurants/:id/update', component: RestaurantAddManagement },
    { path: '/restaurants/:id', component: RestaurantDetailsManagement },
    { path: '/activities', component: ActivityListManagement },
    { path: '/activities/new', component: ActivityAddManagement },
    { path: '/activities/:id/update', component: ActivityAddManagement },
    { path: '/activities/:id', component: ActivityDetailsManagement },
    { path: '/users', component: UserListManagement },
    { path: '/users/:id', component: UserDetailsManagement },
    { path: '/entries', component: EntriesManagement },
    { path: '/profile', component: ProfileManagement }
  ],
  error: [{ path: '*', component: AuthManagement }]
};
