import classes from './Scrollable.module.scss';
import { PropsWithChildren } from 'react';

interface ScrollableProps {
  height: string;
}

export default function Scrollable({ children, height }: PropsWithChildren<ScrollableProps>) {
  return (
    <div className={classes.Scrollable} style={{ maxHeight: `min(${height}, calc(100vh - 4rem))` }}>
      {children}
    </div>
  )
}