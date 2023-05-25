import { Entry } from '@pivot/client/activity';

import styles from './toaster.module.css';

interface Props {
  entries: Entry[];
}

export function Activity({ entries }: Props) {
  return (
    <div className={styles.container}>
      {entries.map((entry) => (
        <div key={entry.id}>{entry.content}</div>
      ))}
    </div>
  );
}
