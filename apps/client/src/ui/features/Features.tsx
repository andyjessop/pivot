import { animate, card, table, typography, util } from '@pivot/design/css';
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
    <div
      className={cx(
        card.container,
        card.zero,
        util.center,
        animate.element,
        animate['fade-in-up-small'],
      )}>
      <table className={cx(table.container, table.small)}>
        <thead>
          <tr>
            <th className={cx(typography.heading, typography.h5)}>Name</th>
            <th className={cx(typography.heading, typography.h5)}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.uuid}>
              <td>
                <span>{feature.name}</span>
              </td>
              <td>
                <span>{feature.created_at}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
