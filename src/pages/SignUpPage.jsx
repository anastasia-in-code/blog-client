import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {signUp, isAuth} from '../redux/features/auth/authSlice.js'

export default function SignUpPage() {
  const [username, setUserName] = useState('')
  const [password, setUserPassword] = useState('')
  const {status} = useSelector(state => state.auth)
  const auth = useSelector(isAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect( () => { 
    if(status) toast(status)
    if(auth) navigate('/')
  }, [status, auth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(signUp({username, password}))
      setUserName('')
      setUserPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-lg text-white text-center">SignUp</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 juctify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4">
          SignUp
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-white">
          Already have an account?
        </Link>
      </div>
    </form>
  );
}
