import { history, SelectLang, useIntl, useModel } from "@umijs/max";
import { Alert } from "antd";
import Typed from "typed.js";
import { flushSync } from "react-dom";

import React, { useEffect, useState } from "react";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import styles from "./index.module.less";
import IconButton from "@/common/IconButton";

const Lang = () => {
  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel("@@initialState");
  const [init, setInit] = useState(false);
  // @ts-ignore
  // const { ipcRenderer } = electron;
  const intl = useIntl();
  const fetchUserInfo = async (user: any) => {
    flushSync(() => {
      setInitialState((s) => ({
        ...s,
        currentUser: user,
      }));
    });
  };

  const handleGoogleLoginClick = () => {
    // ipcRenderer.send("login");
  };

  // ipcRenderer.on("login-success", async (event: any, token: string) => {
  //   if (token) {
  //     const defaultLoginSuccessMessage = intl.formatMessage({
  //       id: "pages.login.success",
  //       defaultMessage: "登录成功！",
  //     });
  //     message.success(defaultLoginSuccessMessage);
  //     await fetchUserInfo({ name: "lishuo" });
  //     const urlParams = new URL(window.location.href).searchParams;
  //     history.push(urlParams.get("redirect") || "/");
  //     ipcRenderer.send("isLogin");
  //     return;
  //   }
  // });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    new Typed("#chat", {
      strings: ["Chat-Electron"],
      typeSpeed: 50,
    });
    setInitialState((s) => ({
      ...s,
      currentUser: { name: "lishuo" },
    }));
    history.push("/chat");
  }, []);

  return (
    <div className={styles.container}>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },

                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
      {/*<Lang />*/}
      <div className={styles.form_container}>
        <div id="chat" className={styles.form_title} />
        <IconButton
          onClick={handleGoogleLoginClick}
          text={"使用Google操作"}
          className={styles.form_btn}
        />
      </div>
    </div>
  );
};

export default Login;
