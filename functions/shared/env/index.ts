export const getMercuryApiKey = (): string => {
  return process.env.MERCURY_TOKEN;
};

export const getRedditClientId = (): string => {
  return process.env.REDDIT_CLIENT_ID;
};

export const getRedditClientSecret = (): string => {
  return process.env.REDDIT_CLIENT_SECRET;
};

export const getConnectionString = (): string => {
  return 'UseDevelopmentStorage=true';
};
