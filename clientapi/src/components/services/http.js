import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE;

// axios.interceptors.response.use(null, (error) => {
//   if (error.response && error.response.status === 404)
//     window.location.href = '/error/NotFound';
//   if (
//     (error.response && error.response.status === 500) ||
//     (error.response && error.response.status === 503)
//   )
//     window.location.href = '/error/InternalServerError';
//   if (
//     error.response &&
//     error.response.status === 401 &&
//     error.response.config.url !== '/login'
//   )
//     window.location.href = '/error/ExpiredToken';
//   // AQUI DEBATIR SI SE PONE EL INTERCEPTOR PARA LOS 401. CREO QUE SERIA UNA BUENA OPCION

//   if (
//     error.response &&
//     error.response.status === 401 &&
//     error.response.config.url !== '/login'
//   ) {
//     setTimeout(() => {
//       auth.logout();
//     }, 2000);
//     //return (error = error.response);
//   }
//   return Promise.reject(error);
// });

// Con este interceptors se captura todas las peticiones y se valida la existencia del token
// de existir se envia en los headers con el key Autorization, sino existe se envia vacia ''

// axios.interceptors.request.use(function (config) {
//   let tokenActive = sessionStorage.getItem('TOKEN');
//   config.headers['x-auth-token'] = tokenActive ? `${tokenActive}` : '';
//   return config;
// });

// export const setJWT = () => {
//   let TOKEN = sessionStorage.getItem('TOKEN');
//   axios.defaults.headers.common['x-auth-token'] = TOKEN;
// };

const UNEXPECTED_ERROR_MESSAGE = [
  {
    value: "unexpected error",
    msg: "Se ha producido un error inesperado. Contacte con soporte por favor.",
    param: "request",
    location: "body",
  },
];

const getErrorMessages = (data) => {
  if (data) {
    return data.message;
  } else {
    return UNEXPECTED_ERROR_MESSAGE;
  }
};

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  getErrorMessages,
  UNEXPECTED_ERROR_MESSAGE,
};

export default http;
