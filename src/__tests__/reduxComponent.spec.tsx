import {
    render,
    screen,
    fireEvent,
    RenderResult,
  } from '@testing-library/react';
  import '@testing-library/jest-dom';
  import { Provider } from 'react-redux';
  import UserInfo from '../components/UserInfo';
  import AddUser from '../pages/AddUser';
  import { Route, MemoryRouter } from 'react-router-dom';
  
  import { store } from '../redux/store';
  import { UserState } from '../types';
  
  /*const renderUser = (user: UserState): RenderResult =>
    render(
      <Provider store={store}>
        <UserInfo title={user.title} author={user.author} id={user.id} />
      </Provider>
    );
    */
  
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
  
  test('AddUser page', () => {
    renderAddUser();
    const initialLength = store.getState().user.userList.length;
  
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
  
    let submitButton = screen.getByText('Submit');
    fireEvent.click(
      submitButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  
    let book = store.getState().user.userList.length;
    expect(book).toBeGreaterThan(initialLength);
  });
  
  test('UpdateUser page', () => {
    const userId = '1';
    renderUpdateUser(userId);
    let updateUserData = getAUser(userId);
  
    const updateBookText = screen.getByTestId('header');
    expect(updateBookText).toHaveTextContent('Update User');
  
    let titleInput = screen.getByDisplayValue(updateUserData!.firstName!); 
    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: 'Test Title' } }); 
    expect(titleInput).toHaveValue('Test Title');
  
    let authorInput = screen.getByDisplayValue(updateUserData!.lastName!); 
  
    expect(authorInput).toBeInTheDocument();
    fireEvent.change(authorInput, { target: { value: 'Test Author' } }); 
    expect(authorInput).toHaveValue('Test Author');
  
    let submitButton = screen.getByText('Submit');
    fireEvent.click(
      submitButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
  
    updateUserData = getAUser(userId);
    expect(updateUserData.firstName).toBe('Test Title'); 
    expect(updateUserData.lastName).toBe('Test Author'); 
  });