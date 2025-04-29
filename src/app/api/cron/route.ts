//cron job that kills the question after time expires
// hit this route after every few mins
// This function queries the database for questions where:

// status is ACTIVE
// expiresAt is in the past


// For each expired question, it triggers the closure process (function inside question manager action)