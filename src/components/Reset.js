function Reset({ onReset }) {
  return (
    <button className="reset" onClick={() => onReset()}>
      reset
    </button>
  );
}

export default Reset;
