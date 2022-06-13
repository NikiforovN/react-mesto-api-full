const baseUrl = "https://api.mesto.nikiforovnd.nomoreparties.sbs";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export function register({ password, email }) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse)
}

export function authorize({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
};

export function getContent(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    }
  })
    .then(checkResponse)
}