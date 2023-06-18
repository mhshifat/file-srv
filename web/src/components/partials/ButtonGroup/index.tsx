/* eslint-disable @typescript-eslint/ban-types */
import classes from './ButtonGroup.module.scss';

export default function ButtonGroup({ children }: { children: (options: { activeClassName: string }) => JSX.Element }) {
  return (
    <div className={classes.ButtonGroup}>
      {typeof children === 'function' ? (children as Function)?.({
        activeClassName: classes.ButtonGroup__Active
      }) : children}
    </div>
  )
}