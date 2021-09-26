import React, { useState } from 'react'
import Task from './Task';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    return (
        <div>
            <Task />
            <Task />
        </div>
    )
}
