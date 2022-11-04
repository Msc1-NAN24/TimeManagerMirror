# ROUTES

## USER ROUTES

| Method | Route                                         | Description                                           |
| ------ | --------------------------------------------- | ----------------------------------------------------- |
| GET    | /workingtimes/user/:user_id                   | Get all workingtimes for a user                       |
| GET    | /workingtimes/user/:user_id?start=XXX&end=YYY | Get all workingtimes for a user between start and end |
| GET    | /workingtimes/user/:user_id/:id               | Get a specific workingtime for a user                 |
| POST   | /workingtimes/user/:user_id                   | Create a new workingtime for a user                   |

## MANAGER ROUTES

| Method | Route                   | Description                   |
| ------ | ----------------------- | ----------------------------- |
| GET    | /workingtimes/entry/:id | Get a specific workingtime    |
| PUT    | /workingtimes/entry/:id | Update a specific workingtime |
| DELETE | /workingtimes/entry/:id | Delete a specific workingtime |
