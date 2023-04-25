import { icon, table, tag } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';
import { pick } from '@pivot/util/object';

import { useSelector, useService } from '~app';
import { selectDeploymentsData } from '~app/modules/deployments';
import { selectProjectId } from '~app/modules/project/project.selectors';

export default function Deployments() {
  const router = useService('router');
  const pendingDeployment = useService('pendingDeployment');
  const deployments = useSelector(selectDeploymentsData);
  const projectId = useSelector(selectProjectId);

  if (!router || !pendingDeployment || !deployments) {
    return null;
  }

  const { Link } = router;

  const clone = (uuid: string) => {
    const deployment = deployments.find((d) => d.uuid === uuid);

    if (!deployment) {
      throw new Error(`Deployment ${uuid} not found`);
    }

    pendingDeployment.create({
      deployment_id: deployment.uuid,
      ...pick(deployment, [
        'environment_id',
        'features',
        'release_id',
        'variables',
      ]),
    });
  };

  return (
    <>
      <table className={cx(table.container, table.small)}>
        <thead>
          <tr>
            <th>Release</th>
            <th>Environment</th>
            <th>URL</th>
            <th>Deployed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deployments.map(
            ({ created_at, environment, release, url, urlText, uuid }) => (
              <tr key={uuid}>
                <td>
                  <Link
                    className={cx(tag.container, tag.primary)}
                    to={{
                      name: 'releases',
                      params: { id: projectId },
                    }}
                  >
                    {release?.hash}
                  </Link>
                </td>
                <td>
                  <Link
                    className={cx(tag.container, tag.info)}
                    to={{
                      name: 'environments',
                      params: { id: projectId },
                    }}
                  >
                    {environment?.name}
                  </Link>
                </td>
                <td>
                  <a href={url} target="_blank">
                    <span className={tag.container}>
                      {urlText}&nbsp;<span className={icon.externalLink}></span>
                    </span>
                  </a>
                </td>
                <td>{created_at}</td>
                <td>
                  <button
                    onClick={() => clone(uuid)}
                    className="button is-dark"
                  >
                    Clone
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </>
  );
}
