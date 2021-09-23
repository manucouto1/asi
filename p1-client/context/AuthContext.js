import {createContext} from 'react';

const uselessLambda = () => null;
const AuthContext = createContext({
    auth: undefined,
    login: uselessLambda,
    logout: uselessLambda,
    setReloadUser: uselessLambda,
});

export default AuthContext;