'use strict';
var expect = require('chai').expect;
var gameFunctions = require('../scripts/gameFunctions.js');

describe('validateGameType', function() {
	it('should exist', function() {
		expect(gameFunctions.validateGameType).not.to.be.undefined;
	});
	it('should return 1 if a number 1 is passed in', function() {
		expect(gameFunctions.validateGameType(1)).to.equal(1);
	});
	it('should return false if an array is passed in', function() {
		expect(gameFunctions.validateGameType(['a', 'b', 'c'])).to.be.false;
	});
	it('should return false if a bad string is passed in', function() {
		expect(gameFunctions.validateGameType('foo')).to.be.false;
	});
	it('should return 1 if a \'1\' is passed in', function() {
		expect(gameFunctions.validateGameType('1')).to.be.equal(1);
	});
	it('should return 1 if a \'one\' is passed in', function() {
		expect(gameFunctions.validateGameType('one')).to.be.equal(1);
	});
	it('should return 1 if a \'oNe\' is passed in', function() {
		expect(gameFunctions.validateGameType('oNe')).to.be.equal(1);
	});
	it('should return 2 if a \'2\' is passed in', function() {
		expect(gameFunctions.validateGameType('2')).to.be.equal(2);
	});
	it('should return 2 if a \'two\' is passed in', function() {
		expect(gameFunctions.validateGameType('two')).to.be.equal(2);
	});
	it('should return 2 if a \'TWo\' is passed in', function() {
		expect(gameFunctions.validateGameType('TWo')).to.be.equal(2);
	});
});
