import { UserDTO } from '../dtos/user.dto';

export interface IUserRepository {
  findOneByUsername(username: string): Promise<UserDTO>;
}
