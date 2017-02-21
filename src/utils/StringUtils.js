export function stringToHash (string) {
  var hash = 0;
  if (string.length === 0) return hash;
  for (var i = 0; i < string.length; i++) {
    var character = string.charCodeAt(i);
    hash = ( (hash << 5) - hash ) + character;
    // eslint-disable-next-line
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}