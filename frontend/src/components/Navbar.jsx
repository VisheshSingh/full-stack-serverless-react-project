import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='bg-blue-600 text-white px-6 py-4 flex justify-between items-center'>
      <div className='text-xl font-bold'>
        <Link to='/'>Bookings app 🎟️</Link>
      </div>

      <ul className='flex space-x-6'>
        <li>
          <Link to='/' className='hover:text-gray-200'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/about' className='hover:text-gray-200'>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
