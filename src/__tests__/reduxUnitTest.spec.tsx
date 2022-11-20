import { store } from '../redux/store';
import { deleteUser, updateUser, addNewUser } from '../redux/userSlice';

test('Updates a user author and title', () => {
  let state = store.getState().user;
  const unchangedUser = state.userList.find((user) => user.id === '1');
  expect(unchangedUser?.firstName).toBe('Jenny');
  expect(unchangedUser?.lastName).toBe('Beth');

  store.dispatch(updateUser({ id: '1', firstName: 'Jenny', lastName: 'Beth', address : 'Blvd. Broken Dreams 22', city : 'San Francisco', country:'usa' }));
  state = store.getState().user;
  let changeUser = state.userList.find((user) => user.id === '1');
  expect(changeUser?.firstName).toBe('Jenny');
  expect(changeUser?.lastName).toBe('Beth');

  store.dispatch(
    updateUser({ id: '1', firstName: 'Jenny', lastName: 'Beth', address : 'Blvd. Broken Dreams 21', city : 'San Francisco', country:'usa'  })
  );
  state = store.getState().user;
  const backToUnchangedUser = state.userList.find((user) => user.id === '1');

  expect(backToUnchangedUser).toEqual(unchangedUser);
});

test('Deletes a user from list with id', () => {
  let state = store.getState().user;
  const initialUserCount = state.userList.length;

  store.dispatch(deleteUser({ id: '1' }));
  state = store.getState().user;

  expect(state.userList.length).toBeLessThan(initialUserCount);

  // expect(backToUnchangedBook).toEqual(unchangedBook);
});

test('Adds a new user', () => {
  let state = store.getState().user;
  const initialUserCount = state.userList.length;

  store.dispatch(
    addNewUser({ id: '4', firstName: 'Imlet', lastName: 'Rajan',address : '276, Gandhinagar Palladam', city : 'Coimbatore', country:'ind'  })
  );
  state = store.getState().user;
  const newlyAddedUser = state.userList.find((user) => user.id === '4');
  expect(newlyAddedUser?.firstName).toBe('Imlet');
  expect(newlyAddedUser?.lastName).toBe('Rajan');
  expect(state.userList.length).toBeGreaterThan(initialUserCount);
});
