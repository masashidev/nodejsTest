import { EventEmitter } from 'events';

const emitter = new EventEmitter();

function onEvent() {
  console.log('an event occurred!');
}
function anotherEvent() {
  console.log('another event occurred!');
}

emitter.on('event', onEvent);
emitter.on('event', anotherEvent);
emitter.on("dataUpdated", (data) => {
  console.log("data updated");
  history.push(data);
  console.log(history);
});

let data = 0;
let history = [];

function updateData(){
  data += 1;
  console.log(data);
  emitter.emit('dataUpdated', data);
}

for(let i = 0; i < 10; i++){
  updateData();
}
