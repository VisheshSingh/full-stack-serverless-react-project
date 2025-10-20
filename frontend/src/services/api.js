const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  let data = null;
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    console.error('invalid JSON:', err);
    data = null;
  }

  return { status: res.status, data };
}

export const listAllBookings = () => request('/', { method: 'GET' });

export const createBooking = ({ firstName, lastName, bookingDate }) =>
  request('/', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, bookingDate }),
  });

export const updateBooking = (id, payload) =>
  request(`/${id}`, { method: 'PUT', body: JSON.stringify(payload) });

export const getBookingById = (id) => request(`/${id}`, { method: 'GET' });

export const deleteBooking = (id) => request(`/${id}`, { method: 'DELETE' });
