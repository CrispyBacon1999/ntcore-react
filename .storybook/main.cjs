module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-essentials",
        {
            name: "@storybook/addon-docs",
            options: { configureJSX: true },
        },
    ],
    core: {
        builder: "@storybook/builder-vite",
    },
};
