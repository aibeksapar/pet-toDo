function Sort({ sortBy, onSortBy }) {
  return (
    <div className="sort">
      <span>Sort by:</span>
      <select value={sortBy} onChange={(e) => onSortBy(e.target.value)}>
        <option value="newest">newest</option>
        <option value="oldest">oldest</option>
        <option value="completed">completed</option>
        <option value="not-completed">not completed</option>
        <option value="description-up">description ⬆</option>
        <option value="description-down">description ⬇</option>
      </select>
    </div>
  );
}

export default Sort;
