import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

const provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const TODO_CLC = 'todo-react-trial';

const addDB = (user) => {
    if (user.email) {
        db.collection('todo-react-trial')
            .add({
                email: user.email,
                isAnonymous: user.isAnonymous,
            })
            .then((resp) => {
                alert('Document added');
            });
    } else {
        db.collection('todo-react-trial')
            .add({
                uid: user.uid,
                isAnonymous: user.isAnonymous,
            })
            .then((resp) => {
                alert('Document added');
            });
    }
};

const addTodoDB = (user, todo) => {
    db.collection(TODO_CLC)
        .doc(user.uid)
        .collection('todos')
        .add({ ...todo })
        .then(function () {
            console.log('ADDED:', todo);
        });
};

export { addDB, provider, addTodoDB };
