export const environments = [
  {
    uuid: '35902513-4df9-4625-a191-833532a190ce',
    created_at: '2023-02-05T18:20:10.728899+00:00',
    name: 'preview',
    project_id: 'f4c727f9-6331-439e-b34d-8e056a2aa282',
    url: null,
    clone_of: null,
    features: [
      {
        created_at: '2023-02-05T18:27:15.835737+00:00',
        uuid: 'c09aa81e-9b38-49b4-8135-20e82490c9e5',
        environment_id: '35902513-4df9-4625-a191-833532a190ce',
        feature_id: 'cf490256-f32b-48ec-ba32-7d16557799c0',
        value: 1,
      },
    ],
    variables: [
      {
        created_at: '2023-02-05T18:30:04+00:00',
        uuid: 'c4655bdf-cdd1-4f32-894b-bde8d74fd154',
        environment_id: '35902513-4df9-4625-a191-833532a190ce',
        variable_id: '4e698d9f-3715-4dcc-b9a8-cd1c47b9ed3a',
        value: 'http://preview.api',
      },
    ],
  },
  {
    uuid: 'f83e9a3b-5f96-45ce-a832-10e1b87732bf',
    created_at: '2023-02-05T18:19:54.571842+00:00',
    name: 'production',
    project_id: 'f4c727f9-6331-439e-b34d-8e056a2aa282',
    url: 'https://www.runestone.io',
    clone_of: null,
    features: [
      {
        created_at: '2023-02-05T18:26:01.518182+00:00',
        uuid: 'fedd46ef-9173-40c4-9f7a-99a3489cebbb',
        environment_id: 'f83e9a3b-5f96-45ce-a832-10e1b87732bf',
        feature_id: 'cf490256-f32b-48ec-ba32-7d16557799c0',
        value: 0,
      },
    ],
    variables: [
      {
        created_at: '2023-02-05T18:29:13.202193+00:00',
        uuid: 'b160f6eb-821d-4376-9892-de7d5efb4fec',
        environment_id: 'f83e9a3b-5f96-45ce-a832-10e1b87732bf',
        variable_id: '4e698d9f-3715-4dcc-b9a8-cd1c47b9ed3a',
        value: 'http://prod.api',
      },
    ],
  },
  {
    uuid: '8808e106-315a-4372-b98a-a57303559184',
    created_at: '2023-02-05T18:20:01.7615+00:00',
    name: 'staging',
    project_id: 'f4c727f9-6331-439e-b34d-8e056a2aa282',
    url: 'https://staging.runestone.io',
    clone_of: '35902513-4df9-4625-a191-833532a190ce',
    features: [],
    variables: [],
  },
];
