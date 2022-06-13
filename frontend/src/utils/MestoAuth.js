const baseUrl = "https://api.mesto.nikiforovnd.nomoreparties.sbs";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export function register({password, email}){
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
      })
      .then(checkResponse)
}

export function authorize({email, password}){
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
  };

  export function getContent(token){
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(checkResponse)
  }