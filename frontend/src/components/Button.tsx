type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: any;
};

function Button({ label, onClick, className, disabled, type }: ButtonProps) {
  return <button onClick={onClick} className={className} disabled={disabled} type={type}>{label}</button>
}

export default Button
