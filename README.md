# fullstackopen-part3

App hosted at https://openphonebook.herokuapp.com/

## Notes

For part 3.20, edited the error function to set the error like this: setAlertMessage(error.response.data.error);

Also make the baseUrl "dynamic" base on env.:

const baseUrl = process.env.NODE_ENV === 'production' ? '/api/persons' : 'http://localhost:3001/api/persons';
