import { Model, State } from '../types';

export type ProjectViewData = ReturnType<typeof projectViewData>;

export function projectViewData(project: Model, state: State) {
  return { project, ui: state };
}
