import { User } from '../../../domain/entities/user.entity';

export const users: User[] = [
    {
        id: '4d717326-ea6a-46dc-a57a-77c70fe692af',
        name: 'John Doe',
        email: 'john@test.com',
        password: '1234',
        wallet: '0xE5754D48EBb64F9C5afb63db6bedfE7e46e72Faf',
    },
    {
        id: '00bd0c74-2eff-42c0-a9eb-261bcad1b3ea',
        name: 'Jane Doe',
        email: 'jane@test.com',
        password: '4321',
        wallet: '0xcE7107ec6EDa6027c7757826a5De4F98c1278905',
    },
];


class UsersRepository {
  findAll() {
    return users;
  }
}

export default new UsersRepository();
