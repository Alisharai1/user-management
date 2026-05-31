import { Gender } from "../model/user.model";
import axios from 'axios';

class UserProvider {
    private readonly baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = new URL(baseUrl).toString()
    }

    async create(body: {
        name: string,
        email: string,
        gender: Gender
        age: number
    }) {
        const response = await axios.post(`${this.baseUrl}users`, body);

        console.log(response.data, response.headers, response.status);

        return {
            status: response.status,
            data: response.data
        }
    }

    async getAllUsers() {
        const response = await axios.get(`${this.baseUrl}users`)

        console.log(response.data, response.headers, response.status);

        return {
            status: response.status,
            data: response.data
        }
    }

    async getUserById(id: string) {
        const response = await axios.get(`${this.baseUrl}users/${id}`)
        console.log(response.data, response.status, response.headers);
        return {
            status: response.status,
            data: response.data
        }
    }

    async updateUser(
        id: string,
        body: {
            name: string,
            age: number
        }) {
        const response = await axios.put(`${this.baseUrl}users/${id}`, body)
        console.log(response.data, response.status, response.headers);

        return {
            status: response.status,
            data: response.data
        }
    }

    async deleteUser(id: string) {
        const response = await axios.delete(`${this.baseUrl}users/${id}`)
        console.log(response.status, response.headers);

        return {
            status: response.status,
            message: "user deleted sccessfully"
        }
    }
}



// new UserProvider('http://localhost:4000/').create({
//     name: "Maria",
//     gender: Gender.FEMALE,
//     email: "maria@gmail.com",
//     age: 54
// })

// new UserProvider('http://localhost:4000/').getAllUsers()

// new UserProvider('http://localhost:4000/').getUserById('917ef561-499b-4844-9c9f-86452c042db4')

// new UserProvider('http://localhost:4000/').updateUser('917ef561-499b-4844-9c9f-86452c042db4', {
//     name: "Ajay kr Yadav",
//     age: 31
// })

new UserProvider('http://localhost:4000/').deleteUser('917ef561-499b-4844-9c9f-86452c042db4')