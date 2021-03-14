import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';
import calendarURLGen from '../../Utils/calendar';
import Countdown from '../Countdown/Countdown';

import {
    faPlusCircle,
    faPlayCircle,
    faCheckDouble,
    faCalendarCheck,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

// import Todos from '../Todos/Todos';
import Modal from '../Modal/Modal';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    ...draggableStyle,
});

function Quote({
    quote,
    index,
    markTodoDone,
    bgColor,
    deleteTodo,
    setTimerValues,
}) {
    return (
        <Draggable draggableId={quote.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    className="pt-3"
                >
                    <div
                        className={`mx-2 rounded-lg bg-${bgColor}-500 hover:bg-${bgColor}-600 transtion duration-200 text-white py-1 grid grid-cols-3 items-center todo-reveal`}
                    >
                        <div className="px-2 text-xl col-span-2">
                            {quote.content}
                        </div>
                        <div className="flex justify-around items-center">
                            <div
                                className={`text-${bgColor}-400 cursor-pointer hover:text-green-300 tooltip`}
                                onClick={() => {
                                    markTodoDone(quote);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faCheckDouble}
                                    size="2x"
                                />
                                <span className="tooltiptext">
                                    Mark as done
                                </span>
                            </div>
                            <a
                                href={calendarURLGen(quote)}
                                target="_blank"
                                rel="noreferrer"
                                className={`text-${bgColor}-400 hover:text-indigo-300 tooltip`}
                            >
                                <FontAwesomeIcon
                                    icon={faCalendarCheck}
                                    size="2x"
                                />
                                <span className="tooltiptext">
                                    Add to calender
                                </span>
                            </a>
                            <div
                                className={`text-${bgColor}-400 cursor-pointer hover:text-gray-300 tooltip`}
                                onClick={() => {
                                    setTimerValues(quote);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faPlayCircle}
                                    size="2x"
                                />
                                <span className="tooltiptext">Start timer</span>
                            </div>
                            <div
                                className={`text-${bgColor}-400 cursor-pointer hover:text-black tooltip`}
                                onClick={() => {
                                    deleteTodo(quote);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} size="2x" />
                                <span className="tooltiptext">Delete</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

const TodoList = React.memo(function QuoteList({
    quotes,
    bgColor,
    markTodoDone,
    deleteTodo,
    setTimerValues,
}) {
    return quotes.map((quote, index) => (
        <Quote
            quote={quote}
            index={index}
            key={quote.id}
            markTodoDone={markTodoDone}
            deleteTodo={deleteTodo}
            bgColor={bgColor}
            setTimerValues={setTimerValues}
        />
    ));
});

function TodoCard({
    bgColor,
    priority,
    addTodoToDB,
    markTodoToDB,
    deleteTodoToDB,
    allTodos,
}) {
    let [todosItems, setTodoItems] = useState(() => []);
    let [showModal, setShowModal] = useState(false);
    let [timerState, setTimerState] = useState({});

    const bgColorClass = () => {
        return `bg-${bgColor}-200`;
    };

    useEffect(() => {
        setTodoItems(() =>
            allTodos.filter((t) => t.priority === priority && !t.completed)
        );
    }, [allTodos]);

    const element = (
        <div
            className={`rounded-full border border-${bgColor}-700 shadow-md hover:shadow-lg bg-white text-${bgColor}-700 transform transition duration-300 ease-in-out hover:scale-125`}
        >
            <FontAwesomeIcon icon={faPlusCircle} size="3x" />
        </div>
    );

    function onDragEnd(result) {
        console.log(result);
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const quotes = reorder(
            todosItems,
            result.source.index,
            result.destination.index
        );

        setTodoItems(quotes);
    }

    const markTodoDone = (todo) => {
        markTodoToDB(todo);
        setTodoItems((xtodos) =>
            xtodos.filter((xtodo) => xtodo.id !== todo.id)
        );
    };

    const deleteTodo = (todo) => {
        deleteTodoToDB(todo);
        setTodoItems((xtodos) =>
            xtodos.filter((xtodo) => xtodo.id !== todo.id)
        );
    };

    const giveUpFn = () => {
        setTimerState(() => {
            return {
                showTimer: false,
            };
        });
    };

    const completeFn = (todo) => {
        markTodoDone(todo);
        setTimerState(() => {
            return {
                showTimer: false,
            };
        });
    };

    const setTimerValues = (todo) => {
        setTimerState(() => {
            return {
                todo: todo,
                showTimer: true,
                giveUpFn: giveUpFn,
                completeFn: completeFn,
            };
        });
    };

    const addTodoItem = (content, priority, duration, schedule, isSchedule) => {
        const newId = (todosItems.length + 1).toString();
        if (!isSchedule) {
            schedule = '';
        }
        addTodoToDB({
            id: newId,
            content,
            priority,
            duration,
            schedule,
            isSchedule,
        });
        setTodoItems((xtodos) => [
            ...xtodos,
            {
                id: newId,
                content,
                priority,
                duration,
                schedule,
                isSchedule,
            },
        ]);
    };

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const todoListItems = (
        <div className="h-full overflow-hidden relative">
            <div
                className={`${bgColorClass()} h-full overflow-y-scroll relative rounded-lg`}
            >
                {showModal ? (
                    <Modal {...{ priority, closeModalHandler, addTodoItem }} />
                ) : null}
                <div className="mb-16">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="list">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <TodoList
                                        quotes={todosItems}
                                        markTodoDone={markTodoDone}
                                        deleteTodo={deleteTodo}
                                        bgColor={bgColor}
                                        setTimerValues={setTimerValues}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
            <button
                className="absolute bottom-0 right-0 pb-3 pr-3 outline-none focus:outline-none"
                type="button"
                onClick={() => setShowModal(true)}
            >
                {element}
            </button>
            <div>
                <ReactModal
                    ariaHideApp={false}
                    isOpen={timerState.showTimer}
                    contentLabel="Minimal Modal Example"
                >
                    <Countdown
                        todo={timerState.todo}
                        giveUpFn={timerState.giveUpFn}
                        completeFn={timerState.completeFn}
                    />
                </ReactModal>
            </div>
        </div>
    );

    return todoListItems;
}

export default TodoCard;

/*
{
    id,
    content,
    priority,
    duration,
    scheduleStart,
    scheduleEnd
}
[
  {
    "name": "State",
    "value": [

    ],
    "subHooks": []
  },
  {
    "name": "State",
    "value": false,
    "subHooks": []
  }
]

*/
