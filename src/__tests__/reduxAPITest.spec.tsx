
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils';
import UserList from '../pages/UserList'
import '@testing-library/jest-dom';


// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos/1', (req, res, ctx) => {
    return res(ctx.json({
      "userId": 2,
      "id": 22,
      "title": "delectus aut autemm",
      "completed": true
    }), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches & receives a user after clicking the fetch user button', async () => {
  renderWithProviders(<UserList />)

  // should show no user initially, and not be fetching a user
  //expect(screen.getByText(/no user/i)).toBeInTheDocument()
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

  // after clicking the 'Fetch user' button, it should now show that it is fetching the user
  fireEvent.click(screen.getByTestId('button'))
  //expect(screen.getByText(/no user/i)).toBeInTheDocument()

  // after some time, the user should be received
  expect(await screen.findByText(/delectus aut autem/i)).toBeInTheDocument()
  //expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
})
/*
// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get('https://randomuser.me/api/', (req, res, ctx) => {
    console.log('test', req,res,ctx);
    return res(ctx.json({first:'Noble',last : 'raj','title':'demo'}), ctx.delay(150))
  })
]

const renderAddUser = (): RenderResult =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    </Provider>
  );

const server = setupServer(...handlers)

// Enable API mocking before tests.
//beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
//afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
//afterAll(() => server.close())

test('fetches & receives a user after clicking the fetch user button', async () => {
    renderAddUser();

  // should show no user initially, and not be fetching a user
  //expect(screen.getByText(/no user/i)).toBeInTheDocument()
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

  // after clicking the 'Fetch user' button, it should now show that it is fetching the user
  const submitButton = screen.getByTestId('button');
  fireEvent.click(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );
  //expect(screen.getByText(/no user/i)).toBeInTheDocument()

  // after some time, the user should be received
  expect(await screen.findByText(/delectus aut autem/i)).toBeInTheDocument()
  //expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
})
*/
