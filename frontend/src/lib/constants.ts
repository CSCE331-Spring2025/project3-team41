const environment = process.env.environment;

export const API_URL =
  environment === "prod"
    ? "https://project3-team41-deploy.onrender.com"
    : "http://localhost:3000";
