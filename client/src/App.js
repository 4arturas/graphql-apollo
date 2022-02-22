import React, {useEffect, useState} from 'react';
import './App.css'
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

const App = () => {
    const [newUser] = useMutation(CREATE_USER)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)
    const [userId, setUserId] = useState(0);
    const {data, loading, error, refetch: refetchAllUsers} = useQuery(GET_ALL_USERS)
    const {data:oneUser, loading: loadingOneUser, error: oneUserError, refetch: refetchOneUser} = useQuery(GET_ONE_USER, {
        variables: {
            id: userId
        }
    })

    console.log(oneUser)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username: username, age: age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }
    const getAll = e => {
        e.preventDefault()
        refetchAllUsers()
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form>
                name: <input value={username} onChange={e => setUsername(e.target.value)} type="text"/>
                age: <input value={age} onChange={e => setAge( parseInt( e.target.value ) ) } type="number"/>
                <div className="btns">
                    <button onClick={(e) => addUser(e)}>Create</button>
                    <button onClick={(e) => getAll(e)}>Fetch</button>
                </div>
            </form>
            <div>
                {users.map(user =>
                    <div className="user">{user.id}. {user.username} {user.age}</div>
                )}
            </div>
            name: <input value="1" onChange={e => setUserId( parseInt( e.target.value ) )} type="number"/><br/>
            <button onClick={ (e) => {
                e.preventDefault(); refetchOneUser();
            } }>
                Get User By Id
            </button>
            { oneUser && <div>{oneUser.id} {oneUser.username} {oneUser.age}</div> }

        </div>
    );
};

export default App;