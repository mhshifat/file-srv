/* eslint-disable react-refresh/only-export-components */
import { Input } from "../../ui";
import classes from './SearchInput.module.scss';
import { InputHTMLAttributes, ForwardedRef, forwardRef } from 'react';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

function SearchInput({ ...props }: SearchInputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <Input
      prepend={
        <span className={classes.SearchInput__SVG}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24" fill="none">
            <path d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      }
      placeholder='Search...'
      {...props}
      ref={ref}
    />
  )
}

export default forwardRef(SearchInput);