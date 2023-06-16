import { HTMLAttributes, PropsWithChildren, createElement } from "react";
import classes from "./Label.module.scss";
import classNames from "classnames";

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  as: 'h3',
}

export default function Label({ children, as = 'h3', ...props }: PropsWithChildren<LabelProps>) {
  return (
    <>
      {createElement(
        as,
        {...props, className: classNames(classes.Label, props.className)},
        children
      )}
    </>
  )
}