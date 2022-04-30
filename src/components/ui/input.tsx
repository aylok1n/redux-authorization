import { ChangeEvent, Component, FocusEvent } from "react";
import * as yup from "yup";
import { ValidationError } from "yup";
import { AnyObject } from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";
enum inputStatus {
  blur,
  focus,
  error,
}

interface P {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  validationSchema:
    | RequiredStringSchema<string | undefined, AnyObject>
    | yup.BaseSchema<any, AnyObject, any>;
}

interface S {
  status: inputStatus;
  errorText?: string;
}

export class Input extends Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      status: inputStatus.blur,
    };
  }

  static validation = {
    email: yup
      .string()
      .required("Обязательное поле")
      .email("Введите корректный Email"),
    password: yup
      .string()
      .required("Обязательное поле")
      .min(4, "Пароль должен содержать минимум 4 символа")
      .max(10, "Пароль должен содержать максимум 10 символов")
      .matches(/[A-Z]/, "Пароль должен содержать одну Заглавную букву"),
    confirmPassword: (value: string) =>
      Input.validation.password.equals([value], "Пароли не совпадают"),
  };

  public validate = async () => {
    const { value, validationSchema } = this.props;
    return validationSchema
      .validate(value)
      .then((res) => {
        this.setState({ status: inputStatus.blur, errorText: "" });
        return true;
      })
      .catch((res: ValidationError) => {
        this.setState({ status: inputStatus.error, errorText: res.message });
        return false;
      });
  };

  private handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: inputStatus.focus, errorText: "" });
    this.props.onChange(e.target.value);
  };

  private handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (!this.state.errorText) this.setState({ status: inputStatus.focus });
  };

  private handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    this.setState({ status: inputStatus.blur });
  };

  public render() {
    const { placeholder, value, validationSchema } = this.props;
    const { status, errorText = "" } = this.state;

    let borderColor = "border-grey";
    if (status === inputStatus.focus) borderColor = "border-blue-500";
    else if (status === inputStatus.error) borderColor = "border-red-700";

    return (
      <div className="flex bg-white items-center justify-center w-full my-4 flex-col">
        <div className={`px-4 py-2 border-2 ${borderColor} rounded`}>
          <input
            value={value}
            type={
              validationSchema === Input.validation.password ||
              validationSchema === Input.validation.confirmPassword(value)
                ? "password"
                : "text"
            }
            className="appearance-none border-2 border-white rounded w-full py-2 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-white"
            placeholder={placeholder}
            onChange={this.handleChangeValue}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
        <span className={"text-red-700"}>{errorText}</span>
      </div>
    );
  }
}
