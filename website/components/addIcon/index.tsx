import React from 'react'
import styles from './styles.module.scss';

function AddIcon() {
  return (
    <div className='p-3 cursor-pointer rounded-md hover:bg-zinc-500'>
      <span className={styles["material-symbols-outlined"]}>
        add
      </span>
    </div>
  )
}

export default AddIcon
