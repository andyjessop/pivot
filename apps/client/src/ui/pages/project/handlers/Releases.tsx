import { icon, table, tag } from '@pivot/design/css';
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
    <>
      <table className={cx(table.container, table.small)}>
        <thead>
          <tr>
            <th>Commit</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {releases.map((release) => (
            <tr key={release.uuid}>
              <td>
                <a href={release.commit_url} target="_blank">
                  <span className={tag.container}>
                    {release.hash}&nbsp;
                    <span className={icon.externalLink}></span>
                  </span>
                </a>
              </td>
              <td>
                <span>{release.created_at}</span>
              </td>
              <td>
                <button className="button is-dark">Deploy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
