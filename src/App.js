import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { Login } from './components/Login'
import { AppNavbar } from './components/Navbar'
import { Main } from './components/Main'
import { Cart } from './components/Cart'
import { Profile } from './components/Profile'
import { Register } from './components/Register'
import { RestAdd } from './components/admin/RestAdd'
import { RestList } from './components/admin/RestList'
import { Dashboard } from './components/admin/Dashboard'
import { Rest } from './components/Rest'

export const App = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const isAdmin = useSelector(state => state.user.isAdmin)

  return (
    <>
      <AppNavbar />
      <Container>
        <Switch>
          <Route path={'/'} exact={true} component={Main} />
          <Route path={'/rests/:id'} component={Rest} />
          {isAdmin && <Route path={'/rest-add'} component={RestAdd} />}
          {isAdmin && <Route path={'/rest-list'} component={RestList} />}
          {isAdmin && <Route path={'/dashboard'} component={Dashboard} />}
          {isAuth && <Route path={'/cart'} component={Cart} />}
          {isAuth && <Route path={'/profile'} component={Profile} />}
          {!isAuth && <Route path={'/login'} component={Login} />}
          {!isAuth && <Route path={'/register'} component={Register} />}
          <Redirect to={'/'} />
        </Switch>
      </Container>
    </>
  )
}
