# Aurora Skin Care - E-Commerce

This is a premium e-commerce website built with **Angular (v20)** and **.NET 9 Core** with **Entity Framework Core**.

## Project Structure

- `server/`: .NET 9 Core Web API Solution
  - `Aurora.API`: Web API project with Controllers and Configuration.
  - `Aurora.Core`: Domain entities (Product).
  - `Aurora.Infrastructure`: Data access layer with SQL Server (EF Core).
- `client/`: Angular standalone application with premium design.

## Prerequisites

- .NET 9 SDK
- Node.js & npm
- Angular CLI (`npm install -g @angular/cli`)
- SQL Server access (using provided credentials)

## How to Run

### 1. Backend (Server)
Navigate to the `server` folder and run the API:
```bash
cd server
dotnet build
dotnet run --project Aurora.API
```
*Note: On first run, it will automatically apply migrations and seed initial skin care products into your SQL Server database.*

### 2. Frontend (Client)
Navigate to the `client` folder, install dependencies, and start the development server:
```bash
cd client
npm install
npm start
```
The application will be available at `http://localhost:4200`.

## Features
- **Clean Architecture**: Separation of concerns between Core, Infrastructure, and API.
- **Premium UI**: Modern Angular components with HSL-tailored colors, glassmorphism effects, and smooth animations.
- **Auto-Seeding**: Automatic database migration and population on startup.
- **CORS Configured**: Secure communication between the Angular frontend and .NET backend.
