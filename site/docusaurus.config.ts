import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const useCustomDomain = process.env.CATALYST_DOCS_CUSTOM_DOMAIN === 'true';

const config: Config = {
  title: 'Catalyst Docs',
  tagline: 'Operators, wallets, builders, and protocol/RPC reference.',
  favicon: 'img/favicon.ico',
  customFields: {
    links: {
      website: 'https://catalystnet.org/',
      explorer: 'https://explorer.catalystnet.org/',
      faucet: 'https://faucet.catalystnet.org/',
    },
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Hosting:
  // - GitHub Pages project site: https://catalyst-network.github.io/catalyst-docs/  (baseUrl: /catalyst-docs/)
  // - Custom domain: https://docs.catalystnet.org/                               (baseUrl: /)
  url: useCustomDomain ? 'https://docs.catalystnet.org' : 'https://catalyst-network.github.io',
  baseUrl: useCustomDomain ? '/' : '/catalyst-docs/',

  // GitHub pages deployment config.
  organizationName: 'catalyst-network',
  projectName: 'catalyst-docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/catalyst-network/catalyst-docs/tree/main/site/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // Keep the index stable across deploys.
        hashed: true,
        // Index docs (not blog).
        indexDocs: true,
        indexBlog: false,
        // Make it easy for users to find API names.
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Catalyst Docs',
      logo: {
        alt: 'Catalyst Docs',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/overview/official-links',
          label: 'Links',
          position: 'left',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://catalystnet.org/',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://explorer.catalystnet.org/',
          label: 'Explorer',
          position: 'right',
        },
        {
          href: 'https://faucet.catalystnet.org/',
          label: 'Faucet',
          position: 'right',
        },
        {
          href: 'https://github.com/catalyst-network/catalyst-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Catalyst',
          items: [
            { label: 'Website', href: 'https://catalystnet.org/' },
            { label: 'Explorer', href: 'https://explorer.catalystnet.org/' },
            { label: 'Faucet', href: 'https://faucet.catalystnet.org/' },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview/what-is-catalyst',
            },
            {
              label: 'Quickstarts',
              to: '/docs/quickstarts/i-want-to-run-a-node',
            },
          ],
        },
        {
          title: 'Build',
          items: [
            {
              label: 'RPC reference',
              to: '/docs/rpc-reference/transaction-lifecycle',
            },
            {
              label: 'SDK (dApp builders)',
              to: '/docs/sdk/get-started',
            },
            {
              label: 'Smart contracts',
              to: '/docs/smart-contracts/evm-support-status',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Contributing',
              to: '/docs/contributing/how-to-update-docs',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/catalyst-network/catalyst-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Catalyst Network. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
