import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DAY_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT = 'DD/MM/YY HH:mm';

function humanizeDay(date) {
  return dayjs(date).format(DAY_FORMAT);
}

function humanizeTime(date) {
  return dayjs(date).format(TIME_FORMAT);
}

function humanizeDate(date) {
  return dayjs(date).format(DATE_FORMAT);
}

function getTimeDuration(startTime, endTime) {
  const diff = dayjs.duration(dayjs(endTime).diff(startTime));

  const days = diff.days();
  const hours = diff.hours();

  if (days > 0) {
    return diff.format('DD[D] HH[H] mm[M]');
  }
  if (hours > 0) {
    return diff.format('HH[H] mm[M]');
  }

  return diff.format('mm[M]');
}

export {humanizeDay, humanizeTime, humanizeDate, getTimeDuration};
