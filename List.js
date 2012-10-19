
function List( data ) {
  this.data = data
}

List.prototype.head = function() {
  return typeof this.data[ 0 ] !== "undefined" ? this.data[ 0 ] :
         null
}

List.prototype.tail = function() {
  return typeof this.data[ 1 ] !== "undefined" ? new List( this.data.slice( 1 ) ) :
         new List([ null ])
}

function Factory( arr ) {
  if( Array.isArray(arr) && arguments.length === 1 ) {
    return new List( arr )
  } else if( arr instanceof List ) {
    return new List( arr.data.slice(0) )
  } else {
    return new List( [].splice.call( arguments, 0 ) )
  }
}

Factory.isList = function( cand ) {
  return cand instanceof List
}

module.exports = Factory