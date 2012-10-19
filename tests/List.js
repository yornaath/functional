
var expect = require( "expect.js" ),
    List = require( "../lib/List.js" )

describe("List", function() {

  describe("constructor", function() {

    it("should set data to first param if first param is array and no other params is given", function() {
      var list = new List([ 1, 2, 3 ])
      expect( list.data ).to.eql([ 1, 2, 3 ])
    })

    it("should set list.data to and array containing all parameters given if multiple parameters", function() {
      var list = new List( 1, 2, true )
      expect( list.data ).to.eql([ 1, 2, true ])
    })

    it("should work without instantiation with the keyword new", function() {
      var list = List( 4, 5 )
      expect( list.data ).to.eql([ 4, 5 ])
    })

    it("should set data.to empty array if no arguments given", function() {
      var listA = List()
      var listB = List([ ])
      expect( listA.data ).to.eql([ ])
      expect( listB.data ).to.eql([ ])
    })

    it("should clone data if param is a list", function() {
      var listA = new List( 1,2,3 )
      var listB = new List( listA )
      expect( listA.data ).to.eql([ 1, 2, 3 ])
      expect( listB.data ).to.eql([ 1, 2, 3 ])
      listA.data[0] = 'foo'
      expect( listA.data ).to.eql([ 'foo', 2, 3 ])
      expect( listB.data ).to.eql([ 1, 2, 3 ])
    })

  })

  describe("head", function() {

    it("should return the first value in list.data", function() {
      var list = new List( 'a', 'b', 'c' )
      expect( list.head() ).to.equal( 'a' )
    })

    it("should return null if the first index is empty", function() {
      var list = new List( )
      expect( list.head() ).to.equal( null )
    })

    it("should not return null if head os another falsy value", function() {
      var listF = new List([ false ])
      var listZ = new List([ false ])
      expect( listF.head() ).to.not.equal( null )
      expect( listZ.head() ).to.not.equal( null )
    })

  })

  describe("tail", function() {

    it("should return a new list containin all elements folowing list.data.0", function() {
      var list = new List( 1,2,3,4,5 )
      expect( list.tail().data ).to.eql([ 2, 3, 4, 5 ])
    })

  })

})