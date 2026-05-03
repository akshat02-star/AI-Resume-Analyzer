type Field = {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type AuthFormProps = {
  fields: Field[];
  onSubmit: (event: React.FormEvent) => void;
  buttonText: string;
};

export const AuthForm = ({
  fields,
  onSubmit,
  buttonText,
}: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={field.value}
            placeholder={field.placeholder}
            onChange={field.onChange}
            required
          />
        </div>
      ))}

      <button type="submit">{buttonText}</button>
    </form>
  );
};