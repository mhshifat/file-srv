/* eslint-disable react-refresh/only-export-components */
import classNames from 'classnames';
import classes from './Button.module.scss';
import { useMemo, PropsWithChildren, HTMLAttributes, forwardRef, ForwardedRef } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary'
}

function Button({ children, variant, ...props }: PropsWithChildren<ButtonProps>, ref: ForwardedRef<HTMLButtonElement>) {
  const variantClassNames = useMemo(() => {
    return { 'primary': classes.Button__Primary, 'secondary': classes.Button__Secondary }[variant]
  }, [variant]);

  return (
    <button {...props} ref={ref} className={classNames(classes.Button, props.className, variantClassNames)}>{children}</button>
  )
}

export default forwardRef(Button);