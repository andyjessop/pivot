import { ExtractActions } from '@pivot/lib/slice';

import * as reducers from '../reducers';

export type Actions = ExtractActions<typeof reducers>;
