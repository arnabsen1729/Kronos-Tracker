import React, { useState } from 'react';
import { markTodoDB, addTodoDB, deleteTodoDB } from '../../db/db';
import TodoCard from '../TodoCard/TodoCard';

function Dashboard({ user, logOutFunc }) {
    const [showTimer, setShowTimer] = useState(false);

    let headingClassName = (color) => {
        return `text-3xl font-bold text-${color}-700 mb-3`;
    };

    const addTodoToDB = (todo) => {
        addTodoDB(user, todo);
    };

    const markTodoToDB = (todo) => {
        markTodoDB(user, todo);
    };

    const deleteTodoToDB = (todo) => {
        deleteTodoDB(user, todo);
    };

    const dashboardItems = (
        <>
            <div>{user.displayName}</div>
            {/* <button onClick={() => setShowTimer(true)}>TIMER</button> */}

            <button
                onClick={logOutFunc}
                className="text-sm mt-2 mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign out with Google
            </button>
            <div className="ml-auto grid grid-flow-cols md:grid-cols-2 gap-6 max-w-screen-2xl h-screen mr-5">
                <div className="md:mt-7">
                    <h1 className={headingClassName('red')}>
                        High Importance + Urgent
                    </h1>
                    <TodoCard
                        priority={1}
                        bgColor="red"
                        addTodoToDB={addTodoToDB}
                        markTodoToDB={markTodoToDB}
                        deleteTodoToDB={deleteTodoToDB}
                    />
                </div>
                <div className="md:mt-7">
                    <h1 className={headingClassName('blue')}>
                        High Importance + Not Urgent
                    </h1>
                    <TodoCard
                        priority={2}
                        bgColor="blue"
                        addTodoToDB={addTodoToDB}
                        markTodoToDB={markTodoToDB}
                        deleteTodoToDB={deleteTodoToDB}
                    />
                </div>
                <div>
                    <h1 className={headingClassName('green')}>
                        Low Importance + Urgent
                    </h1>
                    <TodoCard
                        priority={3}
                        bgColor="green"
                        addTodoToDB={addTodoToDB}
                        markTodoToDB={markTodoToDB}
                        deleteTodoToDB={deleteTodoToDB}
                    />
                </div>
                <div>
                    <h1 className={headingClassName('yellow')}>
                        Low Importance + Not Urgent
                    </h1>
                    <TodoCard
                        priority={4}
                        bgColor="yellow"
                        addTodoToDB={addTodoToDB}
                        markTodoToDB={markTodoToDB}
                        deleteTodoToDB={deleteTodoToDB}
                    />
                </div>
            </div>
        </>
    );

    return <>{showTimer ? <div>Timer</div> : dashboardItems}</>;
}

export default Dashboard;
