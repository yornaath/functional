
var List = require( './List' ),
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


