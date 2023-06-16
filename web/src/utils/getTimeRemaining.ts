export default function getTimeRemaining(targetDate: Date): { hours: number, minutes: number, seconds: number } {
  const now = new Date();
  const timeDifference = targetDate.getTime() - now.getTime();

  // Ensure the target date is in the future
  if (timeDifference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  // Calculate remaining hours, minutes, and seconds
  const totalSeconds = Math.floor(timeDifference / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { hours, minutes, seconds };
}