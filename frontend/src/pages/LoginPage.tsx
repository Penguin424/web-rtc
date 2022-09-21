import { useContext, useState } from "react";
import { GlobalProviderContext } from "../providers/GlobalProvider";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { online, dispatch } = useContext(GlobalProviderContext);
  const [username, setUsername] = useState("");

  const navigation = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dispatch)
      dispatch({
        type: "DASHBOARD.SET_USERNAME",
        payload: username,
      });

    navigation("/dashboard");
  };

  return (
    <div className="login-page_container background_main_color">
      <form
        onSubmit={handleSubmit}
        className="login-page_login_box background_secondary_color "
      >
        <div className="login-page_logo_container">
          <img className="login-page_logo_image" alt="logo" src={logo} />
        </div>

        <div className="login-page_title_container">
          <h2>BIENVENIDO</h2>
        </div>

        <div className="login-page_input_container">
          <input
            type="text"
            required
            placeholder="Usuario"
            className="login-page_input background_main_color text_main_color"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-page_button_container">
          <button
            className="login-page_button background_main_color text_main_color"
            type="submit"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
