const BASE_URL = "http://localhost:5000/api";
export const addCustomer = async (data) => {
  const res = await fetch(`${BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCustomers = async () => {
  const res = await fetch(`${BASE_URL}/customers`);
  return res.json();
};

export const addItem = async (data) => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getItems = async () => {
  const res = await fetch(`${BASE_URL}/items`);
  return res.json();
};
export const createBill = async (data) => {
  const res = await fetch("http://localhost:5000/api/bills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
export const getBills = async () => {
  const res = await fetch("http://localhost:5000/api/bills");
  return res.json();
};