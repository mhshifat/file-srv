/* eslint-disable react-refresh/only-export-components */
import classes from './Input.module.scss';
import { ReactElement, forwardRef, ForwardedRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prepend?: ReactElement;
  append?: ReactElement;
}

function Input({ prepend, append, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <div className={classes.Input}>
      {prepend}
      <input type="text" {...props} ref={ref} />
      {append}
    </div>
  )
}

export default forwardRef(Input);