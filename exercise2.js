
var List = require("./lib/List"),
    len = List.len,
    take = List.take,
    drop = List.drop,
    member = List.member,
    position = List.position,
    loop = List.loop,
    append = List.append,
    concat = List.concat


function caseof( caase, patterns ) {
  var i, pattern, fn
  for( i = 0; i < patterns.length; i++ ) {
    pattern = patterns[i][0]
    fn = patterns[i][1]
    params = matchesRecord(caase, pattern)
    if( params ) {
      return fn.apply( fn, params )
    }
    
  }
}

function matchesRecord( obj, pattern ) {
  var pair, id, expr, val
  pair = pattern.split(":")
  id = pair[0]
  expr = pair[1]
  if( id in obj ) {
    val = obj[ id ]
    if( Function("N", "return " + expr).call({}, val) ) {
      return [ val ]
    }
  }
  return null
}

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
    ["trackA: N > 0", function( n ) {
      newState = {
        trackB: state.trackB,
        trackA: append( drop(state.main, len(state.main) - n), state.trackA ),
        main: take( state.main, len(state.main) - n )
      }
      return concat( List([ newState ]), applyMoves(newState, moves.tail()) )
    }],
    ["trackA: N < 0", function( n ) {
      newState = {
        trackB: state.trackB,
        trackA: drop( state.trackA, (n * -1) ),
        main: append( state.main, take( state.trackA, (n * -1) ) )
      }
      return concat( List([ newState ]), applyMoves(newState, moves.tail()) )
    }],
    ["trackB: N > 0", function( n ) {
      newState = {
        trackB: append( drop(state.main, len(state.main) - n), state.trackB ),
        trackA: state.trackA,
        main: take( state.main, len(state.main) - n )
      }
      return concat( List([ newState ]), applyMoves(newState, moves.tail()) )
    }],
    ["trackB: N < 0", function( n ) {
      newState = {
        trackB: drop( state.trackB, (n * -1) ),
        trackA: state.trackA,
        main: append( state.main, take( state.trackB, (n * -1) ) )
      }
      return concat( List([ newState ]), applyMoves(newState, moves.tail()) )
    }]
  ])
}

console.log(JSON.stringify(
  applyMoves({
    trackA: List([]),
    trackB: List([]),
    main: List(["a", "b"])
  },List([
    {trackA: 1},
    {trackB: 1},
    {trackA: -1},
    {trackB: -1}
  ]))
))