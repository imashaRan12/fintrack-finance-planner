---
sidebar_position: 4
---

# Reference

This section contains technical details about the FinTrack Finance Planner.

## API Endpoints

### `GET /api/plans`

- **Description**: Fetch all financial plans.
- **Response**: JSON array of plans.

### `POST /api/plans`

- **Description**: Create a new financial plan.
- **Request Body**:
  ```json
  {
    "name": "Plan Name",
    "budget": 1000,
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  }
  ```

### `PUT /api/plans/:id`

- **Description**: Update an existing financial plan.

### `DELETE /api/plans/:id`

- **Description**: Delete a financial plan.

## Features

### Dashboard

- Displays a summary of monthly income, expenses, and balance.
- Includes a cash flow history chart for visualizing financial trends.

### Plan & Track

- Add income sources with details such as name, frequency, and amount.
- Add expenses with details such as category, description, frequency, and amount.
- Automatically updates the summary and cash flow chart based on added details.

### Calculator

- Perform financial calculations, including:
  - Loan Calculation
  - Mortgage Calculation
  - Leasing Calculation
  - Tax Calculation
- Input required details and view a detailed breakdown of results.

### Financial Chatbot

- Provides personalized financial advice and guidance.
- Responds to queries such as saving tips, debt management, and cash flow explanations.

## Configuration

### `.env` File

- `VITE_GEMINI_API_KEY`: The API key for the Gemini service.
- `VITE_FIREBASE_API_KEY`: The API key for Firebase.
- `VITE_FIREBASE_AUTH_DOMAIN`: The authentication domain for Firebase.
- `VITE_FIREBASE_PROJECT_ID`: The project ID for Firebase.
- `VITE_FIREBASE_STORAGE_BUCKET`: The storage bucket for Firebase.
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: The messaging sender ID for Firebase.
- `VITE_FIREBASE_APP_ID`: The application ID for Firebase.

Refer to this section for detailed technical information.
