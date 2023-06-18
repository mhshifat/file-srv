/* eslint-disable react-refresh/only-export-components */
import classes from './Select.module.scss';
import { ReactElement } from 'react';

interface SelectProps {
  prepend?: ReactElement;
  append?: ReactElement;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function Select({ prepend, append, options, value, onChange, placeholder = '-- Select --' }: SelectProps) {
  return (
    <div className={classes.Select}>
      {prepend}
      <select value={value} onChange={({ target }) => onChange?.(target.value)}>
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.label} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {append}
      <i>
        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
          <path d="m.153 526.146 92.168-92.299 867.767 867.636 867.636-867.636 92.429 92.299-960.065 959.935z" fillRule="evenodd" />
        </svg>
      </i>
    </div>
  )
}
