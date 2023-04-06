import { dotenv, flags, openai } from './deps.ts';

main();

async function main() {
  const {
    model = 'text-davinci-003',
    prompt = 'Write a haiku about the weather.',
    temperature = 0,
    maxTokens = 50,
  } = flags.parse(Deno.args);
  const config = await dotenv.load();
  const ai = new openai.OpenAI(config.OPENAI_API_KEY);

  console.info('Creating a completion with parameters:');
  console.info('----------------------------------');
  console.info(`model: ${model}`);
  console.info(`prompt: ${prompt}`);
  console.info(`temperature: ${temperature}`);
  console.info(`maxTokens: ${maxTokens}`);
  console.info('----------------------------------\n');

  const completion = await ai.createCompletion({
    model,
    prompt,
    temperature,
    maxTokens,
  });

  console.log(completion);
}
