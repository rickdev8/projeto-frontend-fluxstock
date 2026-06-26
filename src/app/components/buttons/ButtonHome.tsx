"use client";

import { channel } from "diagnostics_channel";

interface ButtonProps {
  name: string;
  style: string;

}

export const ButtonHome = ({ name, style}: ButtonProps) => {
  return (
    <button className={style}>
      {name}
    </button>
  );
};
