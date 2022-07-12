import classes from './ErrorMessage.module.css'
const ErrorMessage = () => {
    return <div className={classes.errMessage}>
    <p className={classes.errText}>please login to add items to the cart</p>
    </div>

}
export default ErrorMessage