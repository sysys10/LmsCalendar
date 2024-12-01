export const validateLogin = (values) => {
  const errors = {};

  // 이메일 검증
  if (!values.id) {
    errors.id = "아이디를 입력해주세요";
  } else if (values.id.length < 4 || values.id.length > 20) {
    errors.id = "아이디는 4~20글자로 입력해주세요";
  }
  // 비밀번호 검증
  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요";
  } else if (values.password.length < 8 || values.password.length > 16) {
    errors.password = "비밀번호는 8~16자리로 입력해주세요";
  } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(values.password)) {
    errors.password = "비밀번호는 영문과 숫자를 포함해야 합니다";
  }

  return errors;
};
