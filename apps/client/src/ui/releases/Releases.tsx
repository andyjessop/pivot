import { animate, button, card, icon, table, typography, util } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectReleasesData } from '~app/modules/releases';

export default function Releases() {
  const router = useService('router');
  const releases = useSelector(selectReleasesData);

  if (!router || !releases) {
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
            <th className={cx(typography.heading, typography.h5)}>Commit</th>
            <th className={cx(typography.heading, typography.h5)}>Created At</th>
            <th className={cx(typography.heading, typography.h5)}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {releases.map((release) => (
            <tr key={release.uuid}>
              <td>
                <a href={release.commit_url} rel="noreferrer" target="_blank">
                  <span>
                    {release.hash}&nbsp;
                    <span className={icon.externalLink}></span>
                  </span>
                </a>
              </td>
              <td>
                <span>{release.created_at}</span>
              </td>
              <td>
                <button className={button.base}>Deploy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
