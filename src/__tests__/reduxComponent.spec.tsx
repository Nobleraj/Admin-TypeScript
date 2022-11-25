import {
  render,
  screen,
  fireEvent,
  RenderResult
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import AddUser from '../pages/AddUser';
import { Route, MemoryRouter } from 'react-router-dom';

import { store } from '../redux/store';
import { UserState } from '../types';
import UserInfo from '../components/UserInfo';

const renderAddUser = (): RenderResult =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AddUser />
      </MemoryRouter>
    </Provider>
  );

const renderUpdateUser = (id: string): RenderResult =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/update-user/${id}`]}>
        <Route path="/update-user/:id">
          <AddUser />
        </Route>
      </MemoryRouter>
    </Provider>
  );

const getAUser = (userId: string): UserState => {
  const user = store
    .getState()
    .user.userList.find((user) => user.id === userId);
  expect(user).not.toBeUndefined();
  return user as UserState;
};

const renderUserInfo = (user: UserState): RenderResult =>
  render(
    <Provider store={store}>
      <UserInfo key={user.id} firstName={user.firstName} lastName={user.lastName} address={user.address} id={user.id} city={user.city} country={user.country}/>
    </Provider>
  );

test('AddUser form with error validation', ()=>{
  renderAddUser();
  
  const firstName = screen.getByPlaceholderText('John');
  expect(firstName).toBeInTheDocument();
  fireEvent.change(firstName, { target: { value: 'Noble' } });
  expect(firstName).toHaveValue('Noble');

  let submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(screen.getByText("All fields are mandatory.")).toBeInTheDocument();
});

test('AddUser form with success validation', ()=>{
  renderAddUser();

  const firstName = screen.getByPlaceholderText('John');
  expect(firstName).toBeInTheDocument();
  fireEvent.change(firstName, { target: { value: 'Noble' } });
  expect(firstName).toHaveValue('Noble');

  let lastName = screen.getByPlaceholderText('Doe');
  expect(lastName).toBeInTheDocument();
  fireEvent.change(lastName, { target: { value: 'raj' } });
  expect(lastName).toHaveValue('raj');

  let address = screen.getByPlaceholderText('Blvd. Broken Dreams 21');
  expect(address).toBeInTheDocument();
  fireEvent.change(address, { target: { value: '276, Gandhinagar palladam' } });
  expect(address).toHaveValue('276, Gandhinagar palladam');

  let city = screen.getByPlaceholderText('San Francisco');
  expect(city).toBeInTheDocument();
  fireEvent.change(city, { target: { value: 'Tiruppur' } });
  expect(city).toHaveValue('Tiruppur');

  let country = screen.getByTestId("select");
  fireEvent.change(country, { target: { value: 'india' } });
  expect(screen.getByText('India')).toBeInTheDocument();

  let submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(screen.queryByText("All fields are mandatory.")).toBeNull();
  
  expect(screen.getByText("User created successfully.")).toBeInTheDocument();
});

test('AddUser page', () => {
  renderAddUser();
  const initialLength = store.getState().user.userList.length;

  //expect(screen.getByText('First name is required')).toBeInTheDocument();

  const firstName = screen.getByPlaceholderText('John');
  expect(firstName).toBeInTheDocument();
  fireEvent.change(firstName, { target: { value: 'Noble' } });
  expect(firstName).toHaveValue('Noble');

  let lastName = screen.getByPlaceholderText('Doe');
  expect(lastName).toBeInTheDocument();
  fireEvent.change(lastName, { target: { value: 'raj' } });
  expect(lastName).toHaveValue('raj');

  let address = screen.getByPlaceholderText('Blvd. Broken Dreams 21');
  expect(address).toBeInTheDocument();
  fireEvent.change(address, { target: { value: '276, Gandhinagar palladam' } });
  expect(address).toHaveValue('276, Gandhinagar palladam');

  let city = screen.getByPlaceholderText('San Francisco');
  expect(city).toBeInTheDocument();
  fireEvent.change(city, { target: { value: 'Tiruppur' } });
  expect(city).toHaveValue('Tiruppur');

  let country = screen.getByTestId("select");
  fireEvent.change(country, { target: { value: 'india' } });
  expect(screen.getByText('India')).toBeInTheDocument();

  let submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  let user = store.getState().user.userList.length;
  expect(user).toBeGreaterThan(initialLength);
});

test('UpdateUser page', () => {
  const userId = '1';
  renderUpdateUser(userId);
  let updateUserData = getAUser(userId);

  const updateUserText = screen.getByTestId('header');
  expect(updateUserText).toHaveTextContent('Update User');

  let firstName = screen.getByDisplayValue(updateUserData!.firstName!);
  expect(firstName).toBeInTheDocument();
  fireEvent.change(firstName, { target: { value: 'Prince' } });
  expect(firstName).toHaveValue('Prince');

  let lastName = screen.getByDisplayValue(updateUserData!.lastName!);

  expect(lastName).toBeInTheDocument();
  fireEvent.change(lastName, { target: { value: 'Deo' } });
  expect(lastName).toHaveValue('Deo');

  let submitButton = screen.getByText('Submit');
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  updateUserData = getAUser(userId);
  expect(updateUserData.firstName).toBe('Prince');
  expect(updateUserData.lastName).toBe('Deo');
});

test('Render UserInfo', () => {
  const user = getAUser('1');
  const { asFragment } = renderUserInfo(user);
  expect(asFragment()).toMatchSnapshot();
});