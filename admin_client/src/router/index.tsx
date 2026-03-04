import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';

import PlacesList from '../pages/places/PlacesList';
import AddPlace from '../pages/places/AddPlace';

import HotelsList from '../pages/hotels/HotelsList';
import AddHotel from '../pages/hotels/AddHotel';

import HostelsList from '../pages/hostels/HostelsList';
import AddHostel from '../pages/hostels/AddHostel';

import RestaurantsList from '../pages/restaurants/RestaurantsList';
import AddRestaurant from '../pages/restaurants/AddRestaurant';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'places',
        children: [
          { index: true, element: <PlacesList /> },
          { path: 'add', element: <AddPlace /> },
        ]
      },
      {
        path: 'hotels',
        children: [
          { index: true, element: <HotelsList /> },
          { path: 'add', element: <AddHotel /> },
        ]
      },
      {
        path: 'hostels',
        children: [
          { index: true, element: <HostelsList /> },
          { path: 'add', element: <AddHostel /> },
        ]
      },
      {
        path: 'restaurants',
        children: [
          { index: true, element: <RestaurantsList /> },
          { path: 'add', element: <AddRestaurant /> },
        ]
      },
    ],
  },
]);
