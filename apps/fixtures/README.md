# OpenAI API starter kit for Deno

A bare-bones starter for Deno. This doesn't assume whether you're building a CLI or API, it's just a way to get you started interfacing with OpenAPI.

## Getting Started

If you haven't installed Deno yet, follow the instructions [here](https://deno.land/manual@v1.31.3/getting_started/installation) (make sure you follow the [Setting up your environment](https://deno.land/manual@v1.31.3/getting_started/setup_your_environment) section too).

Once you've got that up and running (make sure you follow the [Setting up your environment](https://deno.land/manual@v1.31.3/getting_started/setup_your_environment) section too), clone this repo.

Head to https://platform.openai.com/account/api-keys to add an API key. Clone this repo, copy the `.env.example` file to `.env`:

```
git clone https://github.com/andyjessop/deno-openapi.git
cd deno-openapi
cp .env.example .env
```

Then add your API key to the `OPENAI_API_KEY=` variable.

```
OPENAI_API_KEY=your_key_here
```

Now you can run the app:

```
deno task start
```

You should see something like this logged out to the console:

```
{
  id: "cmpl-6uoXafOpP0Iu54UshgZPyMwOFtXjE",
  object: "text_completion",
  created: 1678998666,
  model: "text-davinci-003",
  choices: [
    {
      text: "\n\nSunny day, so bright\nA gentle breeze, so light\nA perfect summer day",
      index: 0,
      logprobs: null,
      finish_reason: "stop"
    }
  ],
  usage: { prompt_tokens: 8, completion_tokens: 20, total_tokens: 28 }
}
```

Note that you can use a few command line arguments to modify the completion settings. E.g.:

```
deno task start --prompt "Write a typescript function to pipe functions" --model "code-davinci-002" --maxTokens 200
```

## Compiling to an executable

There is a task already set-up to compile to a binary format. Just run:

```
deno task compile
```

This will create a `dist/main.exe` which you can then run with `./dist/main.exe`. (See the `deno.json` file for configuration).