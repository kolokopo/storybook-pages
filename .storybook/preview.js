import "../src/index.css";

import { initialize, mswDecorator } from "msw-storybook-addon";
import { useEffect } from "react";

// Registers MSW addon
initialize();

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    mswDecorator,

    // ✅ SAFE branch switcher (NO full page redirect anymore)
    (Story, context) => {
      const branch = context.globals.branch;

      useEffect(() => {
        // Store branch globally (safe for GitHub Pages)
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
    actions: { argTypesRegex: "^on[A-Z].*" },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    // ✅ IMPORTANT: ensures Story mode UI (toolbar enabled)
    viewMode: "story",
  },
};

export default preview;