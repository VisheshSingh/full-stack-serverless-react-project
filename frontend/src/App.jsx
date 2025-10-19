import { useEffect, useState } from 'react';
import './App.css';
import { listAllBookings } from './services/api';

function App() {
  const [bookings, setBookings] = useState([]);

  async function fetchBookings() {
    const res = await listAllBookings();
    if (res.status === 200) setBookings(res.data);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <div className='min-h-screen bg-gray-50 p-4'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-3xl font-bold mb-4'>All Bookings</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {bookings.map((booking) => (
              <div key={booking.id} className='p-4 bg-white rounded shadow'>
                <h2 className='font-semibold'>
                  {booking.firstName} {booking.lastName}
                </h2>
                <p className='text-xs text-gray-500'>
                  {new Date(booking.createdAt).toDateString()}
                </p>
                <div className='mt-2 flex gap-2'>
                  <button className='text-sm text-yellow-600'>Edit</button>
                  <button className='text-sm text-red-600'>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
