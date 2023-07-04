import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from './components/Layout'
import AddPostPage from './pages/AddPostPage'
import EditPostPage from './pages/EditPostPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import PostsPage from './pages/PostsPage'
import PostPage from './pages/PostPage'
import MainPage from './pages/MainPage'

import { getMe } from './redux/features/auth/authSlice.js'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='posts' element={<PostsPage />} />
        <Route path=':id' element={<PostPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
        <Route path='new' element={<AddPostPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>

      <ToastContainer position='bottom-right' />
    </Layout>
  )
}

export default App;
