import { Router } from "express"
import { createUserSchema, getUserByIdParamsSchema, updateUserSchema, deleteUserByIdParamsSchema, getUserByEmailQuerySchema } from "./dto"
import { UserService } from "../service/user.service"
import { ValidationError } from "yup"

export const router = Router()

const userService = new UserService()

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        
        createUserSchema.validateSync(req.body, { abortEarly: false, strict: true })
        console.log(req.body);
        
        const user = await userService.addUser(req.body.name, req.body.email, req.body.age, req.body.gender)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);

        if (error instanceof ValidationError) {
            res.status(400).json({ error: error.errors })
        } else if (error instanceof Error) {
            res.status(404).json("user already exist,duplicate user can't be added")
        } else {
            res.status(500).json("internal server error")
        }
    }
})

router.get('/:id', async (req, res) => {
    try {
        getUserByIdParamsSchema.validateSync(req.params, { abortEarly: false, strict: true })
        const user = await userService.getUserById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(200).json({ error: error.errors })
        } else if (error instanceof Error) {
            res.status(404).json("user not found")
        } else {
            res.status(500).json("internal server error")
        }
    }
})

router.get('/', async (_req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(200).json({ error: error.errors })
        }
        else if (error instanceof Error) {
            res.status(404).json({ message: "users doesn't exist in database" })
        }
        else {
            res.status(500).json("internal server error")
        }
    }
})

router.get('/', async (req, res) => {
    try {
        getUserByEmailQuerySchema.validateSync(req.query, { abortEarly: false, strict: true })
        const user = await userService.getUserByEmail(req.body.email)
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(200).json({ error: error.errors })
        }
        else if (error instanceof Error) {
            res.status(404).json({ message: "user does not exist" })
        }
        else {
            res.status(500).json("internal server error")
        }
    }
})

router.put('/:id', async (req, res) => {
    try {
        updateUserSchema.validateSync(req.body, { abortEarly: false, strict: true })
        const updatedUser = await userService.updateUser(req.params.id, req.body.name, req.body.age)
        res.status(200).json(updatedUser)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(200).json({ error: error.errors })
        } else if (error instanceof Error) {
            res.status(404).json("user not found")
        } else {
            res.status(500).json("internal server error")
        }
    }
})

router.delete('/:id', async (req, res) => {
    try {
        deleteUserByIdParamsSchema.validateSync(req.params, { abortEarly: true, strict: false })
        await userService.deleteUser(req.params.id)
        res.status(200).json({ message: "user deleted successful" })
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(200).json({ error: error.errors })
        }
        else {
            res.status(500).json("internal server error")
        }
    }
})



