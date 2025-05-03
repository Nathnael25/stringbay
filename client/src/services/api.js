api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (tokekn) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
