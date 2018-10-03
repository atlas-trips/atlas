const formatDate = date => {
  const d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const cleanUp = data => {
  const dates = [];

  const accoms = data[0].accommodation.reduce((accomArr, current) => {
    console.log('CURRENT START DATE', current.startDate);
    const currDate = formatDate(current.startDate).slice(0,10)
    const newObj = {
      date: currDate,
      type: 'accommodation',
      name: current.name,
      users: current.users.map(user => user.name)
    }
    accomArr.push(newObj);
    if (!dates.includes(currDate)) {
      dates.push(currDate);
    }
    return accomArr
  }, []).sort((a, b) => {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  })

  const acts = data[0].activities.reduce((actArr, current) => {
    if (current.isDecided) {
      const currDate = formatDate(current.date).slice(0,10)
      const newObj = {
        date: currDate,
        type: 'activity',
        name: current.name,
        users: current.users.map(user => user.name)
      }
      if (!dates.includes(currDate)) {
        dates.push(currDate);
      }
      actArr.push(newObj);
    }
    return actArr
  }, []).sort((a, b) => {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  })

  const trans = data[0].transportation.reduce((transArr, current) => {
    const currDate = formatDate(current.date).slice(0,10)
    const newObj = {
      date: currDate,
      type: 'transportation',
      name: current.method,
      users: current.users.map(user => user.name)
    }
    if (!dates.includes(currDate)) {
      dates.push(currDate);
    }
    transArr.push(newObj);
    return transArr
  }, []).sort((a, b) => {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  })

  const itemDates = dates.sort((a, b) => {
    if (a < b)
      return -1;
    if (a > b)
      return 1;
    return 0;
  })

  const masterObj = {
    accommodations: accoms,
    activities: acts,
    transportation: trans,
    dates: itemDates,
  }

  return masterObj;
}

module.exports = cleanUp;
