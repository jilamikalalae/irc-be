import { fromZonedTime } from 'date-fns-tz'

export function getBangkokMidnightLastFridayAsUTC(): Date {
  const thaiTime = new Date(); // This is the local time of the server
  const options = { timeZone: 'Asia/Bangkok' };
  const thaiTimeStr = thaiTime.toLocaleString('en-US', options);
  const nowInThaiTime = new Date(thaiTimeStr);

  const todayDay = nowInThaiTime.getDay(); // Get the day of the week in Thai time
  const daysToSubtract = (todayDay + 7 - 5) % 7;

  const lastFridayInThaiTime = new Date(
    nowInThaiTime.setDate(nowInThaiTime.getDate() - daysToSubtract),
  );
  lastFridayInThaiTime.setHours(0, 0, 0, 0);

  // Convert the Thai time to UTC for the database query
  const utcDate = fromZonedTime(lastFridayInThaiTime, 'Asia/Bangkok');
  return utcDate;
}
