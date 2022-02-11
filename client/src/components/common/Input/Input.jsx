const Input = ({input: {label, name, error, spread}}) => {
  return (
    <div className="input-field col s12">
      <input name={name} id={name} {...spread} />
      <label htmlFor={name}>{label}</label>
      <span className="helper-text" data-error={error ? error.message : ''}></span>
    </div>
  );
}

export default Input;
