import styles from './styles.module.css';

import { Log } from '.';

export function ServerResponseRenderer (props: { logs: Log[] }) {
  return (
    <div className={styles.logs}>
      {props.logs.map((log: Log, i: number) => (
        <pre key={i} className="whitespace-pre-wrap">
          <p className={styles[`response-kind-${log.kind}`] + ' font-bold'}>
            {log.msg}
          </p>
        </pre>
      ))}
    </div>
  )
}

