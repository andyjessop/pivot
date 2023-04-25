import { table, tag } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectVariablesData } from '~app/modules/variables';

export default function Releases() {
  const router = useService('router');
  const variables = useSelector(selectVariablesData);

  if (!router || !variables) {
    return null;
  }

  return (
    <>
      <table className={cx(table.container, table.small)}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {variables.map((variable) => (
            <tr key={variable.uuid}>
              <td>
                <span className={cx(tag.container, tag.info)}>
                  {variable.name}
                </span>
              </td>
              <td>
                <span>{variable.created_at}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
