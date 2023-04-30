import { card, icon, table, tag, typography, util } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectEnvironmentsData } from '~app/modules/environments';

export default function Environments() {
  const router = useService('router');
  const environments = useSelector(selectEnvironmentsData);

  if (!router || !environments) {
    return null;
  }

  return (
    <div className={cx(card.container, util.center)}>
      <table className={cx(table.container, table.small)}>
        <thead>
          <tr>
            <th className={typography.heading}>Name</th>
            <th className={typography.heading}>URL</th>
          </tr>
        </thead>
        <tbody>
          {environments.map(({ name, url, urlText, uuid }) => (
            <tr key={uuid}>
              <td>
                <span className={cx(tag.container, tag.success)}>{name}</span>
              </td>
              <td>
                {url ? (
                  <a href={url} target="_blank">
                    <span>
                      {urlText}&nbsp;<span className={icon.externalLink}></span>
                    </span>
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
