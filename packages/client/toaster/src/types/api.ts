import { ExtractApi } from '@pivot/lib/slice';

import * as reducers from '../reducers';

export type Api = ExtractApi<typeof reducers>;
