import { forwardRef, memo } from "react";

type CommonProps = {
  label?: string;
  error?: string;
  className?: string;
};

type InputFieldProps = CommonProps & {
  as?: "input";
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaFieldProps = CommonProps & {
  as: "textarea";
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type SelectFieldProps = CommonProps & {
  as: "select";
} & React.SelectHTMLAttributes<HTMLSelectElement>;

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

type Element = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const FormField = forwardRef<Element, FormFieldProps>((props, ref) => {
  const { label, error, className = "" } = props;

  if (props.as === "textarea") {
    const { as, ...rest } = props;

    return (
      <Wrapper label={label} error={error}>
        <textarea ref={ref as any} className={base(className)} {...rest} />
      </Wrapper>
    );
  }

  if (props.as === "select") {
    const { as, children, ...rest } = props;

    return (
      <Wrapper label={label} error={error}>
        <select ref={ref as any} className={base(className)} {...rest}>
          {children}
        </select>
      </Wrapper>
    );
  }
  const { as, ...rest } = props;

  return (
    <Wrapper label={label} error={error}>
      <input ref={ref as any} className={base(className)} {...rest} />
    </Wrapper>
  );
});
FormField.displayName = "FormField";

const Wrapper = ({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium">{label}</label>}
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const base = (c: string) => `
w-full rounded-lg border px-3 py-2
focus:ring-2 focus:ring-indigo-500
border-gray-300 ${c}
`;

export default memo(FormField);
