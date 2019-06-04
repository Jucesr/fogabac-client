export const formatDate = raw => {
  if(!raw) {
    return '';
  }
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(raw).toLocaleDateString('ES-es', options)
}

export const replaceAll = (text, search, replacement) => {
  text = text.replace(new RegExp(search, 'g'), replacement);
  return text;
};

export const generateOptions = (arrayOfOptions => {
  return arrayOfOptions.map(option => ({
    label: option,
    value: replaceAll(option, ' ', '_').toLowerCase()
  }))
})

export const objectToArray = (obj) => {
  if(!obj)
    return []

  return Object.keys(obj).map(key => obj[key])
}

export const formatColumn = (format, value) => {

  const type = typeof format === 'string' ? format : format.type;
  const decimals = typeof format === 'string' ? 2 : format.decimals;

  const transform = function (org, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = org.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };

  switch (type) {
    case 'currency':

      return !isNaN(value) ? (
        `$${transform(parseFloat(value), decimals, 3, ',', '.')}`
      ) : value;


    case 'number':

      return !isNaN(value) ? (
        `${transform(parseFloat(value), decimals, 3, ',', '.')}`
      ) : value;


    default:
      return value

  }
};

export const convertToArrayObject = (array) => {
  return array.reduce((current, item) => {
      current[item._id] = item;
      return current
  }, {})
};

export const convertArrayToObjectWithValue = (array, objectWithValues) => {
  return array.reduce((current, item) => {
      current[item._id] = {
          ...objectWithValues[item._id],
          ...item
      };
      return current
  }, {})
};
