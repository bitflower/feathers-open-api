import { readFileSync } from 'fs';

export const readSpec = ({ path }: { path: string }) => {
  let openApiSpec = null;
  try {
    openApiSpec = JSON.parse(readFileSync(path, 'utf-8'));
  } catch (error) {
    console.error(`Ooops, something went wrong`);
  }

  return openApiSpec;
};
