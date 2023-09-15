
# Backend-SocialMedia-API
An Simple ,backend social media API where you can Signup, Login and post your Blogs .
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MongoDB_Database_Connection_String'

`PORT`


## API Reference
#### USER Routes
#### GET all users

```http
  GET http://localhost:PORT/api/user/getall
```


#### To SignUp

```http
  POST http://localhost:PORT/api/user/signup
```

#### To Login

```http
  POST http://localhost:PORT/api/user/login
```



#### Blog Routes
#### To GET a Blog

```http
  GET http://localhost:PORT/api/blogs/get/:id
```
#### To GET all blogs

```http
  GET http://localhost:PORT/api/blogs/getall
```
#### To GET an existing User's blogs

```http
  GET http://localhost:PORT/api/blogs/user/:id
```
#### To POST a blog

```http
  POST http://localhost:PORT/api/blogs/post
```
#### To UPDATE a blog

```http
  PUT http://localhost:PORT/api/blogs/update/:id
```
#### To DELETE a blog

```http
  DELETE http://localhost:PORT/api/blogs/delete/:id
```


