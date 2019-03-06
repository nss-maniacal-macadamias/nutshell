import Settings from "./Settings"

export default Object.create(null, {
    GET: {
        value: function (id) {
            return fetch(`${Settings.url}/${this.array}/${id}`)
                .then(r => r.json())
        }
    },
    GETALL: {
        value: function () {
            return fetch(`${Settings.url}/${this.array}`)
                .then(r => r.json())
        }
    },
    DELETE: {
        value: function (id) {
            return fetch(`${Settings.url}/${this.array}/${id}`,
                {
                    method: "DELETE"
                })
        }
    },
    POST: {
        value: function (obj) {
            return fetch(`${Settings.url}/${this.array}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(data => data.json())
        }
    },
    PUT: {
        value: function (obj) {
            return fetch(`${Settings.url}/${this.array}/${obj.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(data => data.json());
        }
    }
})