import mitt from "mitt";

export default ({ app }) => {
  const emitter = mitt();
  app.provide('emitter', emitter);
};
