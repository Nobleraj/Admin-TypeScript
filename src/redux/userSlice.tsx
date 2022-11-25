import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState,UserStateAPI } from '../types';

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

const initialState: userType & UserStateAPI = {
  userList,
  isLoading : false,
  userName : {
    userId : '',
    id : '',
    title : '',
    completed : false
  }
};
//https://randomuser.me/api/
export const fetchUser = createAsyncThunk('user/fetchUsers', async () => {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(res=>res.json()).then(res=>{
    //const {data } = res;
    console.log('user',res);
    return res
  }).catch(err=>console.log('fetch err',err));
})

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
  extraReducers : builder =>{
     builder.addCase(fetchUser.pending,(state,action)=>{
      state.isLoading = true;
     })
     builder.addCase(fetchUser.fulfilled,(state,action)=>{
      console.log("action", action.payload);
      state.isLoading = false;
      state.userName = action.payload;
     })
     builder.addCase(fetchUser.rejected,(state,action)=>{
      state.isLoading = false;
     })
  }
});

export const { addNewUser, updateUser, deleteUser } = userSlice.actions;

//export const selectuserList = (state: RootState) => state.user.userList;

export default userSlice.reducer;
