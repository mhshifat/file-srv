import classes from './ProgressBar.module.scss';

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage = 0 }: ProgressBarProps) {
  return (
    <div className={classes.ProgressBar}>
      <span style={{ width: `${percentage}%` }} />
    </div>
  )
}