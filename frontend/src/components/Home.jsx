import { useEffect, useState } from 'react';
import {
  createBooking,
  deleteBooking,
  getBookingById,
  listAllBookings,
  updateBooking,
} from '../services/api';

const Home = () => {
  const [bookings, setBookings] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editBookingId, setEditBookingId] = useState(null);

  async function fetchBookings() {
    const res = await listAllBookings();
    if (res.status === 200) setBookings(res.data);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!isEditMode) {
      await createBooking({ firstName, lastName, bookingDate });
    } else {
      await updateBooking(editBookingId, { firstName, lastName, bookingDate });
      setIsEditMode(false);
      setEditBookingId(null);
    }
    setFirstName('');
    setLastName('');
    setBookingDate('');
    fetchBookings();
  }

  async function handleEdit(bookingId) {
    setIsEditMode(true);
    setEditBookingId(bookingId);
    const res = await getBookingById(bookingId);
    if (res.status === 200) {
      const bookingToUpdate = res.data;
      console.log({ bookingToUpdate });
      setFirstName(bookingToUpdate.firstName);
      setLastName(bookingToUpdate.lastName);
      setBookingDate(bookingToUpdate.bookingDate);
    }
  }

  async function handleDelete(bookingId) {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    const res = await deleteBooking(bookingId);

    if (res.status === 204) {
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>Create Booking</h1>
        <form onSubmit={handleFormSubmit} className='flex gap-2 mb-6'>
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
            {isEditMode ? 'Update' : 'Create'}
          </button>
        </form>
        <h1 className='text-3xl font-bold mb-4'>List all bookings</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {bookings.map((booking) => (
            <div key={booking.id} className='p-4 bg-white rounded shadow'>
              <h2 className='font-semibold'>
                {booking.firstName} {booking.lastName}
              </h2>
              <p className='text-xs text-gray-500'>
                {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                  timeZone: 'UTC',
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <div className='mt-2 flex gap-2'>
                <button
                  className='text-sm text-blue-600 cursor-pointer'
                  onClick={() => handleEdit(booking.id)}
                >
                  Edit📝
                </button>
                <button
                  className='text-sm text-red-600 cursor-pointer'
                  onClick={() => handleDelete(booking.id)}
                >
                  Delete❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
