/* eslint-disable react-refresh/only-export-components */
import classes from './Textarea.module.scss';
import { ReactElement, forwardRef, ForwardedRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  prepend?: ReactElement;
  append?: ReactElement;
}

function Textarea({ prepend, append, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <div className={classes.Textarea}>
      {prepend}
      <textarea {...props} ref={ref} />
      {append}
    </div>
  )
}

export default forwardRef(Textarea);