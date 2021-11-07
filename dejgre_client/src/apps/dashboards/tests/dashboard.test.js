import '@testing-library/jest-dom/extend-expect';
import { render, queryByAttribute, fireEvent, act } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux';
import i18n from "../../../i18n";
import Dashboard from "../core/dashboard";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
  
const getById = queryByAttribute.bind(null, "id");

describe("Dashboard view tests", ()=> {
  const mockedLoginRefresh = jest.fn(() => null);
  const axiosMock = new MockAdapter(axios);
  let store;
  beforeEach(() => {
    store = mockStore({ boardGames: {boardGames: [], genre: [], lendInfo: {}}, requests: {} });
  });

  axiosMock.onGet("/ping/").reply(200, {success: "true"});
  axiosMock.onGet("/magazine/boardgame/").reply(200, []);

  test("Dashboard should render with navbar", () => {
    const dom = render(<I18nextProvider i18n={i18n}><Dashboard loginRefresh={mockedLoginRefresh}/></I18nextProvider>);
    const link = getById(dom.container, "boardGameLink");
    expect(link).toBeInTheDocument();
  });

  test("Dashboard navbar links should change url", () => {
    const history = createMemoryHistory();
    const dom = render(
      <Provider store={store}>
        <Router history={history}>
          <I18nextProvider i18n={i18n}>
            <Dashboard loginRefresh={mockedLoginRefresh}/>
          </I18nextProvider>
        </Router>
      </Provider>
    );
    const link = getById(dom.container, "boardGameLink");
    expect(link).toBeInTheDocument();
    act(()=> {
      fireEvent.click(link);
      expect(history.location.pathname).toBe("/boardgames");
    });

  });
});
