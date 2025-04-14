const environment = import.meta.env.VITE_ENVIRONMENT; // process.env.environment;

export const API_URL =
    environment === "development"
        ? "http://localhost:3000"
        : "https://project3-team41-deploy.onrender.com";