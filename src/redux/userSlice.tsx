import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types';

type userType = {
  userList: UserState[];
};

const userList: UserState[] = [
  {
    id: '1',
    firstName: 'Jenny',
    lastName: 'Beth',
    address : 'Blvd. Broken Dreams 21',
    city : 'San Francisco',
    country : 'usa'
  },
  {
    id: '2',
    firstName: "Harry",
    lastName: 'Rowling',
    address : '183, Prestige Villa',
    city : 'Toronto',
    country : 'canada'
  },
  {
    id: '3',
    firstName: 'John',
    lastName: 'Doe',
    address : 'Confidential Group 155',
    city : 'New Delhi',
    country : 'india'
  },
];

const initialState: userType = {
  userList,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<UserState>) => {
      state.userList.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<UserState>) => {
      const {
        payload: { id, firstName, lastName, address, city, country },
      } = action;

      state.userList = state.userList.map((user) =>
        user.id === id ? { ...user, firstName, lastName, address, city, country } : user
      );
    },
    deleteUser: (state, action: PayloadAction<{ id: string }>) => {
      state.userList = state.userList.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },
});

export const { addNewUser, updateUser, deleteUser } = userSlice.actions;

//export const selectuserList = (state: RootState) => state.user.userList;

export default userSlice.reducer;
