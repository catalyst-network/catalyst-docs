import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Use cases (for everyone)',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Send money, play games, and use apps where you control your assets and identity—without needing to learn jargon.
        <div className={styles.featureLinks}>
          <Link to="/docs/use-cases/send-money">Send money</Link>
          {' · '}
          <Link to="/docs/use-cases/games-assets">Games & assets</Link>
          {' · '}
          <Link to="/docs/use-cases/social-you-control">Social</Link>
        </div>
      </>
    ),
  },
  {
    title: 'Node operators',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Run, monitor, and upgrade Catalyst nodes safely (systemd, pruning, backups, rollback).
        <div className={styles.featureLinks}>
          <Link to="/docs/node-operators/run-a-node">Run a node</Link>
        </div>
      </>
    ),
  },
  {
    title: 'Builders',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Build dApps and tooling against Catalyst, with a focus on safe defaults and simple deploy flows.
        <div className={styles.featureLinks}>
          <Link to="/docs/sdk/get-started">SDK get started</Link>
          {' · '}
          <Link to="/docs/sdk/deploy-contract">Deploy a contract</Link>
        </div>
      </>
    ),
  },
  {
    title: 'Wallet, explorer, and faucet',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Guides for using Catalyst tools (and running them if you’re an operator).
        <div className={styles.featureLinks}>
          <Link to="/docs/wallets/wallet-user-guide">Wallet user guide</Link>
          {' · '}
          <Link to="/docs/explorer/user-guide">Explorer</Link>
          {' · '}
          <Link to="/docs/faucet/user-guide">Faucet</Link>
        </div>
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
