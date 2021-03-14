const firebase = require('firebase');
const firebaseConfig = {
    apiKey: 'AIzaSyC32KNYFj_GjSEQppSE9nDrgc1QZuVo3X8',
    authDomain: 'tidy-up-32957.firebaseapp.com',
    projectId: 'tidy-up-32957',
    storageBucket: 'tidy-up-32957.appspot.com',
    messagingSenderId: '237484609062',
    appId: '1:237484609062:web:2c8ccca0b1a7c32a0a20e7',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const TODO_CLC = 'todo-react-trial';


const seedPoints = (uid) => {
    const time = new Date();
    const size = 10;
    time.setDate(time.getDate() - size);
    let now = time.toISOString().split('T')[0];
    let numberArr = [0, 0, 0, 0];
    var j = 0;
    final = []
    while (j < size) {
        var i;
        var point = 0;
        time.setDate(time.getDate() + 1);
        now = time.toISOString().split('T')[0];
        for (i = 0; i < 4; i++) {
            numberArr[i] = parseInt(Math.random() * 2);
            point += (numberArr[i] * (6 - i));
            let k;
            for (k = 0; k < numberArr[i]; k++) {
                db.collection(TODO_CLC)
                    .doc(uid)
                    .collection('todos')
                    .add({
                        completed: true,
                        content: "Test " + (k + 1 + j),
                        duration: 30,
                        id: "" + (k + 1 + j),
                        isSchedule: false,
                        priority: (i + 1),
                        schedule: ""
                    });
            }
            const unCompleted = parseInt(Math.random() * 2);
            for (k = 0; k < unCompleted; k++) {
                db.collection(TODO_CLC)
                    .doc(uid)
                    .collection('todos')
                    .add({
                        completed: false,
                        content: "Test " + (k + 1 + numberArr[i]),
                        duration: 30,
                        id: "" + (k + 1 + numberArr[i]),
                        isSchedule: false,
                        priority: (i + 1),
                        schedule: ""
                    });
            }
        }
        db.collection(TODO_CLC)
            .doc(uid)
            .collection('points')
            .add({
                date: now,
                points: point,
                count: numberArr,
            })
            .then(function () {
                console.log('Added point: ', point);
                console.log('Number Array: ', numberArr);
            });
        // let timeArr = now.split('-');
        // console.log(timeArr[2] + "/" + timeArr[1] + "/" + timeArr[0]);
        // final.push(timeArr[2] + "/" + timeArr[1] + "/" + timeArr[0]);
        j += 1;
    }
    // console.log(final);
}
//funcGen()
seedPoints("qstvMNkmcQXQ6S268Grr0iniQRB3");
