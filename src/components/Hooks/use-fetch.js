const fetchData = async (email, password) => {
  const response = await fetch(
    "https://reacthooks-9c135-default-rtdb.firebaseio.com/orders.json",
    {
      method: "GET",
    }
  );
  const data = await response.json();
  for (const key in data) {
    if (
      data[key].orders.emailAddress === email &&
      data[key].orders.password === password
    ) {
      return true;
    }
  }
};
const useFetch = (email, password) => {
  fetchData(email, password);
};
export default useFetch;
