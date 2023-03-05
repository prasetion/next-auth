import React from "react";
import styles from "../styles/layout.module.css";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="rigth flex flex-col justify-evenly">
          <div className=" text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
