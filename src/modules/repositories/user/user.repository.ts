import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { UserDTO } from "../../dtos/user.dto";
import { IUserRepository } from "../../interfaces/user.repository.interface";

const prisma = new PrismaClient();

@injectable()
export class UserRepository implements IUserRepository {
  public async findOneByUsername(username: string): Promise<UserDTO> {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
