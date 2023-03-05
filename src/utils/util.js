const fullName = (family, name, father) => {
  return [family, name, father].join(' ').trim();
}

module.exports.fullName = fullName;