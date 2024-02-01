function status(request, response) {
  response.status(200).json({ valor: "status OK" });
}

export default status;
