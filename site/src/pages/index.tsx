import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/quickstarts/i-want-to-use-apps">
            Use apps
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/node-operators/run-a-node">
            Run a node
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/sdk/deploy-contract">
            Deploy a contract
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/faucet/user-guide">
            Get testnet funds
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Catalyst documentation hub: operators, wallets, builders, and protocol/RPC reference.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
