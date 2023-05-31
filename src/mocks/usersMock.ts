import User from '../modules/database/entities/user.entity';

const usersMockData = [
  {
    id: 1,
    name: 'misha',
    password: '123321',
    user_type_id: 1,
    created_by_id: null,
  },
  {
    id: 2,
    name: 'misha 2',
    password: '123321',
    user_type_id: 1,
    created_by_id: null,
  },
  {
    id: 3,
    name: 'user',
    password: '123321',
    user_type_id: 3,
    created_by_id: 2,
  },
];

const userMock = new User();
userMock.id = 1;
userMock.username = 'misha';
userMock.password = '123321';
userMock.user_type_id = 1;
userMock.created_by_id = 0;

const usersMock = usersMockData.map((userData) => {
  return {...new User(), ...userData};
});

export default usersMock;
