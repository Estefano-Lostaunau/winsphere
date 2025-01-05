import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/public/logo_winsphere_bg.png';
import { useAuth } from '../../contexts/authContext';

function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh the page to update the header
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" to="/">
              <span className="sr-only">Home</span>
              <img src={logo} alt="description" className="h-8" />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link className="text-gray-500 transition hover:text-gray-500/75" to="/roulette"> Roulette </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                >
                  <span className="sr-only">Toggle dashboard menu</span>
                  <h2>{`${user.firstName} ${user.lastName}`}</h2>
                  <img
                    src={user.photoUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="size-10 object-cover"
                  />
                </button>
                <div
                  className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  <div className="p-2">
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      My profile
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      Billing summary
                    </a>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      Team settings
                    </a>
                  </div>
                  <div className="p-2">
                    <form method="POST" action="#">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                          />
                        </svg>
                        Logout
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  to="/login"
                >
                  Login
                </Link>
                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
            <div className="block md:hidden">
            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;