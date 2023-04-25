import { icon, table, tag } from '@pivot/design/css';
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
    <>
      <table className={cx(table.container, table.small)}>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {environments.map(({ name, url, urlText, uuid }) => (
            <tr key={uuid}>
              <td>
                <span className={cx(tag.container, tag.info)}>{name}</span>
              </td>
              <td>
                {url ? (
                  <a href={url} target="_blank">
                    <span className={tag.container}>
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
    </>
  );
}
