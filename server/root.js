const users = [
    { id: 1, username: 'TestUser', age: 33 }
];

const root = {
    getAllUsers: () =>
    {
        return users;
    },
    getUser: ({id}) =>
    {
        return users.find( (user) => user.id === id );
    },
    createUser: ({input}) =>
    {
        const id = Date.now();
        const user =
        {
            id, ...input
        };
        users.push( user );
        return user;
    },
    testMutation: () =>
    {
        return 1;
    }
}

module.exports = root;