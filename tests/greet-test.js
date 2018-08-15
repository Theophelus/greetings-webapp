describe('greeting widget', function(){
  it('should return English and the name', function(){
    var newGreetings = greetings();
    assert.equal('Hello, Anele', newGreetings.setEnteredName('English','Anele'));
  });
  it('should return IsiXhosa and the name', function(){
    var newGreetings = greetings();
    assert.equal('Molo, Andrew',newGreetings.setEnteredName('IsiXhosa','Andrew'));
  });
  it('should return Afrikaans and the name', function(){
    var newGreetings = greetings();
    assert.equal('Goeie Dag, Nella', newGreetings.setEnteredName('Afrikaans','Nella'));
  });
  it('should be able to count two different names', function(){
    var newGreetings = greetings();
    newGreetings.setEnteredName('English', 'Anele');
    newGreetings.setEnteredName('Afrikaan', 'Zintle');
    assert.deepEqual(2, newGreetings.getEnteredNameCount());
  });
  it('counter should not increase if a user is greeted more than once ', function(){
    var newGreetings = greetings();
    newGreetings.setEnteredName('English', 'Anele');
    newGreetings.setEnteredName('English', 'Anele');
    newGreetings.setEnteredName('Afrikaan', 'Zintle');
    assert.deepEqual(2, newGreetings.getEnteredNameCount());
  });
  it('should count the number of greet in IsiXhosa if name entered', function(){
    var newGreetings = greetings();
    newGreetings.setEnteredName('IsiXhosa, Anele');
    assert.deepEqual(1, newGreetings.getEnteredNameCount());
  });
  it('should count the number of names regardless language selected', function(){
    var newGreetings = greetings();
    newGreetings.setEnteredName('English', 'Anele');
    newGreetings.setEnteredName('IsiXhosa', 'Andrew');
    newGreetings.setEnteredName('Afrikaan', 'Zintle');
    assert.deepEqual(3, newGreetings.getEnteredNameCount());
  });
  it('should count names in the map', function(){
    var newGreetings = greetings();
    newGreetings.setEnteredName('IsiXhosa', 'Anele');
    newGreetings.setEnteredName('English', 'Ace');
    assert.deepEqual(newGreetings.map(),{Anele: 0, Ace: 0
    });
  });
  it('should not add name that already exists in the map', function(){
    var newGreetings = greetings();
    newGreetings.setEnteredName('IsiXhosa', 'Anele');
    newGreetings.setEnteredName('English', 'Ace');
    newGreetings.setEnteredName('English', 'Ace');
    assert.deepEqual(newGreetings.map(),{Anele: 0, Ace: 0
    });
  });
});
