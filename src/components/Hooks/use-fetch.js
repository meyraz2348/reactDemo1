const fetchData = async (firstName, lastName, email, password) => {
  console.log(firstName, lastName, email, password);
  await fetch(
    "https://reacthooks-9c135-default-rtdb.firebaseio.com/orders.json",
    {
      method: "POST",
      body: JSON.stringify({
        customerId: Math.trunc(10000000 * Math.random()),
        user: {
          firstName,
          lastName,
          email,
          password,
        },
        orderedItems: [],
      }),
    }
  );
};
const useFetch = (firstName, lastName, email, password) => {
  console.log("inside fetch");
  fetchData(firstName, lastName, email, password);
};
export default useFetch;
