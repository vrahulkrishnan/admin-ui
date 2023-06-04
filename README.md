## ADMIN UI

Frontend codebase for admin

## Requirements

- Node `v16.17.0`
- NPM `v8.15.0`

### Setup Instructions:

`clone the repo`

`cd admin-ui`

`npm install --legacy-peer-deps`

`npm run reset`

### Run Instructions:

Create `.env` file in root folder. (Required keys can be found in `.env.sample` file)

`npm start`

Then go to 

`dev.admin.com:3000`

For using API's, follow the given instructions.

1.  `sudo nano /etc/hosts`
2.  Add `${ip} api.admin.com`, where ip belongs to API of hosted machine.
3.  Save and Exit.

### Test

`npm run test`

### Lint

`npm run lint`

### Issue Tracker

### Coding styles

- Keep it simple and readable with type definitions.
- Write unit tests as much as possible.
- Follow the rule of linting. You can't do committing with messy codes.
