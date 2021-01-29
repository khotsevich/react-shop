import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { logout } from '../store/actions/user.actions'

export const AppNavbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const cart = useSelector(state => state.user.cart)
  const isAdmin = useSelector(state => state.user.isAdmin)
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Никита</Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink to={'/'} exact={true} className={'nav-link'}>
          Главная
        </NavLink>
        {isAdmin && (
          <>
            <NavLink to={'/rest-add'} className={'nav-link'}>
              Добавить ресторан
            </NavLink>
            <NavLink to={'/rest-list'} className={'nav-link'}>
              Список ресторанов
            </NavLink>
            <NavLink to={'/dashboard'} className={'nav-link'}>
              Дашборд
            </NavLink>
          </>
        )}
      </Nav>
      {console.log(cart)}
      {isAuth ? (
        <Nav className="ml-auto">
          {!isAdmin && (
            <NavLink to={'/cart'} className={'nav-link'}>
              Корзина:{' '}
              {new Intl.NumberFormat('ru-RU').format(
                cart?.reduce((p, v) => p + parseInt(v.price), 0)
              )}
              ₽
            </NavLink>
          )}
          <NavLink to={'/profile'} className={'nav-link'}>
            Личный кабинет
          </NavLink>
          <Nav.Link onClick={logoutHandler} className={'nav-link bg-none'}>
            Выйти
          </Nav.Link>
        </Nav>
      ) : (
        <Nav className="ml-auto">
          <NavLink to={'/login'} className={'nav-link'}>
            Войти
          </NavLink>
          <NavLink to={'/register'} className={'nav-link'}>
            Регистрация
          </NavLink>
        </Nav>
      )}
    </Navbar>
  )
}
