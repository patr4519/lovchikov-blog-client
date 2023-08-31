import React from 'react';
import styles from './UserInfo.module.scss';
import { formatISODate } from '../../functions/formatISODate';

export const UserInfo = ({ avatarUrl, fullName, createdAt }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{formatISODate(createdAt)}</span>
      </div>
    </div>
  );
};
