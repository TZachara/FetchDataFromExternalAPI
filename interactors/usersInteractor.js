const axios = require('axios');
const interactorConfig = require('./interactorConfig');

const getUsers = async () => {
    const users = await axios.get(interactorConfig.BASE_URL + interactorConfig.USERS_ROUTE);
    return users;
};

const getUserByIdIteractor = async (id) => {
    const user = await axios.get(interactorConfig.BASE_URL + interactorConfig.USERS_ROUTE + `/${id}`);
    return user;
};

const createUser = async (newUser) => {
    console.log(newUser);
    let config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    const createdUser = await axios.post(interactorConfig.BASE_URL + interactorConfig.USERS_ROUTE, newUser, config);
    return createdUser;
};

const updateUser = async (id, updatedUserFields) => {
    let config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    const updatedUser = await axios.put(
        interactorConfig.BASE_URL + interactorConfig.USERS_ROUTE + `/${id}`,
        updatedUserFields,
        config
    );
    return updatedUser;
};

const deleteUser = async (id) => {
    const response = await axios.delete(interactorConfig.BASE_URL + interactorConfig.USERS_ROUTE + `/${id}`);
    response.data = { message: 'User Deleted' };
    return response;
};

module.exports = { getUsers, getUserByIdIteractor, createUser, updateUser, deleteUser };
