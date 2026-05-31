import { UserRepo } from "../repo/user.repo";
import { v4 } from 'uuid'
import { UserNotFoundException, UserAlreadyExistException, UserNotExistException } from "../error/UserException"

export class UserService {
    private userRepo
    constructor() {
        this.userRepo = new UserRepo()
    }
    async addUser(name: string, email: string, age: number, gender: string) {
        try {
            const user = await this.userRepo.getUserByEmail(email)
            if (user) {
                throw new UserAlreadyExistException("user already exist,duplicate user can't be added")
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
                throw new UserNotFoundException("user not found")
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
                throw new UserNotExistException("user does not exist ")
            }
            return user
        } catch (error) {
            throw error
        }

    }

    async getAllUsers() {
        try {
            const users = await this.userRepo.getAllUsers()
            console.log(users);
            
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

const service = new UserService()
// service.addUser('Priyank', 'pri@g.com', 26, 'male')
// service.getUserByEmail('amit12@gmail.com')
// service.getAllUsers()
// service.getUserById('8b190047-88b7-4ba3-81cd-ea2bccaebc7e')
// service.updateUser('8b190047-88b7-4ba3-81cd-ea2bccaebc7e','Smith Jones',16)
// service.deleteUser('c633e31d-f0f9-4f74-b867-338a70a4acb9')
