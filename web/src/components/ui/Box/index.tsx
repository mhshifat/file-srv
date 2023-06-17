import classNames from 'classnames';
import classes from './Box.module.scss';
import { PropsWithChildren } from 'react';

interface BoxProps {
  display?: 'flex',
  align?: 'center',
  justify?: 'center',
  gap?: string,
  direction?: 'column',
}

export default function Box({ children, direction, display, align, justify, gap }: PropsWithChildren<BoxProps>) {
  return (
    <div style={{ gap }} className={classNames(classes.Box, {
      [classes.Box__Flex]: display === 'flex',
      [classes.Box__AlignCenter]: align === 'center',
      [classes.Box__JustifyCenter]: justify === 'center',
      [classes.Box__DirectionCol]: direction === 'column',
    })}>
      {children}
    </div>
  )
}