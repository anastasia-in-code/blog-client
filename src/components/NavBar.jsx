import React from "react";
import { Link, NavLink } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

import {isAuth, logout} from '../redux/features/auth/authSlice.js'

export default function NavBar() {
  const auth = useSelector(isAuth);
  const dispatch = useDispatch()

  const activeStyles = {
    color: "white",
  };

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('You were logged out')
  }

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        B
      </span>
      {auth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              className="text-xs text-gray-400 hover:text-white">
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              className="text-xs text-gray-400 hover:text-white">
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
              className="text-xs text-gray-400 hover:text-white">
              Add Post
            </NavLink>
          </li>
        </ul>
      )}
      <div className="flex justify-center items-senter bg-gray-600 text-xs text-white rounded-am px-4 py-2">
        {auth? <button
        onClick={logoutHandler}>Logout</button> : <Link to={'/login'}>Login</Link>}
      </div>
    </div>
  );
}
