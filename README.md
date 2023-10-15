# contact
A rest api for contact management

##  Running locally setup

To get started, clone this repository and install the dependencies:

1. first clone the repo using `git clone https://github.com/muathendirangu/contact.git`.
2. access directory `cd contact`.
3. Install dependencies `npm install`

# Note:
SQLITE database was utilized(contacts.db is part of files on this repository)
Once the dependencies are installed, you can start the API:

`npm run dev`
The API will be running on port 9000 by default. You can access the API in your browser using the following URL:

http://localhost:9000

# Testing
To run test run the command
`npm run test`

# Endpoints

The API has the following endpoints:

1. `/contacts` - Get all contacts.
2. `/contacts/:id` - Get a contact by ID.
3. `/contacts` - Create a new contact.
4. `/contacts/:id` - Update a contact.
5. `/contacts/:id` - Delete a contact.

# Example

The following example shows how to use the API to create a new contact:

> **Request

```
curl --location 'http://localhost:9000/api/contacts' \
--data '{
    "name":"Allison Baker",
    "phoneNumber" : "0719567380"
}'
```

> **Response

```
{
    "id": "553e9c4c-df61-434e-9db4-0466b8fb08d4",
    "name": "bd2453ecb855b77b9194019844305cd9",
    "phoneNumber": "b871bdb844f95e1b6efec6edd3694782"
}
```

- This will create a new contact.

The following example shows how to get all contacts:

> **Request
```
curl --location 'http://localhost:9000/api/contacts'
```

> **Response

```
[
    {
        "id": "11cecc98-bee9-42f4-ac28-859c5bc625f7",
        "name": "John Wafula",
        "phoneNumber": "0719567380"
    },
    {
        "id": "aff4006b-0e5b-4d51-80f4-2460a42a2fae",
        "name": "John Wafula",
        "phoneNumber": "0719567380"
    }
]
```

- This will return a list of all contacts in the db.

## complete features
1. - Create a new contact
2. Get all contacts
3. Get a specific contact
4. Update a contact
5. Delete a contact
6. Implemented an encrpytion module that encrypts dat before storage/ decrypts data during retrieval

## Addons
1. Added some live tests using chai http package
2. Added logging using winston library (currently it just logs to console, can be configured to write to other destinations).
3. Generated API documentation a postman and and openAPI documentation(currently it is done manually can be automated using npm packages to improve dev workflow)

## Improvements
1. Setup CI/CD pipelines to automate API documentation generation, also deployment of the API to a hosting provider
2. Modularize the storage workflow to allow easier addition of data store i.e if we need to to introduce new data store
e.g redis for caching purposes.
4. Add support for database migrations.
3. Improve the testing workflow to make it easier to mock a test database instead of the actual database, add more unit tests to test pure functions i.e validation utils.



