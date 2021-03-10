function wordCount(str) {
  var m = str.match(/[^\s]+/g);
  return m ? m.length : 0;
}

word = 'Hello, my name is';

console.log(wordCount(word)); 
