import { button, card, icon, table, tag, typography, util } from '@pivot/design/css';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectDeploymentsData } from '~app/modules/deployments';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import { selectProjectId } from '~app/modules/project/project.selectors';

export default function Deployments() {
  const router = useService('router');
  const pendingDeployment = useService('pendingDeployment');
  const deployments = useSelector(selectDeploymentsData);
  const environments = useSelector(selectEnvironmentsResourceData);
  const projectId = useSelector(selectProjectId);

  if (!router || !pendingDeployment || !deployments || !environments) {
    return null;
  }

  const { Link } = router;

  return (
    <div className={cx(card.container, util.center)}>
      <table className={cx(table.container, table.small)}>
        <thead>
          <tr>
            <th className={typography.heading}>Release</th>
            <th className={typography.heading}>Environment</th>
            <th className={typography.heading}>URL</th>
            <th className={typography.heading}>Deployed At</th>
            <th className={typography.heading}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deployments.map(({ created_at, environment, release, url, urlText, uuid }) => (
            <tr key={uuid}>
              <td>
                <Link
                  to={{
                    name: 'releases',
                    params: { id: projectId },
                  }}>
                  {release?.hash}
                </Link>
              </td>
              <td>
                <Link
                  className={cx(tag.container, tag.success)}
                  to={{
                    name: 'environments',
                    params: { id: projectId },
                  }}>
                  {environment?.name}
                </Link>
              </td>
              <td>
                <a href={url} rel="noreferrer" target="_blank">
                  <span>
                    {urlText}&nbsp;<span className={icon.externalLink}></span>
                  </span>
                </a>
              </td>
              <td>{created_at}</td>
              <td>
                <button
                  className={button.base}
                  onClick={() => pendingDeployment.cloneDeployment(uuid)}>
                  <span className={cx(button.icon, button.before)}>
                    <i className={icon.copy}></i>
                  </span>
                  <span>Duplicate</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
