async function getData() {
  try {
    const response = await fetch("http://localhost:8080/identity/users");
    const data = await response.json();
    console.log(data);
  }
  catch (error) {
    console.error("Error loading product data:", error);
  }
}
getData();