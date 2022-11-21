import { store } from '../redux/store';
import { deleteUser, updateUser, addNewUser } from '../redux/userSlice';

test('Update an user author and title', () => {
  let state = store.getState().user;
  const unchangedUser = state.userList.find((user) => user.id === '1');
  expect(unchangedUser?.firstName).toBe('Jenny');
  expect(unchangedUser?.lastName).toBe('Beth');

  let editedUser = { id: '1', firstName: 'Jenny', lastName: 'Beth', address : 'Blvd. Broken Dreams 22', city : 'San Francisco', country:'usa' };
  store.dispatch(updateUser(editedUser));
  state = store.getState().user;
  let changeUser = state.userList.find((user) => user.id === '1');
  expect(changeUser?.firstName).toBe('Jenny');
  expect(changeUser?.lastName).toBe('Beth');
  expect(changeUser?.address).toBe('Blvd. Broken Dreams 22');
  expect(changeUser?.city).toBe('San Francisco');
  expect(changeUser?.country).toBe('usa');
  expect(changeUser?.address).not.toEqual(unchangedUser?.address);

  store.dispatch(
    updateUser({ id: '1', firstName: 'Jenny', lastName: 'Beth', address : 'Blvd. Broken Dreams 21', city : 'San Francisco', country:'usa'  })
  );
  state = store.getState().user;
  const backToUnchangedUser = state.userList.find((user) => user.id === '1');

  expect(backToUnchangedUser).toEqual(unchangedUser);
});

test('Delete an user from list with id', () => {
  let state = store.getState().user;
  const initialUserCount = state.userList.length;

  store.dispatch(deleteUser({ id: '1' }));
  state = store.getState().user;

  expect(state.userList.length).toBeLessThan(initialUserCount);

  // expect(backToUnchangedBook).toEqual(unchangedBook);
});

test('Add a new user', () => {
  let state = store.getState().user;
  const initialUserCount = state.userList.length;

  store.dispatch(
    addNewUser({ id: '4', firstName: 'Imlet', lastName: 'Rajan',address : '276, Gandhinagar Palladam', city : 'Coimbatore', country:'ind'  })
  );
  state = store.getState().user;
  const newlyAddedUser = state.userList.find((user) => user.id === '4');
  expect(newlyAddedUser?.firstName).toBe('Imlet');
  expect(newlyAddedUser?.lastName).toBe('Rajan');
  expect(newlyAddedUser?.address).toBe('276, Gandhinagar Palladam');
  expect(newlyAddedUser?.city).toBe('Coimbatore');
  expect(newlyAddedUser?.country).toBe('ind');
  expect(state.userList.length).toBeGreaterThan(initialUserCount);
});
