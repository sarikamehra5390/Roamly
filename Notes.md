Roamly — “Explore. Plan. Roam.”

The idea is to build a full-stack travel discovery and planning application.

The important thing is that we're not just making a pretty frontend. We're deliberately building Roamly to demonstrate different full-stack skills.

1. What is Roamly?

Roamly is a travel platform where a user can:

discover destinations
search destinations
filter destinations
view destination details
see real-time weather
eventually see places/attractions
eventually get currency information
create trips
save destinations
build itineraries
manage trips through a dashboard

Eventually, the architecture will look something like:

                    ROAMLY
                      │
          ┌───────────┴───────────┐
          │                       │
      FRONTEND                 BACKEND
       React                  Node + Express
          │                       │
          │                       │
          └───────────┬───────────┘
                      │
              PostgreSQL Database
                      │
              ┌───────┴───────┐
              │               │
        External APIs      Authentication
        Weather             JWT
        Places              bcrypt
        Currency


2. Why did we separate client and server?

At the beginning, we created:

Roamly/
│
├── client/
│
└── server/

This is very important.

client

This contains everything the user sees and interacts with.

We're using:

React
Vite
Tailwind CSS
React Router
Axios

For example:

Home page
Explore page
Login page
Signup page
Dashboard
Destination Details
Navbar
server

This contains our backend.

We're using:

Node.js
Express
Axios
dotenv

The backend handles things like:

API requests
authentication later
database communication later
external API communication
business logic

So we're following a basic full-stack architecture:

Browser
   ↓
React
   ↓
Express
   ↓
Database / External APIs


Build the interface against a known data shape first, then connect the real data source.

Controller is responsible for:
1.Request
2.Validation
3.Response
4.Error handling

Service is responsible for:
External API communication
This separation is extremely useful as Roamly grows.

        FRONTEND
           │
           │ Axios
           ▼
   ┌─────────────────┐
   │ Express Backend │
   └────────┬────────┘
            │
            │ API request
            ▼
   ┌─────────────────┐
   │   OpenWeather   │
   └────────┬────────┘
            │
            │ JSON
            ▼
   Express → React → UI


"I built a full-stack travel planning platform using React and Node.js. The frontend communicates with an Express REST API through Axios. I implemented a layered backend architecture with routes, controllers and services. I integrated third-party APIs for real-time travel information while keeping API credentials secured on the backend using environment variables."