/* eslint-disable react-refresh/only-export-components */
import classNames from "classnames";
import classes from "./Button.module.scss";
import {
	useMemo,
	PropsWithChildren,
	HTMLAttributes,
	forwardRef,
	ForwardedRef,
} from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	variant: "primary" | "secondary";
	size?: "md" | 'lg';
	fluid?: boolean;
}

function Button(
	{ children, variant, size, fluid, ...props }: PropsWithChildren<ButtonProps>,
	ref: ForwardedRef<HTMLButtonElement>
) {
	const variantClassNames = useMemo(() => {
		return {
			primary: classes.Button__Primary,
			secondary: classes.Button__Secondary,
		}[variant];
	}, [variant]);
	const sizeClassNames = useMemo(() => {
		if (!size) return "";
		return { md: classes.Button__MdSize, 'lg': classes.Button__LgSize }[size];
	}, [size]);

	return (
		<button
			{...props}
			ref={ref}
			className={classNames(
				classes.Button,
				props.className,
				variantClassNames,
				sizeClassNames
			)}
			style={{ ...props.style, ...(fluid ? { width: "100%" } : {}) }}
		>
			{children}
		</button>
	);
}

export default forwardRef(Button);
