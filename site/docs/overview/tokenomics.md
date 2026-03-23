---
sidebar_position: 4
title: Tokenomics (v1 baseline)
---

This page explains Catalyst v1 tokenomics in plain language and gives operator-facing verification steps.

Canonical source of truth:

- `catalyst-node-rust/docs/tokenomics-model.md`
- `catalyst-node-rust/docs/tokenomics-spec.md`
- RPC: `catalyst_getTokenomicsInfo`

## Protocol vs ecosystem (roadmap)

This page describes **what the v1 node protocol implements** (issuance, fee routing, reward split, fee credits). Separate **products**—wallets, explorers, bridges, liquidity, dashboards, or community programs—may ship on their own timelines. Treat anything not in the canonical node docs above as **not a protocol guarantee** until it is implemented and documented there.

## One-paragraph explainer

Catalyst v1 uses a fair-launch model with `0 KAT` at genesis and fixed issuance of `1 KAT` per successful cycle (target ~20 seconds). Unit scale is fixed at `1 KAT = 1_000_000_000 atoms`. Transaction fees are mandatory and split deterministically: `70%` is burned, `30%` goes into the reward pool, and `0%` goes to treasury. Each cycle, rewards are shared between selected producers and eligible waiting workers, with the larger share to active producers and a meaningful share to waiting participants. Waiting workers can also accrue non-transferable fee credits (after warmup and eligibility checks) that offset only their own transaction fees.

## v1 parameters

Publish these values exactly:

- `genesis_supply = 0 KAT`
- `no_premine_no_sale = true`
- `fixed_block_reward = 1 KAT` per successful cycle
- `atoms_per_kat = 1_000_000_000`
- `block_reward_atoms = 1_000_000_000`
- `cycle_target = 20s`
- `fee_burn_bps = 7000` (70%)
- `fee_to_reward_pool_bps = 3000` (30%)
- `fee_to_treasury_bps = 0`
- `producer_set_reward_bps = 7000`
- `waiting_pool_reward_bps = 3000`
- Fee credits:
  - `fee_credits_enabled = true`
  - `fee_credits_warmup_days = 14`
  - `fee_credits_accrual_atoms_per_day = 200`
  - `fee_credits_max_balance_atoms = 6000`
  - `fee_credits_daily_spend_cap_atoms = 300`
  - `waiting_eligibility_churn_penalty_days = 3`

## Why these decisions

- **`0 KAT` at genesis**: reinforces fair launch (no premine/no sale) and aligns issuance with participation.
- **Fixed `1 KAT` issuance**: predictable baseline for wallets, operators, and explorers.
- **Burn 70% of fees**: keeps anti-spam cost non-recoverable and avoids treasury governance/custody complexity at launch.

## Atom unit interpretation (RPC and tooling)

- RPC integer amounts are atom-denominated unless otherwise labeled.
- `block_reward_atoms = 1000000000` means `1 KAT` per successful cycle.
- Convert atoms to KAT with: `KAT = atoms / 1_000_000_000`.
- Prefer storing and comparing integer atom values in automation; render KAT as a UI/display conversion.

## KAT vs fee credits

- **KAT** is the normal on-chain balance: transferable between accounts subject to protocol and mempool rules (same idea as typical chain native currency).
- **Fee credits** are **not** a second tradeable token. They are **non-transferable**, only reduce **your own** mandatory fees within caps, and accrue only for **eligible waiting workers** under the rules below.

Fair launch means you can **participate without buying KAT** in the sense of **no premine and no protocol token sale**—issuance and (where eligible) fee credits come from protocol rules, not from a project-priced offering. That is different from claiming a **market price**; see the next section.

## Market price (not in protocol)

The node does **not** enforce a “launch price,” DEX quote, or investment return. Communicating **no ICO** or **no premine** is accurate; any **market price** for KAT on external venues is **outside** the core protocol unless you add separate infrastructure later.

## Participation: who earns rewards and credits? {#participation-earnings}

**Running software that syncs the chain** is **not** the same as:

- being in the **registered worker** set, and  
- satisfying **eligibility** rules (warmup, churn windows, producer vs waiting role for that cycle).

Only **selected producers** and **eligible waiting workers** participate in the reward split and fee-credit rules described here. If you operate a node, see **[Run a node](/docs/node-operators/run-a-node)** and the canonical node operator docs for how roles and registration work in your deployment.

## Reward flow per successful cycle

The **reward pool** for a successful cycle is formed from:

1. **Fixed issuance**: mint `1 KAT` (`1_000_000_000` atoms).
2. **Fee-routed share**: add `30%` of that cycle’s fees to the reward pool; `70%` of fees are burned; `0%` goes to treasury.

Then:

3. Split the **combined** reward pool between the selected producer set (larger share) and the eligible waiting worker pool (smaller share).
4. Accrue fee credits for eligible waiting workers (subject to warmup, max-balance cap, daily spend cap, and churn-penalty eligibility window).

## Fee credits (correct wording)

Use this wording in user docs:

- Fee credits accrue to eligible waiting workers (not selected producers for that cycle).
- Fee credits are non-transferable and only pay the sender's own fees.
- Credits have warmup, max-balance, daily spend caps, and a churn-penalty eligibility window.

Avoid this wording:

- All participants always accrue fee credits.
- Fee credits are transferable.
- Fee credits remove the need for transaction fees (fees remain mandatory).

## Communications (ecosystem writers)

When describing economics to users or investors:

- Prefer **verifiable** language: parameters exist in code and via `catalyst_getTokenomicsInfo`.
- Do **not** imply **guaranteed** market value, **fixed APY**, or investment returns—issuance is per-cycle protocol rules, not a yield product.

## Verify on a running node

```bash
curl -s -X POST http://127.0.0.1:8545 -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"catalyst_getTokenomicsInfo","params":[]}' | jq
```

Check that the response includes:

- `applied_cycle`
- `block_reward_atoms`
- `estimated_issued_atoms`
- `fee_burn_bps`
- `fee_to_reward_pool_bps`
- `fee_to_treasury_bps`
- `producer_set_reward_bps`
- `waiting_pool_reward_bps`

## FAQ

### Is Catalyst deflationary?

Not always. v1 has fixed issuance (`1 KAT` per successful cycle) and also burns 70% of fees. Net supply direction depends on activity and total fees over time.

### Why not send fees to a treasury?

v1 sets treasury routing to zero to avoid launch-time custody and governance complexity. Treasury routing can be revisited in a future protocol upgrade.

### Do waiting nodes receive anything?

Yes. Eligible waiting workers receive a share of cycle rewards and can accrue fee credits that offset their own transaction fees.

### Are fee credits transferable?

No. Fee credits are non-transferable and scoped to the same sender identity.

### Could Catalyst run out of tokens quickly?

No. At `1 KAT` minted every `20s`, the theoretical numeric supply ceiling (from `u64` atom representation) is extremely far out, roughly `11,699 years` of continuous successful cycles.

### Does the protocol set a price for KAT?

No. There is no protocol-enforced market price or oracle in v1. Any trading price depends on **external** markets and liquidity, not on a number encoded in the node.

### Do I earn just by syncing a node?

Not automatically. Earning under these rules requires the correct **worker/producer role**, **registration**, and **eligibility**—not merely running a sync client. See **[Participation: who earns rewards and credits?](#participation-earnings)** (above).
