import '@testing-library/jest-dom/extend-expect';
import { render, screen, queryByAttribute, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next'
import i18n from "../../../i18n";
import LoginView from '../loginView';
import axios from "axios";
jest.mock("axios");

const getById = queryByAttribute.bind(null, "id");

describe("Login View tests", ()=> {
  const mockedLoginRefresh = jest.fn(() => null);

  test("Render login view", () => {
    const dom = render(<I18nextProvider i18n={i18n}><LoginView /></I18nextProvider>);
    const loginInput = getById(dom.container, "user-field");
    const passwordInput = getById(dom.container, "password-field");
    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("Login failed should move to other view", () => {
    axios.mockImplementation(() => Promise.reject({status: 400}));
    const dom = render(<I18nextProvider i18n={i18n}><LoginView loginRefresh={mockedLoginRefresh}/></I18nextProvider>);
    const loginInput = getById(dom.container, "user-field");
    const passwordInput = getById(dom.container, "password-field");
    const submitBtn = getById(dom.container, "login-submit");
    fireEvent.change(loginInput, {target: {value: "user"}});
    fireEvent.change(passwordInput, {target: {value: "asdf"}});
    submitBtn.click();
    expect(loginInput).toHaveValue("user");
    expect(passwordInput).toHaveValue("asdf");
    expect(mockedLoginRefresh.mock.calls.length).toBe(0);
  });

  test("Login success should call loginRefresh", () => {
    axios.mockImplementation(() => Promise.resolve({data: {token: "asdf"}}));
    const dom = render(<I18nextProvider i18n={i18n}><LoginView loginRefresh={mockedLoginRefresh}/></I18nextProvider>);
    const loginInput = getById(dom.container, "user-field");
    const passwordInput = getById(dom.container, "password-field");
    const submitBtn = getById(dom.container, "login-submit");
    fireEvent.change(loginInput, {target: {value: "user"}});
    fireEvent.change(passwordInput, {target: {value: "asdf"}});
    expect(loginInput).toHaveValue("user");
    expect(passwordInput).toHaveValue("asdf");
    submitBtn.click();
    setTimeout(() => expect(mockedLoginRefresh.mock.calls.length).toBe(1), 0);
  });
});
