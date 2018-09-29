const mercury = require('mercury-parser')(process.env.MERCURY_TOKEN);

export const getContent = async (url: string): Promise<string> => {
  const response = await mercury.parse(url);
  return response.content;
};
