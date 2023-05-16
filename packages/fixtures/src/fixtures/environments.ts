export const environments = [
  {
    clone_of: '35902513-4df9-4625-a191-833532a190ce',
    color: '#66ccff',
    created_at: '2023-02-05T18:20:01.7615+00:00',
    features: [],
    name: 'staging',
    project_id: 'f4c727f9-6331-439e-b34d-8e056a2aa282',
    url: 'https://staging.runestone.io',
    uuid: '8808e106-315a-4372-b98a-a57303559184',
    variables: [],
  },
  {
    clone_of: null,
    color: '#6680ff',
    created_at: '2023-02-05T18:19:54.571842+00:00',
    features: [
      {
        created_at: '2023-02-05T18:26:01.518182+00:00',
        environment_id: 'f83e9a3b-5f96-45ce-a832-10e1b87732bf',
        feature_id: 'cf490256-f32b-48ec-ba32-7d16557799c0',
        uuid: 'fedd46ef-9173-40c4-9f7a-99a3489cebbb',
        value: 0,
      },
    ],
    name: 'production',
    project_id: 'f4c727f9-6331-439e-b34d-8e056a2aa282',
    url: 'https://www.runestone.io',
    uuid: 'f83e9a3b-5f96-45ce-a832-10e1b87732bf',
    variables: [
      {
        created_at: '2023-02-05T18:29:13.202193+00:00',
        environment_id: 'f83e9a3b-5f96-45ce-a832-10e1b87732bf',
        uuid: 'b160f6eb-821d-4376-9892-de7d5efb4fec',
        value: 'http://prod.api',
        variable_id: '4e698d9f-3715-4dcc-b9a8-cd1c47b9ed3a',
      },
    ],
  },
  {
    clone_of: null,
    color: '#409caf',
    created_at: '2023-02-05T18:20:10.728899+00:00',
    features: [
      {
        created_at: '2023-02-05T18:27:15.835737+00:00',
        environment_id: '35902513-4df9-4625-a191-833532a190ce',
        feature_id: 'cf490256-f32b-48ec-ba32-7d16557799c0',
        uuid: 'c09aa81e-9b38-49b4-8135-20e82490c9e5',
        value: 1,
      },
    ],
    name: 'preview',
    project_id: 'f4c727f9-6331-439e-b34d-8e056a2aa282',
    url: null,
    uuid: '35902513-4df9-4625-a191-833532a190ce',
    variables: [
      {
        created_at: '2023-02-05T18:30:04+00:00',
        environment_id: '35902513-4df9-4625-a191-833532a190ce',
        uuid: 'c4655bdf-cdd1-4f32-894b-bde8d74fd154',
        value: 'http://preview.api',
        variable_id: '4e698d9f-3715-4dcc-b9a8-cd1c47b9ed3a',
      },
    ],
  },
];
