const SECONDS_IN_DAY: number = 86400;
const SECONDS_IN_HOUR: number = 3600;
const SECONDS_IN_MINUTE: number = 60;

export const timeFormat = (seconds: number) => {
  
  let bufer = seconds;
  let result = '';

  if (bufer >= SECONDS_IN_DAY) {
    const days = Math.floor(bufer / SECONDS_IN_DAY);
    result += days.toString() + 'd ';
    bufer = bufer - SECONDS_IN_DAY * days;
  }

  if (bufer >= SECONDS_IN_HOUR) {
    const hours = Math.floor(bufer / SECONDS_IN_HOUR);
    result += hours.toString() + 'h ';
    bufer = bufer - SECONDS_IN_HOUR * hours;
  }

  if (bufer >= SECONDS_IN_MINUTE) {
    const minutes = Math.floor(bufer / SECONDS_IN_MINUTE);
    result += minutes.toString() + 'm';
    bufer = bufer - SECONDS_IN_HOUR * minutes;
  }

  if (!result) {
      result = bufer > 0 ? bufer + 's' : '0m';
  }

  return result;
}

export const timeFormatLecture = (seconds: number) => {
  let bufer = seconds;
  let result = '';

  if (bufer >= SECONDS_IN_DAY) {
    const days = Math.floor(bufer / SECONDS_IN_DAY);
    result += days + ':';
    bufer = bufer - SECONDS_IN_DAY * days;
  }

  if (bufer >= SECONDS_IN_HOUR) {
    const hours = Math.floor(bufer / SECONDS_IN_HOUR);
    if (result !== '') {
      result += (hours < 10 ? '0' : '') + hours + ':';
    } else {
      result += hours + ':';
    }
    bufer = bufer - SECONDS_IN_HOUR * hours;
  }

  if (bufer >= SECONDS_IN_MINUTE) {
    const minutes = Math.floor(bufer / SECONDS_IN_MINUTE);
    if (result !== '') {
      result += (minutes < 10 ? '0' : '') + minutes + ':';
    } else {
      result += minutes + ':';
    }
    bufer = bufer - SECONDS_IN_MINUTE * minutes;
  }

  if (result === '') {
    result += '00:' + (bufer > 0 ? (bufer < 10 ? '0' + bufer : bufer) : '00');
  } else {
    result += bufer > 0 ? (bufer < 10 ? '0' + bufer : bufer) : '00';
  }

  

  return result;
}