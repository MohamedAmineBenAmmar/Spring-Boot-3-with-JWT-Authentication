import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY4NTI4NDg0NCwiZXhwIjoxNjg2NzI0ODQ0fQ.BoYHZF0L46aY5ovoInzk-RxieHkB0t8y_HyO1cm1Z9Y';

const api = axios.create({

  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
