# User inteface

- [User inteface](#user-inteface)
  - [Pages](#pages)
    - [Common](#common)
      - [Home](#home)
      - [Login](#login)
      - [Register](#register)
    - [Employee](#employee)
      - [Dashboard](#dashboard)
      - [Profile](#profile)
        - [Edit Profile](#edit-profile)
      - [Working Times](#working-times)
        - [Clock](#clock)
        - [View Working Times](#view-working-times)
          - [View all working times](#view-all-working-times)
          - [View single working time](#view-single-working-time)
        - [Add Working Time](#add-working-time)
        - [Edit Working Times](#edit-working-times)
        - [Delete Working Time](#delete-working-time)
    - [Manager](#manager)
      - [Create Team](#create-team)
      - [Edit Team](#edit-team)
        - [Edit Team Information](#edit-team-information)
        - [Edit Team Members](#edit-team-members)
          - [Add Team Member](#add-team-member)
          - [Remove Team Member](#remove-team-member)
        - [View Team Members](#view-team-members)
          - [View Member Profile](#view-member-profile)
        - [View Team Working Times](#view-team-working-times)
        - [View Team Working Times Statistics](#view-team-working-times-statistics)
      - [Delete Team](#delete-team)
    - [General Manager](#general-manager)
      - [Employees](#employees)
        - [Create Employee](#create-employee)
        - [Edit Employee](#edit-employee)
          - [Promote Employee](#promote-employee)
          - [Demote Employee](#demote-employee)
        - [View Employee Profile](#view-employee-profile)
        - [View Employee Working Times](#view-employee-working-times)
        - [Delete Employee](#delete-employee)

## Pages

### Common

#### Home

- **URL**: `/`
- **Method**: `GET`
- **Description**: Home page
- **Access**: Public

#### Login

- **URL**: `/login`
- **Method**: `POST`
- **Description**: Login page
- **Access**: Public

#### Register

- **URL**: `/register`
- **Method**: `POST`
- **Description**: Register page
- **Access**: Public

### Employee

#### Dashboard

- **URL**: `/dashboard`
- **Method**: `GET`
- **Description**: Employee dashboard
- **Access**: Employee

#### Profile

- **URL**: `/profile`
- **Method**: `GET`
- **Description**: Employee profile
- **Access**: Employee

##### Edit Profile

- **URL**: `/profile`
- **Method**: `PATCH`
- **Description**: Edit employee profile
- **Access**: Employee

#### Working Times

##### Clock

- **URL**: `/clock`
- **Method**: `POST`
- **Description**: Clock-in or clock-out
- **Access**: Employee

##### View Working Times

###### View all working times

- **URL**: `/working-times`
- **Method**: `GET`
- **Parameters**:
  - `start`: `YYYY-MM-DD` (optional)
  - `end`: `YYYY-MM-DD` (optional)
- **Description**: View all working times
- **Access**: Employee

###### View single working time

- **URL**: `/working-times/:id`
- **Method**: `GET`
- **Description**: View single working time
- **Access**: Employee

##### Add Working Time

- **URL**: `/working-times`
- **Method**: `POST`
- **Description**: Add working time
- **Access**: Employee

##### Edit Working Times

- **URL**: `/working-times/:id`
- **Method**: `PATCH`
- **Description**: Edit working time
- **Access**: Employee

##### Delete Working Time

- **URL**: `/working-times/:id`
- **Method**: `DELETE`
- **Description**: Delete working time
- **Access**: Employee

### Manager

#### Create Team

- **URL**: `/teams`
- **Method**: `POST`
- **Description**: Create team
- **Access**: Manager

#### Edit Team

##### Edit Team Information

- **URL**: `/teams/:id`
- **Method**: `PATCH`
- **Description**: Edit team information
- **Access**: Manager

##### Edit Team Members

###### Add Team Member

- **URL**: `/teams/:id/members`
- **Method**: `POST`
- **Description**: Add team member
- **Access**: Manager

###### Remove Team Member

- **URL**: `/teams/:id/members/:id`
- **Method**: `DELETE`
- **Description**: Remove team member
- **Access**: Manager

##### View Team Members

###### View Member Profile

- **URL**: `/teams/:id/members/:id`
- **Method**: `GET`
- **Description**: View member profile
- **Access**: Manager

##### View Team Working Times

- **URL**: `/teams/:id/working-times`
- **Method**: `GET`
- **Description**: View team working times
- **Access**: Manager

##### View Team Working Times Statistics

- **URL**: `/teams/:id/working-times/statistics`
- **Method**: `GET`
- **Description**: View team working times statistics
- **Access**: Manager

#### Delete Team

- **URL**: `/teams/:id`
- **Method**: `DELETE`
- **Description**: Delete team
- **Access**: Manager

### General Manager

#### Employees

##### Create Employee

- **URL**: `/employees`
- **Method**: `POST`
- **Description**: Create employee
- **Access**: General Manager

##### Edit Employee

###### Promote Employee

- **URL**: `/employees/:id/promote`
- **Method**: `POST`
- **Description**: Promote employee
- **Access**: General Manager

###### Demote Employee

- **URL**: `/employees/:id/demote`
- **Method**: `POST`
- **Description**: Demote employee
- **Access**: General Manager

##### View Employee Profile

- **URL**: `/employees/:id`
- **Method**: `GET`
- **Description**: View employee profile
- **Access**: General Manager

##### View Employee Working Times

- **URL**: `/employees/:id/working-times`
- **Method**: `GET`
- **Description**: View employee working times
- **Access**: General Manager

##### Delete Employee

- **URL**: `/employees/:id`
- **Method**: `DELETE`
- **Description**: Delete employee
- **Access**: General Manager
