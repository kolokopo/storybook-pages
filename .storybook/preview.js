import "../src/index.css";
import { useEffect } from "react";

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story, context) => {
      const branch = context.globals.branch;

      useEffect(() => {
        window.__STORYBOOK_BRANCH__ = branch;
      }, [branch]);

      return Story();
    },
  ],

  globalTypes: {
    branch: {
      name: "Branch",
      description: "Switch Storybook branch",
      defaultValue: "main",
      toolbar: {
        icon: "repo",
        items: [
          { value: "main", title: "Main" },
          { value: "develop", title: "Develop" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    viewMode: "story", // keeps toolbar working
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;