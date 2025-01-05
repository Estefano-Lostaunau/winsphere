import users from '../../../data/users.json';

const LOCAL_STORAGE_KEY = 'loggedInUserId';

export const login = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEY, user.id);
        return user;
    } else {
        throw new Error('Invalid email or password');
    }
};

export const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const getLoggedInUserId = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
};