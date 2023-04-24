import { table, tag } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectDeploymentsData } from '~app/modules/deployments';

export default function Deployments() {
  const router = useService('router');
  const deployments = useSelector(selectDeploymentsData);

  if (!router || !deployments) {
    return null;
  }

  const { link } = router;

  return (
    <>
      <table className={table.container}>
        <thead>
          <tr>
            <th>Release</th>
            <th>Environment</th>
            <th>URL</th>
            <th>Deployed At</th>
          </tr>
        </thead>
        <tbody>
          {deployments.map(
            ({ created_at, environment, release, url, urlText, uuid }) => (
              <tr key={uuid}>
                <td>
                  <a
                    className={cx(tag.container, tag.success)}
                    href=""
                    onClick={link({
                      name: 'projectReleases',
                      params: { releaseId: release?.uuid },
                    })}
                  >
                    {release?.hash}
                  </a>
                </td>
                <td>
                  <a
                    className={cx(tag.container, tag.info)}
                    href=""
                    onClick={link({
                      name: 'projectEnvironments',
                      params: { environmentId: environment?.uuid },
                    })}
                  >
                    {environment?.name}
                  </a>
                </td>
                <td>
                  <a href={url} target="_blank">
                    {urlText}
                  </a>
                </td>
                <td>{created_at}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </>
  );
}
