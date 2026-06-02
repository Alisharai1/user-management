import { Gender } from "../model/user.model";
import { UserRepo } from "../repo/user.repo";
import { UserService } from "./user.service";

describe(UserService.name, () => {

    describe(UserService.prototype.addUser.name, () => {


        test('should be able to add User', async () => {
            const addUserCommand = {
                name: 'ajay',
                age: 45,
                email: 'ajay@rr.com',
                gender: Gender.MALE
            }

            const userRepo = new UserRepo();
            const userService = new UserService(userRepo)

            const user = await userService.addUser(addUserCommand.name, addUserCommand.email, addUserCommand.age, addUserCommand.gender)


            expect(user.name).toEqual(addUserCommand.name);
            expect(user.age).toEqual(addUserCommand.age);
            expect(user.email).toEqual(addUserCommand.email);
            expect(user.gender).toEqual(addUserCommand.gender);
            expect(user.id).toBeDefined()
            expect(user.createdAt).toBeDefined()
            expect(user.updatedAt).toBeDefined()

        })
    })


})