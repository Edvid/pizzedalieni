import React from 'react'
import styles from './styles.module.scss';

interface IAddIcon {
  onClick: () => void;
}

function AddIcon(props: IAddIcon) {
  return (
    <button 
      className='p-3 cursor-pointer rounded-md hover:bg-zinc-500'
      onClick={() => props.onClick()}
    >
      <span className={styles["material-symbols-outlined"]}>
        add
      </span>
    </button>
  )
}

export default AddIcon
