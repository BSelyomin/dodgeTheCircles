fetch("http://localhost:3000/data", {
  method: "POST",
  body: JSON.stringify({ data: "some data to send" }),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((response) => console.log("Success:", JSON.stringify(response)))
  .catch((error) => console.error("Error:", error));
