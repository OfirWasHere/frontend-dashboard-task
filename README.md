# Frontend Dashboard Task

## Prerequisites
- Node.js (includes npm)
- Visual Studio Code

### 1. Clone the Repository
- Use Git: `git clone [repository-url]`
- Or download the ZIP file and extract it

### 2. Add the .env file
- drag and drop the .env file into the `frontend-dashboard-task` folder

### 3. Open Project
1. Open Visual Studio Code
2. Go to `File > Open Folder`
3. Select the `frontend-dashboard-task` folder

### 3. Install Dependencies
Open the integrated terminal (`Terminal > New Terminal`) and run:
```bash
npm install
```

### 4. Run the Frontend
Ensure you're in the root folder (`frontend-dashboard-task`) and run:
```bash
npm start
```
The application will open automatically in your default browser at `http://localhost:3000`


### 5. Run the Backend
1. Open a new terminal tab using the `+` icon in the terminal panel

2. Navigate to the functions folder:
```bash
cd functions
```

3.  Install Dependencies:
```bash
npm install
```

4. Start the backend server:
```bash
npm run serve
```

### debugging errors:
if you are getting this error:
FirebaseError: Installations: Missing App configuration value: "projectId" (installations/missing-app-config-values).

please make sure you correctly put .env file in the root of the project folder (`frontend-dashboard-task`)