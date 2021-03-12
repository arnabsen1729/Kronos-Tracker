import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import calendarURLGen from '../../Utils/calendar';

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

function Quote({ quote, index }) {
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
                >
                    <div className="mx-2 border-b border-black mt-4 py-2 grid grid-cols-3">
                        <div className="px-2 text-2xl col-span-2">
                            {quote.content}
                        </div>
                        <div className="flex justify-around items-center">
                            <div className="text-white hover:text-green-500">
                                <FontAwesomeIcon
                                    icon={faCheckDouble}
                                    size="2x"
                                />
                            </div>
                            <a
                                href={calendarURLGen(quote)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white hover:text-yellow-700"
                            >
                                <FontAwesomeIcon
                                    icon={faCalendarCheck}
                                    size="2x"
                                />
                            </a>
                            <div className="text-white hover:text-indigo-500">
                                <FontAwesomeIcon
                                    icon={faPlayCircle}
                                    size="2x"
                                />
                            </div>
                            <div className="text-white hover:text-red-500">
                                <FontAwesomeIcon icon={faTrash} size="2x" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

const TodoList = React.memo(function QuoteList({ quotes }) {
    return quotes.map((quote, index) => (
        <Quote quote={quote} index={index} key={quote.id} />
    ));
});

function TodoCard({ bgColor, priority, addTodoToDB }) {
    let [todosItems, setTodoItems] = useState(() => []);

    const [showModal, setShowModal] = useState(false);

    const bgColorClass = () => {
        return `bg-${bgColor}-200`;
    };

    const element = (
        <div
            className={`rounded-full shadow-md hover:shadow-lg text-${bgColor}-700`}
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

    const addTodoItem = (content, priority, duration, schedule, isSchedule) => {
        const newId = (todosItems.length + 1).toString();
        if (!isSchedule) {
            schedule = '';
        }
        addTodoToDB({
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

    return (
        <div className={`${bgColorClass()} h-96 relative rounded-md`}>
            {showModal ? (
                <Modal {...{ priority, closeModalHandler, addTodoItem }} />
            ) : null}
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <TodoList quotes={todosItems} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <button
                className="absolute bottom-0 right-0 mr-5 mb-5 outline-none focus:outline-none"
                type="button"
                onClick={() => setShowModal(true)}
            >
                {element}
            </button>
        </div>
    );
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
