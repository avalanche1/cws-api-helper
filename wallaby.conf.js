module.exports = function (w) {
  return {
    compilers: {
      "**/*.ts?(x)": w.compilers.typeScript({isolatedModules: true}),
    },
  };
};
