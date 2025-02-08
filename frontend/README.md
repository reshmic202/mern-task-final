# **MERN Stack Task Distribution System**

## **Project Overview**
This is a MERN (MongoDB, Express.js, React.js, Node.js) stack-based project that enables an **Admin** to:
- Login securely using JWT authentication.
- Manage **agents** (add, view).
- Upload a **CSV/XLSX file** and distribute tasks among 5 agents.
- View distributed lists.

---

## **Project Structure**

```
mern-task-distribution
│── backend/              # Express.js Server (Backend)
│   │── models/           # Mongoose Models
│   │── routes/           # API Routes
│   │── config/           # Database and Environment Configuration
│   │── middleware/       # Authentication Middleware
│   │── server.js         # Main Entry Point for Backend
│
│── frontend/             # React.js (Frontend)
│   │── src/
│   │   │── pages/        # Frontend Pages (Login, Dashboard, Agents, Upload)
│   │   │── components/   # Reusable UI Components
│   │   │── api.js        # Axios API Calls
│   │   │── App.js        # Main App Routing
│   │── package.json      # Frontend Dependencies
│
│── .env                  # Environment Variables
│── README.md             # Project Documentation
│── package.json          # Backend Dependencies
│── .gitignore            # Ignored Files
```

---

## **Setup Instructions**

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo.git
cd mern-task-distribution
```

### **2. Backend Setup**
```sh
cd backend
npm install
```

#### **Create a `.env` file in the `backend` folder:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=your_jwt_secret
```

#### **Run the Backend**
```sh
npm start
```
Backend runs at: **`http://localhost:5000`**

---

### **3. Frontend Setup**
```sh
cd frontend
npm install
```

#### **Run the Frontend**
```sh
npm start
```
Frontend runs at: **`http://localhost:3000`**

---

## **Features**

### **1. Admin Login**
- JWT authentication-based login.
- Protected dashboard access.

### **2. Manage Agents**
- Add new agents.
- View all registered agents.

### **3. Upload CSV & Distribute Tasks**
- Uploads a **CSV/XLSX** file.
- Parses and validates data.
- Distributes tasks evenly among 5 agents.
- Saves assigned tasks in the database.

### **4. View Distributed Lists**
- Fetches assigned tasks for each agent.

---

## **API Endpoints**

### **Auth**
| Method | Route         | Description          |
|--------|--------------|----------------------|
| POST   | `/api/auth/login` | Admin Login |

### **Agents**
| Method | Route         | Description         |
|--------|--------------|---------------------|
| GET    | `/api/agents` | Get all agents     |
| POST   | `/api/agents/add-agent` | Add a new agent |

### **Task Distribution**
| Method | Route           | Description            |
|--------|----------------|------------------------|
| POST   | `/api/lists/upload-csv` | Upload CSV & distribute tasks |

---

## **Sample CSV File Format**
| FirstName | Phone        | Notes  |
|-----------|-------------|--------|
| John      | 1234567890  | Task 1 |
| Alice     | 9876543210  | Task 2 |

---

## **Tech Stack**
- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT

---

## **Future Enhancements**
- Role-based access control
- Email notifications to agents


https://www.loom.com/share/4b8c6ae848af49febc66a5d5ee3e56db?sid=2cd42e67-300e-4bea-b40e-d47438f76644

