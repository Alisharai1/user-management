export enum Gender {
    FEMALE = "female",
    MALE = "male"
}
export type User = { id: string, name: string, email: string, age: number, gender: Gender, createdAt: Date, updatedAt: Date }