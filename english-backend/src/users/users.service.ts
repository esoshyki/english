import { Injectable } from '@nestjs/common'

export type User = {
  name: string
  password: string
  userId: Symbol
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: Symbol(),
      password: 'Bubench1k1',
      name: 'shyki',
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username)
  }
}
