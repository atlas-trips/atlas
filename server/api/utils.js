const formatDate = date => {
  const d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const cleanUp = data => {
  const dates = [];

  const accoms = data[0].accommodation
    .reduce((accomArr, current) => {
      const currDate = formatDate(current.startDate).slice(0, 10);
      const newObj = {
        id: `accoms${current.id}`,
        date: currDate,
        type: 'accommodation',
        name: current.name,
        users: current.users.map(user => user.name)
      };
      accomArr.push(newObj);
      if (!dates.includes(currDate)) {
        dates.push(currDate);
      }
      return accomArr;
    }, [])
    .sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });

  const acts = data[0].activities
    .reduce((actArr, current) => {
      if (current.isDecided) {
        const currDate = formatDate(current.date).slice(0, 10);
        const newObj = {
          id: `acts${current.id}`,
          date: currDate,
          type: 'activity',
          name: current.name,
          users: current.users.map(user => user.name)
        };
        if (!dates.includes(currDate)) {
          dates.push(currDate);
        }
        actArr.push(newObj);
      }
      return actArr;
    }, [])
    .sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });

  const trans = data[0].transportation
    .reduce((transArr, current) => {
      const currDate = formatDate(current.date).slice(0, 10);
      const newObj = {
        id: `trans${current.id}`,
        date: currDate,
        type: 'transportation',
        name: current.method,
        users: current.users.map(user => user.name)
      };
      if (!dates.includes(currDate)) {
        dates.push(currDate);
      }
      transArr.push(newObj);
      return transArr;
    }, [])
    .sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });

  const itemDates = dates.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const masterObj = {
    accommodations: accoms,
    activities: acts,
    transportation: trans,
    dates: itemDates
  };

  return masterObj;
};

const makeCalendarArray = obj => {
  const days = obj.dates.map(date => ({date}));
  days.forEach(day => {
    const currentDay = day.date;
    obj.accommodations.forEach(accom => {
      if (accom.date === currentDay) {
        if (day.hasOwnProperty('accommodations')) {
          day.accommodations.push(accom);
        } else {
          day.accommodations = [accom];
        }
      }
    });
    obj.activities.forEach(act => {
      if (act.date === currentDay) {
        if (day.hasOwnProperty('activities')) {
          day.activities.push(act);
        } else {
          day.activities = [act];
        }
      }
    });
    obj.transportation.forEach(trans => {
      if (trans.date === currentDay) {
        if (day.hasOwnProperty('transportation')) {
          day.transportation.push(trans);
        } else {
          day.transportation = [trans];
        }
      }
    });
  });
  return days;
};

module.exports = {
  cleanUp,
  makeCalendarArray
};
