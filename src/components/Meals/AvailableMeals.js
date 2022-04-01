import { useEffect } from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import { useState,useContext } from 'react'
import ErrorMessage from '../UI/ErrorMessage'
import CartContext from '../../store/cart-context'
const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)
  const cartCtx = useContext(CartContext)
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s'
      )
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const responseData = await response.json()
      const loadedMeals = responseData.meals.map((key) => {
        const itemPrice = 10.99 + Math.ceil(2 * Math.random())
        return {
          id: key.idMeal,
          name: key.strMeal,
          description: (
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel,
              consectetur.
            </p>
          ),
          price: itemPrice,
        }
      })
      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading</p>
      </section>
    )
  }
  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
  if(!cartCtx.isLoggedIn && cartCtx.err){
  setTimeout(()=>{
        <ErrorMessage/>
  },5000)
  }
   
  const mealsList = meals.map((meal) => (

    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      {!cartCtx.isLoggedIn && cartCtx.err && <ErrorMessage/>}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
