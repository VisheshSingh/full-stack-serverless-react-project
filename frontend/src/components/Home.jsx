import { useEffect, useState } from 'react';
import { createBooking, listAllBookings } from '../services/api';

const Home = () => {
  const [bookings, setBookings] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  async function fetchBookings() {
    const res = await listAllBookings();
    if (res.status === 200) setBookings(res.data);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    await createBooking({ firstName, lastName, bookingDate });
    setFirstName('');
    setLastName('');
    setBookingDate('');
    fetchBookings();
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>List all bookings</h1>
        <form onSubmit={handleCreate} className='flex gap-2 mb-6'>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First name'
            className='flex-1 p-2 border rounded'
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last name'
            className='flex-1 p-2 border rounded'
          />
          <input
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            placeholder='Booking Date'
            className='flex-1 p-2 border rounded'
            type='date'
            name='booking-date'
          />
          <button className='px-4 py-2 bg-blue-600 text-white rounded'>
            Create
          </button>
        </form>
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
  );
};

export default Home;
