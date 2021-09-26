import React from 'react'

export default function Task() {
    return (
        <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
        >
            <li className="todo stack-small">
                <div className="c-cb">
                    <input id="todo-0" type="checkbox" defaultChecked={true} />
                    <label className="todo-label" htmlFor="todo-0">
                        task title
                    </label>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn">
                        Edit <span className="visually-hidden">task title</span>
                    </button>
                    <button type="button" className="btn btn__danger">
                        Delete <span className="visually-hidden">task title</span>
                    </button>
                </div>
            </li>
        </ul>
    )
}
