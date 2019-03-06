
import Settings from "../utilities/Settings"

export default {
  get(id) {
    return fetch(`${Settings.url}/users/${id}`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${Settings.url}/users/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getAll() {
    return fetch(`${Settings.url}/users`).then(e => e.json())
  },
  addUser(obj) {
    return fetch(`${Settings.url}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  searchUP(username, password) {
    return fetch(
      `${Settings.url}/users?username=${username}&password=${password}`
    ).then(e => e.json())
  },
  searchUsername(username) {
    return fetch(`${Settings.url}/users?username=${username}`).then(e =>
      e.json()
    )
  }
}