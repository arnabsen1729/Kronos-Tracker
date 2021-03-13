import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
// import TodoCard from '../components/TodoCard/TodoCard';

const provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const TODO_CLC = 'todo-react-trial';

// const addDB = (user) => {
//     if (user.email) {
//         db.collection('todo-react-trial')
//             .add({
//                 email: user.email,
//                 isAnonymous: user.isAnonymous,
//             })
//             .then((resp) => {
//                 alert('Document added');
//             });
//     } else {
//         db.collection('todo-react-trial')
//             .add({
//                 uid: user.uid,
//                 isAnonymous: user.isAnonymous,
//             })
//             .then((resp) => {
//                 alert('Document added');
//             });
//     }
// };

const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            // setIsAuthorized(false);
            // setUserDetails(null);
            console.log('Sign out successful');
        })
        .catch((error) => {
            // An error happened.
        });
};

const addTodoDB = (user, todo) => {
    db.collection(TODO_CLC)
        .doc(user.uid)
        .collection('todos')
        .add({ ...todo, completed: false })
        .then(function () {
            console.log('ADDED:', todo);
        });
};

const markTodoDB = (user, todo) => {
    console.log('Marking.. ', todo);
    let todosRef = db.collection(TODO_CLC).doc(user.uid).collection('todos');
    todosRef
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    completed: true,
                });
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, ' => ', doc.data());
            });
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
};

const deleteTodoDB = (user, todo) => {
    console.log('Deleting... ', todo);
    let todosRef = db.collection(TODO_CLC).doc(user.uid).collection('todos');
    todosRef
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref
                    .delete()
                    .then(() => {
                        console.log('Document deleted...');
                    })
                    .catch((error) => {
                        console.log('Error getting documents: ', error);
                    });
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, ' => ', doc.data());
            });
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
};

export { provider, addTodoDB, markTodoDB, deleteTodoDB, signOut };
