import { Fragment, useState } from 'react'
import HeaderCartButton from './HeaderCartButton'
import mealsImage from '../../assets/bbq.jpg'
import classes from './Header.module.css'


const Header = (props) => {
  const cartButton = <HeaderCartButton onCart={props.onShowCart} onAccount = {props.onShowAccount} />
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Grill in Geeks</h1>
        {cartButton}
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  )
}

export default Header
