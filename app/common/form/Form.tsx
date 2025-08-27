import { FormProvider, useForm } from "react-hook-form";

interface IFormProps<T = any> {
  initialValues?: T;
  children?: React.ReactNode | React.ReactNode[];
  onSubmit?: (data: T) => void;
}

/**
 * Componente wrapper che gestisce i form utilizzando la
 * libreria react-hook-form.
 */
export function Form(props: IFormProps) {
  const { children, onSubmit, initialValues } = props;

  const methods = useForm({
    defaultValues: initialValues || {},
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
