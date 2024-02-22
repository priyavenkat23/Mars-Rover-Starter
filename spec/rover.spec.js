const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  //#7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(1000);
    expect(rover.generatorWatts).toBe(110);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.position).toBe(1000);
  });

  //#8
  it("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(100);
    let commands = [new Command('MOVE', 4321),
    new Command('STATUS_CHECK')];

    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual('TA power');
  });

  
//#9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(100);
    let commands = [new Command('MOVE', 4321),
    new Command('STATUS_CHECK')];

    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(2);
  });

  //#10
  it("responds correctly to the status check command", function() {
    let rover = new Rover(4321);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status check message', commands);
    let response = rover.receiveMessage(message);

    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[0].roverStatus.position).toEqual(4321);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
  });

  //#11
  it("responds correctly to the mode change command", function() {
    let rover = new Rover(5621);
    let commands = [new Command('MOVE', 4321),
    new Command('STATUS_CHECK'),
    new Command('MODE_CHANGE', 'LOW_POWER'),
    new Command('MOVE', 3579),
    new Command('STATUS_CHECK')];
    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[1].roverStatus.position).toEqual(4321);
    expect(response.results[2].completed).toBeTruthy();
    expect(response.results[3].completed).toBeFalsy();
    expect(response.results[4].roverStatus.position).toEqual(4321);
    expect(response.results[4].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[4].roverStatus.generatorWatts).toEqual(110);
  });


  //#12

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(5621);
    let commands = [
    new Command('MODE_CHANGE', 'LOW_POWER'),
    new Command('MOVE', 3579),
    new Command('STATUS_CHECK')];
    let message = new Message('LOW power mode change', commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('LOW power mode change');    
    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[1].completed).toBeFalsy();
    expect(response.results[2].roverStatus.position).toEqual(5621);
    
  });

  //#13
  
  it("responds with the position for the move command", function() {
    let rover = new Rover(5321);
    let commands = [
    new Command('MODE_CHANGE', 'NORMAL'),
    new Command('MOVE', 3579),
    new Command('STATUS_CHECK')];
    let message = new Message('Normal power mode change', commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Normal power mode change');    
    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[1].completed).toBeTruthy();
    expect(response.results[2].roverStatus.position).toEqual(3579);
    
  });



});
