import { User } from '../model/user.model'
import { db } from './db'
// import { v4 } from 'uuid'

export class UserRepo {

    async addUser(id: string, name: string, email: string, age: number, gender: string) {
        try {
            await db.none('INSERT INTO Users (id,name,email,age,gender)VALUES ($1,$2,$3,$4,$5);', [id, name, email, age, gender])
        } catch (error) {
            throw error
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const user = await db.oneOrNone('SELECT id, name,email,age,gender,created_at AS "createdAt",updated_at AS "updatedAt" FROM Users WHERE id=$1 LIMIT 1;', [id])
            console.log(user);
            return user
        } catch (error) {
            throw error
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const users = await db.manyOrNone('SELECT id,name,email,age,gender,created_at AS createdAt,updated_at AS updatedAt FROM Users')

            return users
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await db.oneOrNone('SELECT id,name,age,gender,created_at AS "createdAt",updated_at AS "updatedAt" FROM Users WHERE email=$1;', [email])
            console.log(user);
            return user
        } catch (error) {
            throw error
        }
    }

    async updateUser(id: string, name: string, age: number) {
        try {
            const user = await this.getUserById(id)
            if (user) {
                await db.none('UPDATE Users SET name=$2,age=$3 WHERE id=$1;', [id, name, age])
                const updatedUser = await this.getUserById(id)
                console.log(updatedUser);
            }
        } catch (error) {
            throw error
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await this.getUserById(id)
            if (user) {
                await db.none('DELETE FROM Users WHERE id=$1;', [id])
            }
        } catch (error) {
            throw error
        }
    }
}

// const repo = new UserRepo()

// repo.addUser(v4(), 'Alisha', 'alisha1221@g.com', 24, 'female')
// repo.addUser(v4(), 'Manisha', 'manisha3443@g.com', 34, 'female')
// repo.addUser(v4(), 'Dharshik', 'dharshik5665@g.com', 14, 'male')
// repo.addUser(v4(), 'Ajay', 'ajay7887@g.com', 44, 'male')

// repo.getUserById('8a71816e-9465-4efa-a3c3-45b0147c29e0')

// repo.getAllUsers()

// repo.getUserByEmail('dharshik5665@g.com')
// repo.updateUser('e75193d7-7736-41cb-b2dd-735c97775e22','manisha3443@g.com', 'Rakshita', 23)

// repo.deleteUser('e75193d7-7736-41cb-b2dd-735c97775e22')





