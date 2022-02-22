# graphql-apollo 

https://github.com/didomi/challenges/tree/master/frontend
https://github.com/didomi/challenges/tree/master/backend

#init client
````
npx create-react-app client
cd client
npm install @apollo/client graphql
````
````
npm start
````

# init server
````
cd server
npm init -y
npm i express
npm i express-graphql
npm i graphql
npm i cors
npm i nodemon
````
````
npm run dev
````

# GraphQl
http://locahost:5001/graphql
````
query {
  getAllUsers {
    id, username, age
  }
}
````
````
mutation {
  createUser(input:{
    username: "John", age: 22
  }) {
    id, username, age
  }
}
````
````
mutation {
  createUser( input: {
    username: "Baba",
    age: 44,
    posts: [
      { id: 1, title: "post title", content: "post content" }
    ]
  }) {
    id, username
  }
}
````
````
query {
  getAllUsers {username, age, posts {
    id
  }}
}
````