# Personal Portfolio Website

A modern, interactive personal portfolio designed to showcase projects, skills, and experience with style. Built with React, Vite, and Tailwind CSS, featuring rich animations and a fully functional admin dashboard ready for backend integration via Supabase.

## 🚀 Features

- **Modern & Responsive Design**
- **Tasteful Animations & Micro-interactions**: Powered by Motion for smooth page transitions and interactive elements.
- **Admin Dashboard**: Manage projects, messages, workspace images, and site settings directly from an integrated admin panel.
- **Accessible Components**: Utilizes Radix UI primitives for high-quality, accessible interactive components.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4, Shadcn UI (Customized Radix UI)
- **Routing**: React Router
- **Animations**: Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Forms & Validation**: React Hook Form

## 💻 Getting Started

To get a local copy up and running

### Prerequisites

You will need Node.js and npm installed on your machine.

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/SaMoBTW/Portfolio.git
   ```

2. Navigate into the project directory

   ```bash
   cd Portfolio-1
   ```

3. Install NPM packages

   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## 🏗️ Backend Integration (Supabase)

This project is fully prepared to be integrated with Supabase for backend data storage, file handling (images/albums), and user authentication.

Please refer to the `BACKEND_INTEGRATION_README.md` and `/src/app/lib/SUPABASE_INTEGRATION_GUIDE.ts` inside the codebase. They provide step-by-step instructions on running the SQL migrations, setting up storage buckets, and connecting your local `.env` keys.

## 📝 License

This project is open-source and available under the terms of the MIT License.
