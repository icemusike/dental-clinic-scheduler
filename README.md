# Dental Clinic Scheduler

A web application for managing appointments, patients, and dentists in a dental clinic.

## Features

*   **Dashboard:** Overview of clinic activities.
*   **Calendar:** View and manage appointments visually.
*   **Patient Management:** Add, view, and manage patient records.
*   **Dentist Management:** Add, view, and manage dentist profiles (Admin/Receptionist).
*   **Appointment Scheduling:** Create, update, and manage appointments.
*   **Reporting:** Generate reports on clinic performance (Admin).
*   **Settings:** Configure application settings (Admin).
*   **Authentication:** Secure login and signup for users.
*   **Role-Based Access Control:** Different views and permissions for different user roles (e.g., Admin, Receptionist, Dentist).

## Technology Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS
*   **Routing:** React Router
*   **State Management:** React Context API
*   **Linting:** ESLint

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd dental-clinic-scheduler
    ```
2.  **Install dependencies:**
    Make sure you have Node.js and pnpm installed.
    ```bash
    pnpm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add any necessary environment variables (e.g., API endpoints, secrets). Refer to `.env.example` if available (Note: `.env.example` not currently present, needs creation if required).

## Running the Application

1.  **Development Mode:**
    ```bash
    pnpm run dev
    ```
    This will start the Vite development server, typically available at `http://localhost:5173`.

2.  **Production Build:**
    ```bash
    pnpm run build
    ```
    This command builds the application for production in the `dist` folder.

3.  **Preview Production Build:**
    ```bash
    pnpm run preview
    ```
    This command serves the production build locally.

## Linting

```bash
pnpm run lint
```
This command runs ESLint to check for code quality and style issues.