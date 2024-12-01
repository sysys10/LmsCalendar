import { useEffect, useState } from "react";

const useForm = ({ initialValue, validate }) => {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChangeText = (name, e) => {
    // e.target.value로 변경
    setValues({
      ...values,
      [name]: e.target.value,
    });
  };

  const handleBlur = (name) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name) => {
    const value = values[name];
    const onChange = (e) => handleChangeText(name, e); // 이벤트 객체 전달
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return { values, errors, touched, getTextInputProps };
};

export default useForm;
