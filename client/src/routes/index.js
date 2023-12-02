import ListOfMedicines from '../components/ListOfMedicines'
import Login from '../components/Login'
import Register from '../components/Register'
import Main from '../pages/Main'

export const publicRoutes = [
    {path: '/login', exact: true, element: <Login />},
    {path: '/registration', exact: true, element: <Register />},
]

export const privateRoutes = [
    {path: '/pharmacies', element: <Main />},   
    {path: '/pharmacies/:id', element: <ListOfMedicines />},
//     {path: '*', element: <Main />},
]