[![N|Solid](https://www.gavdilabs.com/wp-content/uploads/gavdilogo-1.png)](https://www.gavdilabs.com/wp-content/uploads/gavdilogo-1.png)
# Project Amazonite - Easy Permissions
---

#### Easyfying Authorizations in Successfactors

Getting an overview on Successfactors Permissions, Roles and Groups can be a cumbersome and sometime frustrating task. 
Scenarios like, "`User1` has access but `User2` does not. Why?" is not always easily answered.

Project Amazonite is born to try and rememdy some of lack in overview given by std. SuccessFactors, when it comes to Auth. Initial version will try to remedy:
- List Roles for a User.
- Compare Roles of 2 users - Highlighting any differences

## Pre-Requisites
This solution is tightly bound to Success Factors and their Odata API so certain pre-requisited are needed from the SF side to run!

Generally it will be good to have an understanding of how SAP BTP / CAP works to take full advantage of this solution and will help you to implement all the things not covered in this `readme` ie. productive Auth setup, deployment to BTP etc.

Pre-Requisites for solution come in 2 favours - deployed and local. (The 2 can also be combined - how2 is not in scope of this Readme). The out of the box solution, supports, and can be verified easliy using a technical user and basic-auth on the destination. More advanced auth mechanisms are off course available for productive scenarios (`oAuth` etc).
#### Pre-Requisites - Deployed

- A successfactors system with api enabled User
- SAP BTP System - a Trial should work just fine for validation. ´
- BTP Destination, default called "SF" that points to SF.
- Mapping of user to "GLEPUSER" role after successfull deployment (xs-security.json 2 change role name)

#### Pre-Requisites - Local
- A successfactors system with api enabled User
- /service/package.json entry like below for a hardcoded local destination. `(DO NOT COMMIT TO GIT!)`
```json
"[development]": {
                    "credentials": {
                        "requestTimeout": 30000,
                        "url": <URL 4 SF SYSTEM ie https://api12preview.sapsf.eu/odata/v2/>,
                        "authentication": "BasicAuthentication",
                        "username": <Username in SF - remember the @company suffix>,
                        "password": <Password in SF>
                    }
                },
```
- Add user entry in `cdsrc.json` and link to "GLEPUSER" default role file under "[development]" .. fx
```json
"[development]": {
        "auth": {
            "passport": {
                "strategy": "mock",
                "users": {
                    "user": {
                        "password": "<PASSWORD>",
                        "ID": "<USERNAME>"",
                        "roles": [
                            "GLEPUSER"
                        ]
                    }
                }
            }
        }
    },
```

#### Running/Installing Application
NB. Make sure u are in the cloned application root directory.
##### Install & Run Service Layer CAP Application
```sh
$ cd service
$ npm i
$ npm run dev
```
##### Install & Run UI5 Frontend Application
```sh
$ cd ../app
$ npm i
$ npm start
```
##### Additional Info
- AppRouter folder is initially prepared under /router if you want o make use of that.


## License
Apache License 2.0 -> 
https://www.apache.org/licenses/LICENSE-2.0
