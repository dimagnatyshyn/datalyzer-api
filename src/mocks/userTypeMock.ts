import UserType from '../modules/database/entities/userType.entity';
import User from '../modules/database/entities/user.entity';

const userTypes = [
  {
    id: 1,
    name: 'admin',
  },
  {
    id: 2,
    name: 'user',
  },
];

const userTypesMock = userTypes.map((userType) => {
  return {...new UserType(), ...userType};
});

export default userTypesMock;
