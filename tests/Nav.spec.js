import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import UserProvider from "../SaaS-Product-App/saas-product-app/context/user";
configure({ adapter: new Adapter() });
import { createStore, applyMiddleware } from 'redux';
import { mount } from 'enzyme';
const createStoreWithMiddleware = applyMiddleware()(createStore);
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});
import Nav from "../SaaS-Product-App/saas-product-app/components/Nav";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
const queryClient = new QueryClient();
import { describe, expect, it, jest } from '@jest/globals';
import axios from "axios";

jest.mock('axios', () => ({
    post: () => Promise.resolve({ data: 'data' }),
}));

describe('Testing Nav component', () => {

    let component;
    beforeEach(() => {
    

        component = mount(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <Nav />
                </UserProvider>
            </QueryClientProvider>
        </Provider>);
    });

    test("header links section is present", () => {
        expect(component.find('.header-links').exists()).toEqual(true);
    });

    test("App title is present", () => {
        expect(component.text().includes('Ecommerce Web App 1432')).toBe(true);
    });

    test("Sign In link is present", () => {
        expect(component.text().includes('Sign In')).toBe(true);
    });

});

