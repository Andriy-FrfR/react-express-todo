const Button = ({type, className, children, disabled, onClick}) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >{children}</button>
  );
}

export default Button;
