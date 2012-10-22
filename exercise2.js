
var List = require("./lib/List"),
    len = List.len,
    take = List.take,
    drop = List.drop,
    member = List.member,
    position = List.position,
    loop = List.loop,
    append = List.append,
    concat = List.concat


function applyMoves( state, moves ) {
  var move, newState
  if( len(moves) === 0 ) {
    return List([ state ])
  }
  move = moves.head()
  if( move === null ) {
    return List()
  }
  return caseof(move, [
    "trackA: (N > 0)": function() {},
    "trackA: (N < 0)": function() {},
    "trackB: (N > 0)": function() {},
    "trackB: (N < 0)": function() {}
  ])
  return concat( List([ newState ]), applyMoves(newState, moves.tail()) )
}