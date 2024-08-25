## How To Run Project

1. Make sure PosgreSQL database have already installed
2. create .env file, and provide the required variables based on .example.env in this project
3. Create a database with the same name as the value of variable DB_NAME in .env
4. Use command 'npm install' in the project root to install dependencies
5. Use command 'npm run migration:run' to run the migration and seeding to the created database
6. Use command 'npm run start:dev' to start the server on 'http://localhost:3000'