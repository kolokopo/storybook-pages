import "../src/index.css";

import { initialize, mswDecorator } from "msw-storybook-addon";
import { useEffect } from "react";

// Registers MSW addon
initialize();

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    mswDecorator,

    // 👇 Branch switcher decorator
    (Story, context) => {
      const branch = context.globals.branch;

      useEffect(() => {
        const currentPath = window.location.pathname;

        const target =
          branch === "main"
            ? "/storybook-pages/"
            : "/storybook-pages/develop/";

        if (!currentPath.startsWith(target)) {
          window.location.href = target;
        }
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