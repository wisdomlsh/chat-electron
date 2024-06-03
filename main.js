const { app, BrowserWindow, ipcMain } = require("electron");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

let mainWindow;
let authWindow;

const SCOPES = ["https://www.googleapis.com/auth/userinfo.profile"];
const TOKEN_PATH = path.join(app.getPath("userData"), "token.json");

// Replace with your own client ID and client secret
const CLIENT_ID =
  "366114745377-krd2qj8k1ck2r8s4djs1nsp24vqfu32k.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:8000";

// 创建主进程
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true, // 禁止调整窗口大小
    maximizable: true, // 禁止最大化
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 加载应用----react 打包
  // mainWindow.loadURL(path.join("file://", __dirname, "ant/index.html"));

  // 加载应用----适用于 react 开发时项目
  mainWindow.loadURL("http://localhost:8000/");

  // 打开调试.
  // mainWindow.webContents.openDevTools();

  ipcMain.on("isLogin", () => {
    console.log(123);
    mainWindow.setResizable(true);
    mainWindow.setMaximizable(true);
  });

  // 加载存储的令牌
  // loadToken();
}

// 创建登陆跳转窗口
function createAuthWindow() {
  authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });
  authWindow.webContents.openDevTools();
  const authUrl = getAuthUrl();

  authWindow.loadURL(authUrl);

  authWindow.on("closed", () => {
    authWindow = null;
  });

  authWindow.webContents.on("will-navigate", handleCallback);
  authWindow.webContents.on("did-get-redirect-request", handleCallback);
}

function getAuthUrl() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
}

function handleCallback(event, url) {
  const code = new URL(url).searchParams.get("as");
  if (code) {
    exchangeCodeForToken(code);
    authWindow.close();
  }
}

function exchangeCodeForToken(code) {
  // const oauth2Client = new google.auth.OAuth2(
  //   CLIENT_ID,
  //   CLIENT_SECRET,
  //   REDIRECT_URI
  // );
  //
  // console.log()
  // oauth2Client.getToken(code, (err, token) => {
  //   console.log(code, "code");
  //   if (err) {
  //     console.error("Error getting token", err);
  //     return;
  //   }
  //   oauth2Client.setCredentials(token);
  // saveToken(token);

  mainWindow.webContents.send("login-success", code);
  // });
}

function saveToken(token) {
  console.log(TOKEN_PATH);
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) console.error("Error saving token", err);
  });
}

function loadToken() {
  // fs.readFile(TOKEN_PATH, (err, token) => {
  //   if (err) return;
  //   mainWindow.webContents.send("login-success", JSON.parse(token));
  // });
}

app.whenReady().then(() => {
  createMainWindow();

  ipcMain.on("login", () => {
    createAuthWindow();
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
