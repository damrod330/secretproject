import axios from '../../axios';
import { LOGOUT_SUCCESS, SESSION_EXPIRED, BAD_CREDENTIALS } from '../const/messages';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (message) => {
    localStorage.removeItem('token');
    if (message === SESSION_EXPIRED) {
        return {
            type: actionTypes.AUTH_LOGOUT,
            authorizationError: message,
            logoutMessage: null
        };
    } else if (message === LOGOUT_SUCCESS) {
        return {
            type: actionTypes.AUTH_LOGOUT,
            logoutMessage: message,
            authorizationError: null
        };
    } else {
        return {
            type: actionTypes.AUTH_LOGOUT
        };
    }
};

export const auth = (login, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            login: login,
            password: password
        };
        axios.post("/auth/login", authData)
            .then(response => {
                // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn);
                localStorage.setItem('token', response.data.accessToken);
                // localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('tokenType', response.data.tokenType);
                dispatch(authSuccess(response.data.accessToken));
                // dispatch(checkAuthTimeout(response.data.expiresIn));

            })
            .catch(err => {
                if(err.message.includes("401")){
                    dispatch(authFail(BAD_CREDENTIALS));
                } else {
                    dispatch(authFail(err.message));
                }
            });
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
            //     dispatch(authSuccess(token));
            // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
            // }  
        }
    };
};