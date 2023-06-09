### Project Name
The project is a NextJS (with TypeScript) app that uses Langchain, OpenAI, and Pinecone to help users read their documents.

### Features
- Authentication: Support for authentication via Firebase.
- S3 Storage: Support for S3 storage for uploaded files. Currently, files are uploaded to the public folder. 
- Multiple PDF per User: Support for multiple PDF files per user.
- Dynamic character selection - it would be nice to change characters depending on the type of document the user is reading.

### Upcoming Features
- Authentication: Support for authentication via Firebase.
- S3 Storage: Support for S3 storage for uploaded files.
- Multiple PDF per User: Support for multiple PDF files per user.

#### Getting Started
To run the project locally, you'll need to create a `.env.local` file and populate it with the necessary configuration keys. 
You can use the `.sample.env.local` file as a template.

```cp .sample.env.local .env.local```

Then, open the `.env.local` file and fill in the required configuration keys.

#### Installation
To install the project dependencies, run the following commands:

`npm install`

### Running the App
To run the app, run the following command:

`npm run dev`

This will start the app on `http://localhost:3000/`.

### Contributing
Contributions are welcome! Please submit a pull request if you have any improvements or bug fixes to suggest.
