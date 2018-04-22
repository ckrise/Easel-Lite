
// Port server should listen on
export let serverPort = 8000;

// Secret for express-session
export let sessionSecret = "bunnyslippers";

// Log format for morgan
export let logFormat = "dev";

// Database connection information
export let
  dbUser = undefined,
  dbPass = undefined,
  dbHost = "localhost",
  dbName = "proj3";