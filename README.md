## description
api with node and express 

uses Winston for logs and Swagger for documentation

## test it out
download and use `yarn start` to run :) 

go to `localhost:3000/doc` and try it out on your browser

## endpoints and graphql
Oops, this project serves endpoints and the same functions through graphql.

so you can call
`localhost:3000/account`
to get all accounts

OR

call
`localhost:3000/graphql` 
and pass
```
{
  getAccounts {
    id
    name
    balance
  }
```
to get all accounts

Sorry, I was studying both ways 😅
