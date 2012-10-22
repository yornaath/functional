
var List = require( './lib/List' ),
    len = List.len,
    take = List.take,
    drop = List.drop,
    member = List.member,
    position = List.position,
    loop = List.loop,
    append = List.append,
    concat = List.concat



function put( m ) {
  console.log.apply(console, arguments)
}



// TASK 5 ->
function fact( n ) {
  return n === 0 ? 1 : n * fact( n-1 )
}

put( fact(5) ) // -> 120

function sumtTo( firstInt, lastInt ) {
  return firstInt < lastInt ? firstInt + sumtTo( firstInt+1, lastInt) : 
         firstInt
}

put( sumtTo(0,2) ) // -> 3
put( sumtTo(3,5) ) // -> 12

function max( x, y ) {
  return x === 0 ? y :
         y === 0 ? x :
         1 + max( x-1, y-1 )
}

put( max(1,2) ) // -> 2
put( max(10,20) ) // -> 20
// <- TASK 5




//TASK 7
put( len(new List(1, 2, 3)) ) // -> 3
put( len(new List(1, 'b', 3, false)) ) // -> 4

put( take(List(1,2,3,4,5), 2) )  // -> [1,2]
put( take(List(1,2,3,4,5), 4) )  // -> [1,2,3,4]
put( take(List(1,2,3,4,5), 10) ) // -> [1,2,3,4,5]

put( drop(List(1,2,3,4,5), 3)) // -> [3,4,5]

put( member(List(1,2,3), 2) )         // -> true
put( member(List(1,2,3), 5) )         // -> false
put( member(List(1,'a',3), 'a') )     // -> true

put( position(List(4,5,6,7,8), 7) )                     // -> 4
put( position(List('a','b','c'), 'c') )                 // -> 3
put( position(List(true, true, false, true), false) )   // -> 3
// <- TASK 7




// TASK 8 ->
var keywords, operators

keywords = new List([ "local", "in", "if", "then", "else", "end" ])
operators = new List([ "+", "-", "*", "/", "=", "==" ])

function key( name ) {
  return {"key":name}
}
function id( name ) {
  return {"id":name}
}
function atom( name ) {
  return {"atom":name}
}
function operator( name ) {
  return {"operator":name}
}

function allLowerCase( string ) {
  return string == string.toLowerCase()
}

function allUpperCase( string ) {
  return string == string.toUpperCase()
}

function Lexer( words ) {
  var tokens = new List([ ])
  loop(words, function( word ) {
    member( keywords, word )  ? tokens = append( tokens, key(word) ) :
    member( operators, word ) ? tokens = append( tokens, operator(word) ) :
    allUpperCase( word )      ? tokens = append( tokens, id(word) ) : 
    allLowerCase( word )      ? tokens = append( tokens, atom(word) ) :
    null
  })
  return tokens
}

put( Lexer( List("local", "X", "in", "if", "x", "end") ) )
put( Lexer( List("local", "FOO", "in", "if", "1", "+", "2", "==", "3", "end") ) )
// <- TASK 8