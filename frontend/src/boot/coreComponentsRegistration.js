const requireComponent = require.context("../core/components", false, /\.vue$/i);

export default ({ app }) => {
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName.replace(/^\.\//, "").replace(/\.vue/, "");
    app.component(componentName, componentConfig.default || componentConfig);
  });
};
