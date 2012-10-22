
function ListClass( data ) {
  this.data = data
}

ListClass.prototype.head = function() {
  return typeof this.data[ 0 ] !== "undefined" ? this.data[ 0 ] :
         null
}

ListClass.prototype.tail = function() {
  return typeof this.data[ 1 ] !== "undefined" ? new List( this.data.slice( 1 ) ) :
         new List([ null ])
}


function List( arr ) {
  if( Array.isArray(arr) && arguments.length === 1 ) {
    return new ListClass( arr )
  } else if( arr instanceof ListClass ) {
    return new ListClass( arr.data.slice(0) )
  } else {
    return new ListClass( [].splice.call( arguments, 0 ) )
  }
}

List.isList = function( cand ) {
  return cand instanceof ListClass
}

List.len = function( list ) {
  return 0 + ( list.head() !== null ? 1 + List.len(list.tail()) : 0 )
}

List.concat = function( lista, listb ) {
  return List([].concat(
    List.isList(lista) ? lista.data : lista,
    List.isList(listb) ? listb.data : listb
  ))
}

List.append = List.concat

List.take = function( list, n ) {
  return n > List.len( list ) ? list :
         n > 0 ? List( List.concat(list.head(), List.take(list.tail(), n-1)) ) :
         List()
}

List.drop = function( list, n ) {
  return n > List.len( list ) ? null :
         n > 0 ? List.drop( list.tail(), n-1 ) :
         list
}

List.member = function( list, cand ) {
  return list.head() === null ? false :
         list.head() === cand ? true :
         List.member( list.tail(), cand )
}

List.position = function( list, cand ) {
  return 0 + ( list.head() === cand ? 1 :
               list.head() === null ? 0 :
               List.position(list.tail(), cand) + 1 )
}

List.loop = function ( list, fn ) {
  var head, tail
  head = list.head()
  tail = list.tail()
  if( head !== null ) {
    fn( head )
    List.loop( tail, fn )
  }
}

List.each = List.loop

module.exports = List