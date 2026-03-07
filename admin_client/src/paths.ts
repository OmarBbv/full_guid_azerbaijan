export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    hostels: '/dashboard/hostels',
    hostelsCreate: '/dashboard/hostels/create',
    landmarks: '/dashboard/landmarks',
    landmarksCreate: '/dashboard/landmarks/create',
    hotels: '/dashboard/hotels',
    hotelsCreate: '/dashboard/hotels/create',
    places: '/dashboard/places',
    placesCreate: '/dashboard/places/create',
    restaurants: '/dashboard/restaurants',
    restaurantsCreate: '/dashboard/restaurants/create',
  },
  errors: { notFound: '/errors/not-found' },
} as const;

