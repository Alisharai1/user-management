import { object, string, number } from 'yup'

export const createUserSchema = object({
    name: string().required(),
    email: string().email().required(),
    age: number().positive().integer().min(18).required().max(70),
    gender: string().required().oneOf(['female', 'male', 'others'])
}).required()

export const getUserByIdParamsSchema = object({
    id: string().required().uuid()
})

export const getUserByEmailQuerySchema = object({
    email: string().email().required(),
})

export const getAllUsersSchema = object({
    offset: number(),
    limit: number()
})

export const updateUserSchema = object({
    name: string().required(),
    age: number().positive().integer().min(18).required().max(70)
})

export const deleteUserByIdParamsSchema = object({
    id: string().required().uuid()
})
