import { Gender } from "../model/user.model";

class UserProvider {
    constructor() {

    }

    async create(body: {
        name: string,
        email: string,
        gender: Gender
        age: number
    }) {
        const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const responseBody = await response.json()

        console.log(responseBody, response.headers, response.status);

        return {
            status: response.status,
            responseBody
        }
    }

    async getData() {
        const response = await fetch('http://localhost:4000/users', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        const responseBody = await response.json()
        console.log(responseBody, response.headers, response.status);

        return {
            status: response.status,
            responseBody
        }
    }

    async updateUser(
        id: string,
        body: {
            name: string,
            age: number
        }) {
        const response = await fetch(`http://localhost:4000/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const responseBody = await response.json()
        console.log(responseBody, response.status, response.headers);

        return {
            status: response.status,
            responseBody
        }
    }

    async deleteUser(id: string) {
        const response = await fetch(`http://localhost:4000/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const responseBody = await response.json()
        console.log(responseBody, response.status, response.headers);

        return {
            status: response.status
        }
    }

}



// new UserProvider().create({
//     name: "Ankit",
//     gender: Gender.MALE,
//     email: "ankit12@gmail.com",
//     age: 34
// })

// new UserProvider().getData()

// new UserProvider().updateUser('c5832010-7952-41ee-9d9c-012e91211736', {
//     name: "John",
//     age: 33
// })

new UserProvider().deleteUser('c5832010-7952-41ee-9d9c-012e91211736')