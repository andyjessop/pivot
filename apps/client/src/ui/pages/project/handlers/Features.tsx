import { table, tag } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectFeaturesData } from '~app/modules/features';

export default function Releases() {
  const router = useService('router');
  const features = useSelector(selectFeaturesData);

  if (!router || !features) {
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
          {features.map((feature) => (
            <tr key={feature.uuid}>
              <td>
                <span className={cx(tag.container, tag.success)}>
                  {feature.name}
                </span>
              </td>
              <td>
                <span>{feature.created_at}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
