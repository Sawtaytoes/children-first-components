module.exports = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: 'webpack5',
  },
  framework: "@storybook/react",
  features: {
    interactionsDebugger: true,
  },
  managerWebpack: (
    config,
  ) => {
    config
    .target = (
      'web'
    )

    return config
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: (
    config,
  ) => {
    config
    .target = (
      'web'
    )

    return config
  },
}
