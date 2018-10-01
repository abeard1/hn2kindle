import { getMercuryApiKey } from '../env';

const mercury = require('mercury-parser')(getMercuryApiKey());

export const getContent = async (url: string): Promise<string> => {
  const response = await mercury.parse(url);
  return response.content;
};
