
function ListClass( data ) {
  this.data = data
}

ListClass.prototype.head = function() {
  return typeof this.data[ 0 ] !== "undefined" ? this.data[ 0 ] :
         null
}

ListClass.prototype.tail = function() {
  return typeof this.data[ 1 ] !== "undefined" ? new ListClass( this.data.slice( 1 ) ) :
         new ListClass([ null ])
}

Object.defineProperty(ListClass.prototype, 0, {
  enumerable: true,
  get: function() {
    return this.head()
  }
})

Object.defineProperty(ListClass.prototype, 1, {
  enumerable: true,
  get: function() {
    return this.tail()
  }
})


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
  return 0 + ( list[0] !== null ? 1 + List.len(list[1]) : 0 )
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
         n > 0 ? List( List.concat(list[0], List.take(list[1], n-1)) ) :
         List()
}

List.drop = function( list, n ) {
  return n > List.len( list ) ? null :
         n > 0 ? List.drop( list[1], n-1 ) :
         list
}

List.member = function( list, cand ) {
  return list[0] === null ? false :
         list[0] === cand ? true :
         List.member( list[1], cand )
}

List.position = function( list, cand ) {
  return 0 + ( list[0] === cand ? 1 :
               list[0] === null ? 0 :
               List.position(list[1], cand) + 1 )
}

List.loop = function ( list, fn ) {
  var head, tail
  head = list[ 0 ]
  tail = list[ 1 ]
  if( head !== null ) {
    fn( head )
    List.loop( tail, fn )
  }
}

List.each = List.loop

module.exports = List