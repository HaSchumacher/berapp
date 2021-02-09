import { isNonNull } from './isNonNull';

/**
 * local time
 */
export function add(
  date: Date,
  days: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  milliSeconds?: number
) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  if (isNonNull(hours)) result.setHours(hours);
  if (isNonNull(minutes)) result.setMinutes(minutes);
  if (isNonNull(seconds)) result.setSeconds(seconds);
  if (isNonNull(milliSeconds)) result.setMilliseconds(milliSeconds);
  return result;
}

/**
 * local time
 */
export function getStartOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
