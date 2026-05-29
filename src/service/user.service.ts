import { UserRepo } from "../repo/user.repo";
import { v4 } from 'uuid'

export class UserService {
    private userRepo
    constructor() {
        this.userRepo = new UserRepo()
    }
    async addUser(name: string, email: string, age: number, gender: string){
        try {
            const user = await this.userRepo.getUserByEmail(email)
            if (user) {
                throw Error("user already exist,duplicate user can't be added")
            }
            const id = v4()
            await this.userRepo.addUser(id, name, email, age, gender)
            const newUser = await this.getUserById(id)
            return newUser
        } catch (error) {
            throw error
        }
    }

    async getUserById(id: string) {
        try {
            const user = await this.userRepo.getUserById(id)
            if (!user) {
                throw Error("user not found")
            }
            return user
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepo.getUserByEmail(email)
            if (!user) {
                throw Error("user does not exist ")
            }
            return user
        } catch (error) {
            throw error
        }

    }

    async getAllUsers() {
        try {
            const users = await this.userRepo.getAllUsers()
            return users
        } catch (error) {
            throw error
        }
    }

    async updateUser(id: string, name: string, age: number) {
        try {
            const user = await this.userRepo.getUserById(id)
            if (user) {
                await this.userRepo.updateUser(id, name, age)
            } return user
        } catch (error) {
            throw error
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await this.userRepo.getUserById(id)
            if (user) {
                await this.userRepo.deleteUser(id)
            }
        } catch (error) {
            throw error
        }
    }
}

// const service = new UserService()
// service.addUser('Sneha', 's@g.com', 20, 'female')
// service.getUserByEmail('neha590@g.com')
// service.getAllUsers()
// service.updateUser('46e21b83-4614-4f8b-82e5-2912f876874c','Dharshik Singh',16)
// service.deleteUser('c633e31d-f0f9-4f74-b867-338a70a4acb9')
