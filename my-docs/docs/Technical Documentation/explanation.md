---
sidebar_position: 3
---

# Explanation

This section explains the concepts and design decisions behind FinTrack Finance Planner.

## Core Concepts

### Financial Plan and Track

A financial plan represents a user's budget for a specific period. It includes:

- A name for identification.
- Income and Expeneces.
- A budget amount.
- Start and end dates.

### Categories

Categories help users organize their expenses and income. Examples include "Rent," "Groceries," and "Salary."

### Financial Chatbot

The Financial Chatbot is an AI-powered assistant designed to help users manage their finances more effectively. It can:

- Answer questions about financial plans and budgets.
- Provide insights into spending habits.
- Offer suggestions for saving money.
- Assist in setting up and managing financial goals.
  This feature aims to make financial planning more interactive and user-friendly.

## Design Decisions

### Technology Stack

- **Frontend**: React with Vite.js, TypeScript, and shadcn-ui for a modern and efficient user interface.
- **Styling**: Tailwind CSS for rapid and customizable design.
- **Backend**: Node.js.
- **Database**: Firebase for authentication and storing financial data.

### Why Firebase?

Firebase was chosen for its real-time database capabilities, seamless integration with authentication services, and ease of use for storing and syncing financial data. Its scalability and robust ecosystem make it an ideal choice for supporting future growth and advanced features.

## Future Enhancements

- Integration with third-party financial APIs.
- Advanced analytics and visualization tools.
- Mobile application support.

This section helps you understand the "why" behind the application.
