import icons from "../assets/icons.svg";

function Task({ task, onSelection, onDelete }) {
  return (
    <li className={task.completed ? "item--completed" : ""}>
      <input type="checkbox" id={task.id} />
      <label
        className="tasks__label"
        onClick={() => onSelection(task.id)}
        htmlFor={task.id}
      >
        <div className="tasks__content">
          <h3>{task.content}</h3>
          <div className="tasks__descr">
            <div className="tasks__date">
              <svg>
                <use xlinkHref={`${icons}#calendar`}></use>
              </svg>
              <span>{task.dateString}</span>
            </div>
          </div>
        </div>
      </label>
      <div className="tasks__actions">
        <button type="button" onClick={() => onDelete(task.id)}>
          <svg className="trash-svg">
            <use xlinkHref={`${icons}#trash`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
}

export default Task;
