async function request(path, options = {}) {
  const res = await fetch(
    `https://lsvrwyvtzl.execute-api.us-east-1.amazonaws.com/dev/${path}`,
    {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    }
  );
  const data = await res.json();
  try {
    return { status: res.status, data: data };
  } catch {
    return { status: res.status, data: null };
  }
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
