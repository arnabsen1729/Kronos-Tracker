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
    let todosRef = db.collection(TODO_CLC).doc(user.uid).collection('todos');
    todosRef
        .where('id', '==', todo.id)
        .where('priority', '==', todo.priority)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                    completed: true,
                });
                // doc.data() is never undefined for query doc snapshots
            });
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
};

const deleteTodoDB = (user, todo) => {
    let todosRef = db.collection(TODO_CLC).doc(user.uid).collection('todos');
    todosRef
        .where('id', '==', todo.id)
        .where('priority', '==', todo.priority)
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
            });
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
};

const fetchTodosDB = async (user) => {
    let todos = [];
    let todosRef = db.collection(TODO_CLC).doc(user.uid).collection('todos');
    await todosRef
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                todos.push(doc.data());
            });
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
    return todos;
};

const updatePoints = async (user, todo) => {
    const time = new Date();
    const now = time.toISOString().split('T')[0];
    let points = 5 - parseInt(todo.priority) + 2;
    let numberArr = [0, 0, 0, 0];
    numberArr[todo.priority - 1] = 1;
    let resp = await db
        .collection(TODO_CLC)
        .doc(user.uid)
        .collection('points')
        .where('date', '==', now)
        .get();

    if (resp.empty) {
        db.collection(TODO_CLC)
            .doc(user.uid)
            .collection('points')
            .add({
                date: now,
                points: points,
                count: numberArr,
            })
            .then(function () {
                console.log('Added points: ', points);
            });
    } else {
        resp.forEach((document) => {
            const newPoints = parseInt(document.data().points) + points;
            let countArray = document.data().count;
            countArray[todo.priority - 1] += 1;
            document.ref.update({
                date: now,
                points: newPoints,
                count: countArray,
            });
        });
    }
};

const fetchPoints = async (user) => {
    let points = [];
    let pointsRef = db.collection(TODO_CLC).doc(user.uid).collection('points');

    await pointsRef
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                points.push(doc.data());
            });
        })
        .catch((error) => {
            console.log('Error getting documents: ', error);
        });
    return points;
};

export {
    provider,
    addTodoDB,
    markTodoDB,
    deleteTodoDB,
    signOut,
    fetchTodosDB,
    updatePoints,
    fetchPoints,
};
