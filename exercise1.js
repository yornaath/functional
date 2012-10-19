
var List = require( './lib/List' ),
    util = require( 'util' )
    // codein = require("node-codein");

function put( m ) {
  console.log.apply(console, arguments)
}




// TASK 5 ->
function fact( n ) {
  if( n === 0 ) {
    return 1
  } else {
    return n * fact( n - 1 )
  }
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
function length( list ) {
  return 0 + ( list.head() !== null ? 1 + length(list.tail()) : 0 )
}

put( length(new List(1, 2, 3)) ) // -> 3
put( length(new List(1, 'b', 3, false)) ) // -> 4


function concat( lista, listb ) {
  return List([].concat(
    List.isList(lista) ? lista.data : lista,
    List.isList(listb) ? listb.data : listb
  ))
}

function take( list, n ) {
  return n > length( list ) ? list :
         n > 0 ? List( concat(list.head(), take(list.tail(), n-1)) ) :
         List()
}

put( take(List(1,2,3,4,5), 2) )  // -> [1,2]
put( take(List(1,2,3,4,5), 4) )  // -> [1,2,3,4]
put( take(List(1,2,3,4,5), 10) ) // -> [1,2,3,4,5]


function drop( list, n ) {
  return n > length( list ) ? null :
         n > 0 ? drop( list.tail(), n-1 ) :
         list
}

put( drop(List(1,2,3,4,5), 3)) // -> [3,4,5]


function append( lista, listb ) {
  return concat( lista, listb )
}

function member( list, cand ) {
  return list.head() === null ? false :
         list.head() === cand ? true :
         member( list.tail(), cand )
}

put( member(List(1,2,3), 2) )         // -> true
put( member(List(1,2,3), 5) )         // -> false
put( member(List(1,'a',3), 'a') )     // -> true


function position( list, cand ) {
  return 0 + ( list.head() === cand ? 1 :
               list.head() === null ? 0 :
               position(list.tail(), cand) + 1 )
}

put( position(List(4,5,6,7,8), 7) )                     // -> 4
put( position(List('a','b','c'), 'c') )                 // -> 3
put( position(List(true, true, false, true), false) )   // -> 3
// <- TASK 7



function loop( list, fn ) {
  var head, tail
  head = list.head()
  tail = list.tail()
  if( head !== null ) {
    fn( head )
    loop( tail, fn )
  }
}



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