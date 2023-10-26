import { signUp } from "../controllers/auth";
import UserRepository from "../database/repositories/User";
import { createPassword, passwordCheck } from "../passport/password";
import { IUser, IUserInput, IUserSchema } from "../types/User";
class UserService {
  repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  async signUp(userInputs: IUserInput): Promise<IUserSchema> {
    try {
      const { email, password } = userInputs;

      const { salt, hashedPassword } = createPassword(password);

      const userCreated = await this.repository.create({
        email,
        password: hashedPassword,
        salt,
      });

      return userCreated;
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  }
}

export default UserService;
