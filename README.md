# Quiz API

This API helps create, list, view and delete a quiz

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### **Prerequisites**

What things you need to install the software and how to install them

> node

```
npm install
```

### **Installing**

A step by step series of examples that tell you how to get a development env running

Setting up your config File

```
# Change the '.env.example' file to 'config.env'

# Note we depend on NODE_ENV being set to dictate which of the env variables below get loaded at runtime.

# NODE_ENV should be set to "development" for development and "production" when in production

# <mlab_user> = mongoDB username
# <mlab_password> = mongoDB password
# <mlab_connection_url> = connection URL


# <database> = Local MongoDB database
```

example

```
NODE_ENV = "development"
PORT = 3000

MONGODB_URI= mongodb+srv://Myname:mypass@mymongodburl.com

# This is standard running mongodb locally
MONGODB_URI_LOCAL=mongodb://localhost:27017/mydatabase
```

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Node](https://nodejs.org/) - JavaScript Runtime
- [Express.js](https://expressjs.com/) - Node.js Application framework
- [Mongdb](https://www.mongodb.com/) - Database
- [Mongoose.js](https://mongoosejs.com/docs/guide.html) - ODM library for mongodb

## Versioning

We use [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) for versioning. For the versions available, see the [tags on this repository](https://github.com/dras51/QuizApi/tags).

## Authors

- **David Olabode** - _Initial work_ - [Dras51](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/dras51/QuizApi/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
