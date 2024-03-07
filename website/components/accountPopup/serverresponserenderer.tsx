import styles from './styles.module.css';

export interface Log {
  msg: string;
  kind: 'error' | 'warning' | 'ok';
}

export function ServerResponseRenderer (props: { responses: Log[] }) {
  return (
    <div className={styles.logs}>
      {props.responses.map((log: Log, i: number) => (
        <pre key={i} className="whitespace-pre-wrap">
          <p className={styles[`response-kind-${log.kind}`] + ' font-bold'}>
            {log.msg}
          </p>
        </pre>
      ))}
    </div>
  )
}

