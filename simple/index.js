/* eslint-env browser */

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

console.log("started");

window.addEventListener("load", () => {
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "simple-example",
    ydoc
  );
  const ytext = ydoc.getText("text");

  document.getElementById("random").addEventListener("click", () => {
    ytext.insert(0, 'hello world');
  });

  document.getElementById("clear").addEventListener("click", () => {
    ytext.delete(0, ytext.length);
  });

  const textArea = document.getElementById("text");
  ytext.observe(event => {
    textArea.textContent = ytext.toString();
  });

  const connectBtn = document.getElementById("y-connect-btn");
  connectBtn.addEventListener("click", () => {
    if (provider.shouldConnect) {
      provider.disconnect();
      connectBtn.textContent = "Connect";
    } else {
      provider.connect();
      connectBtn.textContent = "Disconnect";
    }
  });

  // @ts-ignore
  window.example = { provider, ydoc, ytext, Y };
});
