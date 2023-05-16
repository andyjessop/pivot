import { animate, button, card, icon, table, typography } from '@pivot/design/css';
import { Tag } from '@pivot/design/react/tag';
import { cx } from '@pivot/util/classname';

import { useSelector, useService } from '~app';
import { selectDeploymentsData, selectDeploymentsResourceData } from '~app/modules/deployments';
import { selectEnvironmentsResourceData } from '~app/modules/environments';
import { selectProjectId } from '~app/modules/project/project.selectors';

export default function Deployments() {
  const router = useService('router');
  const pendingDeployment = useService('pendingDeployment');
  const deployments = useSelector(selectDeploymentsResourceData);
  const denormalizedDeployments = useSelector(selectDeploymentsData);
  const environments = useSelector(selectEnvironmentsResourceData);
  const projectId = useSelector(selectProjectId);

  if (!router || !pendingDeployment || !deployments || !denormalizedDeployments || !environments) {
    return null;
  }

  const { Link } = router;

  const clone = (uuid: string) => {
    const deployment = deployments.find((deployment) => deployment.uuid === uuid);

    if (!deployment) {
      return;
    }

    pendingDeployment.cloneDeployment(deployment);
  };

  return (
    <div className={cx(card.container, card.zero, animate.element, animate['fade-in'])}>
      <table className={cx(table.container, table.small)}>
        <thead>
          <tr>
            <th className={cx(typography.heading, typography.h5)}>Release</th>
            <th className={cx(typography.heading, typography.h5)}>Environment</th>
            <th className={cx(typography.heading, typography.h5)}>URL</th>
            <th className={cx(typography.heading, typography.h5)}>Deployed At</th>
            <th className={cx(typography.heading, typography.h5)}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {denormalizedDeployments.map(
            ({ created_at, environment, release, url, urlText, uuid }) => (
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
                  <Tag color={environment?.color}>{environment?.name}</Tag>
                </td>
                <td>
                  <a href={url} rel="noreferrer" target="_blank">
                    <span>
                      {urlText}&nbsp;<span className={icon.externalLink}></span>
                    </span>
                  </a>
                </td>
                <td className={typography.subtitle}>{created_at}</td>
                <td>
                  <button className={cx(button.base)} onClick={() => clone(uuid)}>
                    <span className={cx(button.icon, button.before)}>
                      <i className={icon.copy}></i>
                    </span>
                    <span>Duplicate</span>
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
