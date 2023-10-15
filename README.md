# contact
a rest api for contact management

##  Getting setup

To get started, clone this repository and install the dependencies:

`git clone https://github.com/muathendirangu/contact.git`
`cd contact`
`npm install`

Once the dependencies are installed, you can start the API:

`npm run dev`
The API will be running on port 9000 by default. You can access the API in your browser using the following URL:

http://localhost:9000

# Testing
To run test run the command
`npm run test`

# Endpoints

The API has the following endpoints:

`/contacts` - Get all contacts
`/contacts/:id` - Get a contact by ID
`/contacts` - Create a new contact
`/contacts/:id` - Update a contact
`/contacts/:id` - Delete a contact

## Usage

To use the API, you can send HTTP requests to the endpoints.
1. To get all contacts, you would send a GET request to the /contacts endpoint.

2. To create a new contact, you would send a POST request to the /contacts endpoint with the contact's information in the request body.

3. To update a contact, you would send a PUT request to the /contacts/:id endpoint with the contact's updated information in the request body.

4. To delete a contact, you would send a DELETE request to the /contacts/:id endpoint.

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
1. Automate API documentation
2. Modularize the storage workflow to allow easier addition of data store i.e if we need to to introduce new data store
e.g redis for caching purposes



