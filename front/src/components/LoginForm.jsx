import Modal from "react-modal";
import { RiKakaoTalkFill } from "react-icons/ri";
import InputField from "./common/InputFeild";
import { validateLogin } from "@utils/validator";
import useForm from "@hooks/useForm";
import CustomButton from "./common/CustomButton";
import { useNavigate } from "react-router-dom";
import { useKakaoLogin } from "@hooks/useKakaoLogin";
import { loginFormStyle } from "./common/modal/style";

const LoginModal = ({ modalIsOpen, setModalIsOpen }) => {
  const navigate = useNavigate();
  const { values, errors, touched, getTextInputProps } = useForm({
    initialValue: { id: "", password: "" },
    validate: validateLogin,
  });
  const { getKakaoUrl, isUrlLoading } = useKakaoLogin(() =>
    setModalIsOpen(false)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", values);
  };

  return (
    <Modal
      style={loginFormStyle}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      shouldCloseOnOverlayClick={true}
    >
      <div className="p-6 text-copy-secondary flex flex-col justify-between">
        <h2 className="mb-6 text-xl font-bold text-copy-primary text-center">
          로그인
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            placeholder="아이디를 입력하세요"
            error={errors.id}
            touched={touched.id}
            autoFocus
            {...getTextInputProps("id")}
          />
          <InputField
            type="password"
            placeholder="비밀번호를 입력하세요"
            error={errors.password}
            touched={touched.password}
            {...getTextInputProps("password")}
          />
          <CustomButton
            type="submit"
            label="로그인"
            outline={false}
            size="lg"
          />
        </form>

        <button
          type="button"
          className="w-full mt-2 py-2 rounded-md bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] 
                      transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={getKakaoUrl}
          disabled={isUrlLoading}
        >
          <RiKakaoTalkFill className="text-xl" />
          {isUrlLoading ? "로딩 중..." : "카카오톡으로 로그인"}
        </button>

        <div className="mt-4 flex justify-center gap-4 text-sm">
          <button
            className="hover:text-copy-primary transition-colors"
            onClick={() => {
              setModalIsOpen(false);
              navigate("/signup");
            }}
          >
            회원가입
          </button>
          <span>|</span>
          <button className="hover:text-copy-primary transition-colors">
            비밀번호 찾기
          </button>
        </div>

        <button
          onClick={() => setModalIsOpen(false)}
          className="absolute top-4 right-4 hover:text-copy-primary"
        >
          ✕
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
