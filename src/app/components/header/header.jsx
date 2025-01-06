import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '/public/logo_winsphere_bg.png';
import { useAuth } from '../../contexts/authContext';
import { useIntl } from 'react-intl';
import './header.css';

function Header({ toggleLocale, currentLocale = 'en' }) { // Valor por defecto 'en'
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [hamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const menuRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const intl = useIntl();

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh the page to update the header
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleHamburgerMenu = () => {
    setHamburgerMenuVisible(!hamburgerMenuVisible);
  };

  const closeHamburgerMenu = () => {
    setHamburgerMenuVisible(false);
  };

  const handleLocaleChange = (locale) => {
    toggleLocale(locale);
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
      if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target)) {
        setHamburgerMenuVisible(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-lg backdrop-filter backdrop-brightness-90 z-50">
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
                  <Link className="text-rose-600 font-bold" to="/roulette"> {intl.formatMessage({ id: 'roulette' })} </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-white">      
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  className="flex items-center gap-2  px-4 py-2 rounded-lg"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Toggle dashboard menu</span>
                  <h2 className="text-sm font-medium text-rose-600">{`${user.firstName} ${user.lastName}`}</h2>
                  <img
                    src={user.photoUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>

                {menuVisible && (
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
                        {intl.formatMessage({ id: 'my_profile' })}
                      </a>
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        {intl.formatMessage({ id: 'billing_summary' })}
                      </a>
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                      >
                        {intl.formatMessage({ id: 'team_settings' })}
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
                          {intl.formatMessage({ id: 'logout' })}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  to="/login"
                >
                  {intl.formatMessage({ id: 'login' })}
                </Link>
                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-rose-600"
                    to="/register"
                  >
                    {intl.formatMessage({ id: 'register' })}
                  </Link>
                </div>
              </div>
            )}
            <div className="block md:hidden" ref={hamburgerMenuRef}>
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={toggleHamburgerMenu}
              >
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

              {hamburgerMenuVisible && (
                <div
                  className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                >
                  {!user && (
                    <div className="p-2 sm:hidden">
                      <Link
                        to="/register"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        role="menuitem"
                        onClick={closeHamburgerMenu}
                      >
                        {intl.formatMessage({ id: 'register' })}
                      </Link>
                    </div>
                  )}
                  <div className="p-2">
                    <Link
                      to="/roulette"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                      onClick={closeHamburgerMenu}
                    >
                      {intl.formatMessage({ id: 'roulette' })}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={dropdownRef}>
            <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="appearance-none bg-gray-100 text-rose-400 rounded-lg p-[7px] pr-8 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent"
            >
            {intl.formatMessage({ id: 'switch_language' })}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M7 10l5 5 5-5H7z" />
                </svg>
            </div>
            </button>
              {dropdownVisible && (
                <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
                  <ul className="py-1">
                    <li
                      onClick={() => handleLocaleChange('en')}
                      className="cursor-pointer px-4 py-1 text-rose-600 hover:bg-gray-100 rounded-t-md"
                    >
                      EN
                    </li>
                    <li
                      onClick={() => handleLocaleChange('es')}
                      className="cursor-pointer px-4 py-1 text-rose-600 hover:bg-gray-100 rounded-b-md"
                    >
                      ES
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;