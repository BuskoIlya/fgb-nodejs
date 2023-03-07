module.exports.fullName = fullName;

function fullName(family, name, father) {
  return [family, name, father].join(' ').trim();
}