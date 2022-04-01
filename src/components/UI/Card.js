import classes from './Card.module.css'

const Card = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.border}>{props.children}</div>
    </div>
  )
}

export default Card
