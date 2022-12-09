exports.decreaseByStrField = function decreaseByStrField(fieldName) {
  return (obj1, obj2) => obj1[fieldName] < obj2[fieldName] ? 1: -1;
}

exports.decreaseByNumberField = function decreaseByNumberField(fieldName) {
  return (obj1, obj2) => Number(obj1[fieldName]) < Number(obj2[fieldName]) ? 1: -1;
}