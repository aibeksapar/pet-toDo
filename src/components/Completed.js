import icons from "../assets/icons.svg";

function Completed({ completedTasks, onSelection }) {
  function handleOpen() {}

  return (
    <div className="completed">
      <button onClick={handleOpen}>
        <span>Completed</span>
        <svg>
          <use xlinkHref={`${icons}#arrow`}></use>
        </svg>
      </button>
      <ul className="tasks tasks--completed">
        {completedTasks.map((task) => (
          <li>
            <input type="checkbox" id={task.id} defaultChecked />
            <label
              className={"tasks__label item--completed"}
              onClick={() => onSelection(task.id)}
              htmlFor={task.id}
            >
              <div className="tasks__content">
                <h3>{task.content}</h3>
                <div className="tasks__descr">
                  <span className="tasks__category">{task.category}</span>
                  <div className="tasks__date">
                    <svg>
                      <use xlinkHref={`${icons}#calendar`}></use>
                    </svg>
                    <span>{task.date}</span>
                  </div>
                </div>
              </div>
            </label>
            <div>
              <svg>
                <use xlinkHref={`${icons}#trash`}></use>
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Completed;
