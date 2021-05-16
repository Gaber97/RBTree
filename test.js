'use strict';


const expect = require('chai').expect;

const SimpleNode = require('./src/parentclasses/SimpleNode');
//Test the RBTRee functionality


//https://p5js.org/learn/tdd.html

// describe lets you comment on what this block of code is for.
describe('Test the Nodes', function() {



  let simpleNode;

  beforeEach(function() {
    simpleNode = new SimpleNode(12);
  });

  it('Simple Node init well', function(done) {

    expect(simpleNode.value).to.equal(12);

    done();
  });















});