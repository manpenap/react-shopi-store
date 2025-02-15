import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import NotLogin from '../NotLogin'
import SignIn from '../SignIn'
import LogIn from '../LogIn'
import Navbar  from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'

const AppRoutes = ()=>{
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/all', element: <Home />},
    {path: '/clothes', element: <Home />},
    {path: '/electronics', element: <Home />},
    {path: '/furnitures', element: <Home />},
    {path: '/shoes', element: <Home />},
    {path: '/others', element: <Home />},
    {path: '/my-account', element: <MyAccount />},
    {path: '/my-order', element: <MyOrder />},
    {path: '/my-orders', element: <MyOrders />},
    {path: '/my-orders/last', element: <MyOrder />},
    {path: '/my-orders/:id', element: <MyOrder />},
    {path: '/*', element: <NotFound />},
    {path: '/sign-in', element: <SignIn />},
    {path: '/log-in', element: <LogIn />},
    {path: '/all/not-login', element: <NotLogin />},
    {path: '/clothes/not-login', element: <NotLogin />},
    {path: '/electronics/not-login', element: <NotLogin />},
    {path: '/furnitures/not-login', element: <NotLogin />},
    {path: '/shoes/not-login', element: <NotLogin />},
    {path: '/others/not-login', element: <NotLogin />},

  ])

  return routes
}

const App = () => {


  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>

  )
}

export default App
