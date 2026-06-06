# XGT Token Whitepaper
## Excalibur Global Trading USA LLC
### Version 2.0 - Last Updated: March 2026

---

BEP-20 Utility Token on BNB Smart Chain | Ownership Fully Renounced | 60B Effective Max Supply | 40B Burned | Public Proof-of-Work Mining

---

## Executive Summary

XGT is an immutable utility and rewards token on BNB Smart Chain powering a transparent agricultural traceability and sustainability system.

80 billion XGT were minted at deployment. 40 billion have been permanently burned, leaving 40 billion in circulation. 20 billion remain available only through public proof-of-work mining, for an effective max supply of 60 billion.

**Contract ownership has been fully renounced, meaning no administrative control exists and the contract cannot be modified.**

> **Utility Token:** XGT is a utility token that provides access to platform features and participation rewards. It is not a security, investment contract, or financial instrument, and has not been registered with any securities regulator.
>
> **Not Investment Advice:** This document is for informational purposes only. Cryptocurrency tokens are highly volatile. Conduct your own research and consult qualified advisors before participating.

---

## Token Supply at a Glance

| Metric | Value |
|--------|-------|
| Effective Max Supply | 60B (40B Circulating + 20B Mineable) |
| Permanently Burned | 40B |
| Reserved for Public Mining Only | 20B |
| Ownership Status | Fully Renounced (Zero Admin Control) |

---

## Overview

XGT is a utility and rewards token built for the Excalibur Global ecosystem. Its purpose is to reward verified, sustainable activity across agricultural supply chains and to provide access to professional-grade environmental monitoring and reporting tools.

Excalibur Global is building a farm-to-shelf traceability network across four countries: USA, Cameroon, Liberia, and Brazil. XGT is the economic layer of this network. Participants earn XGT automatically when they register land, tokenise harvests, and complete verified supply chain handoffs. Consumers can independently verify the origin and history of products by scanning a QR code with no wallet or account required.

XGT also provides tiered access to the Excalibur Global Land MRV Tool, a sustainability assessment and reporting platform compliant with IPCC 2019, ISO 14064, and USDA/EPA frameworks. Basic assessments are free. Professional verification and registry submission support are unlocked through XGT.

---

## Token Supply and Immutability

> **Contract ownership has been fully renounced. No address has administrative control, and the contract cannot be modified.**

XGT has a contract hard cap of 100 billion tokens, enforced in code. 80 billion tokens were minted at deployment, of which 40 billion have been permanently burned. 40 billion remain in circulation, and 20 billion can only be generated through public proof-of-work mining, for an effective maximum supply of 60 billion. No function exists that allows the project team to mint additional tokens.

### 80 Billion Minted at Deployment, 40 Billion Burned

80 billion tokens were minted at deployment. 40 billion have since been permanently burned (sent to a dead address), reducing the circulating supply to 40 billion. The remaining circulating tokens are used for development, partnerships, and automated reward distribution through on-chain mechanisms.

### 20 Billion Available Through Public Mining

The remaining 20 billion XGT can enter circulation only through public browser-based proof-of-work mining. Any wallet may mine with no permission required. Mining stops automatically and permanently once the contract hard cap is reached. With 40 billion burned, the effective maximum supply that can ever be in circulation is 60 billion. The team cannot mint new tokens at any time.

### Independently Verifiable on BscScan (No Account Required)

Every claim below can be confirmed using the public BscScan block explorer. No wallet, login, or fees needed.

| Claim | How to Verify | Status |
|-------|--------------|--------|
| Ownership renounced | BscScan > Read Contract > owner() returns the zero address | Confirmed |
| No admin mint function | BscScan > Contract ABI > only the public mine() function exists; no owner mint is present | Confirmed |
| 100B contract cap, 60B effective | BscScan > Read Contract > MAX_SUPPLY() returns 100,000,000,000. With 40B permanently burned, effective max supply is 60B. | Confirmed |
| 80B minted at deploy, 40B burned | BscScan > Read Contract > INITIAL_SUPPLY() confirms 80,000,000,000 XGT. 40B subsequently burned (verifiable on BSCScan). | Confirmed |

**BSC Contract:** `0x654E38A4516F5476D723D770382A5EaF8Bae0e0D` - [Open BscScan Read Contract](https://bscscan.com/address/0x654E38A4516F5476D723D770382A5EaF8Bae0e0D#readContract)

### Network Deployments

#### BNB Smart Chain (Primary)
- **Contract:** `0x654E38A4516F5476D723D770382A5EaF8Bae0e0D`
- **Network:** BNB Smart Chain | **Standard:** BEP-20
- **Contract Hard Cap:** 100,000,000,000 XGT | **Minted at Launch:** 80,000,000,000 XGT | **Burned:** 40,000,000,000 XGT
- **Effective Max Supply:** 60,000,000,000 XGT (40B circulating + 20B mineable)
- **Mining Reserve:** 20,000,000,000 XGT (public proof-of-work only)
- **Ownership:** Fully Renounced
- **Anti-dump protections:** Max transfer 800M XGT | Max wallet 1.6B XGT | 1-hour transfer cooldown
- **Compatible with:** MetaMask, WalletConnect, Trust Wallet - [View on BscScan](https://bscscan.com/token/0x654E38A4516F5476D723D770382A5EaF8Bae0e0D)

#### Arbitrum One (Secondary)
- **Contract:** `0x7B4ac6134C0e7792F5c6c6155240C937d1189736`
- **Network:** Arbitrum One (Ethereum Layer 2) | **Standard:** ERC-20
- **Supply:** 400,000 XGT (independent deployment, separate from BSC supply)
- **Trading:** Camelot DEX - [View on Arbiscan](https://arbiscan.io/token/0x7B4ac6134C0e7792F5c6c6155240C937d1189736)
- **Deployed:** April 20, 2025

---

## Utility and Ecosystem

XGT has defined, functional uses within the Excalibur Global platform. Rewards are distributed automatically by smart contracts with no manual approval required and no administrator able to alter rates or redirect payouts.

### Agricultural Participation Rewards
Farmers earn XGT for registering land on-chain, tokenising harvest batches, and completing verified supply chain handoffs. Batches scoring above 70 on the sustainability index receive a bonus multiplier. Every verified handoff from farm to processor to distributor to retailer generates XGT for the receiving party automatically.

### Proof-of-Work Mining
Any participant can mine XGT using a standard web browser with no specialist hardware required. Rewards range from 1 to 100 XGT per valid proof, subject to a 60-second cooldown. The team cannot mine or issue tokens outside of this public mechanism.

### MRV Platform Access
XGT unlocks premium tiers of the Excalibur Global Land MRV Tool, which produces sustainability reports aligned with IPCC 2019, ISO 14064, Verra, and USDA/EPA frameworks. Tier 1 is free. Tier 2 provides professional verification. Tier 3 includes registry submission support. XGT holding or payment unlocks higher tiers.

### Environmental Monitoring Access
As environmental programs reach on-chain verification milestones across USA, Cameroon, Liberia, and Brazil, XGT will provide access to impact reporting dashboards and reward verified participants in ecosystem monitoring and land restoration activities.

---

## Verification and Transparency

Every on-chain record, token supply figure, and ownership status can be read directly from BNB Smart Chain by any person at any time using a public block explorer. Agricultural data is stored on IPFS and cannot be altered after creation. Consumer product verification requires no wallet, app, or account.

### On-Chain Records (BscScan)
The XGT token contract is source-verified and publicly readable on BscScan. Total supply, ownership status, maximum supply, and initial supply are all confirmable by anyone without logging in. No trust in Excalibur Global is required to verify these facts.

### IPFS Data Permanence
All farm registration documents, harvest records, satellite imagery, and condition reports are stored on IPFS. Only a cryptographic hash of each file is written on-chain. If any file is changed after storage, the hash no longer matches the on-chain record, making tampering immediately detectable. Files are accessible through public IPFS gateways at no cost.

### Chainlink Oracle Verification
Farm GPS boundaries and land classification data are verified automatically using Chainlink oracle jobs connected to Sentinel-2 and Landsat-9 satellite imagery. Scores and land-use classifications are committed to the blockchain within minutes of registration, with no manual step required from Excalibur Global.

### Consumer QR Verification
Every product in the network carries a QR code. When scanned, it displays the farm origin, harvest date, sustainability score, and full custody history directly from BNB Smart Chain. No app, wallet, or account is required. Anomaly flags are permanently visible and cannot be hidden or removed.

---

## System Design

### How It Works in Practice
A farmer registers their land through the Excalibur Global app. Their GPS boundary is verified by satellite and recorded on BNB Smart Chain as a unique NFT. Each harvest is tokenised with a sustainability score. As produce moves through the supply chain, every handoff is recorded on-chain. When the product reaches a retailer, the consumer scans a QR code and reads the full verified provenance directly from the blockchain. The farmer, processor, distributor, and retailer each earn XGT automatically at their respective verified steps. No central party approves or processes these rewards.

### Farms and Harvests as NFTs
Each farm is registered as a unique on-chain identity (ERC-721 NFT) containing GPS boundaries, satellite-verified land classification, and a sustainability score. Each harvest batch is tokenised as a separate NFT with crop type, yield, quality grade, and a full audit trail. These records are permanent and immutable after creation.

### Supply Chain Tracked On-Chain
Custody of produce is transferred on-chain at each handoff. Every step is time-stamped, signed, and publicly readable, creating an unbroken chain of provenance from field to shelf that any party can independently audit.

### Automated Reward Distribution
Five smart contracts manage the platform: FarmRegistry, HarvestBatch, SupplyChain, Verification, and Rewards. All reward amounts, multipliers, daily limits, and cooldowns are written into contract code. No administrator can change these parameters, pause rewards, or redirect funds. Distribution is fully automated and transparent.

### No Central Data Store
XGT is compatible with MetaMask, WalletConnect, Trust Wallet, and any standard BEP-20 wallet. No proprietary app is required. No personal data is stored centrally. All platform data is either on-chain or on IPFS, accessible to anyone.

---

## Key Assurance Statement

**XGT is Immutable, Transparent, and Not Controllable by the Team**

The XGT token contract cannot be modified, upgraded, or paused by any address. Ownership has been fully renounced. The team cannot mint new tokens, alter supply limits, change reward parameters, or access user funds. Every fact stated in this document is independently verifiable on BNB Smart Chain without relying on Excalibur Global as a trusted party.

### For Investors and Exchanges
XGT has a fixed, verifiable supply with no admin mint capability. Ownership is renounced. Supply data, hard cap, and ownership status are all readable directly from the contract on BscScan. No manual verification by Excalibur Global is required or possible.

### For Farmers and Supply Chain Participants
Rewards are distributed automatically for every verified activity. No administrator approves, delays, or intercepts payments. Reward formulas are public, fixed, and cannot be changed after deployment.

### For Regulators and Auditors
All on-chain records are permanent, time-stamped, and publicly accessible. Sustainability assessments follow established government and international frameworks. Third-party audit reports will be published upon completion of environmental program verification.

### For Consumers
Product provenance, sustainability scores, and supply chain history are readable by anyone via QR code scan with no app, wallet, or login. Records cannot be altered or removed after they are committed to the blockchain.

---

## Platform Metrics

| Metric | Value |
|--------|-------|
| Core Smart Contracts (Source-Verified) | 5 |
| Countries with Active Deployment | 4 |
| SaaS Platform Tiers | 3 (Free to Enterprise) |
| Estimated CO2 Environmental Impact | 2M+ Tons |

---

## Development Roadmap

- **COMPLETE:** Token Launch and Ownership Renounced - BEP-20 deployed on BSC, ownership renounced, public proof-of-work mining live on PancakeSwap.
- **COMPLETE:** Land MRV Tool (Production) - Government-methodology-compliant sustainability assessment covering 18 crop types, IPCC 2019, ISO 14064, and USDA/EPA frameworks. PDF and Google Sheets export live.
- **COMPLETE:** Arbitrum One Deployment - Secondary ERC-20 deployment on Arbitrum One. Trading live on Camelot DEX.
- **IN PROGRESS:** Agricultural Traceability Protocol - Farm Identity NFTs, Harvest Batch tokenisation, and supply chain handoff contracts. Baseline data collection active in USA, Cameroon, Liberia, and Brazil.
- **IN PROGRESS:** Blue Carbon and Marine Monitoring Tool - Marine database covering 10,000+ species with oxygen production and ecosystem health analysis. Planning phase complete.
- **PLANNED:** Environmental Asset Platform - On-chain issuance of Verra-aligned environmental impact certificates. Accessible to corporate sustainability buyers and registry auditors.
- **PLANNED:** Global Certification and Expansion - Official Verra or Gold Standard certification. Consumer QR verification live at retail. Expansion to additional geographies.

---

All system operations, rewards, and supply constraints are enforced directly by smart contracts and can be independently verified on-chain.

---

## Official Links and Verification

### Website and Community
- [excaliburglobal.farm](https://excaliburglobal.farm)
- [Twitter: @XGTToken](https://twitter.com/XGTToken)
- [GitHub: LuisReis51/XGT-Token](https://github.com/LuisReis51/XGT-Token)
- Email: contact@excaliburglobal.farm

### Contract Verification and Trading
- [BSC Token on BscScan](https://bscscan.com/token/0x654E38A4516F5476D723D770382A5EaF8Bae0e0D)
- [Arbitrum Token on Arbiscan](https://arbiscan.io/token/0x7B4ac6134C0e7792F5c6c6155240C937d1189736)
- [Trade on PancakeSwap](https://pancakeswap.finance)
- [Trade on Camelot DEX](https://camelot.exchange)

---

## Contact Information

**Luis Reis - Founder**
Excalibur Global Trading USA LLC
Email: contact@excaliburglobal.farm
Phone: +1 219 669-1206
Website: [excaliburglobal.farm](https://excaliburglobal.farm)

---

## Legal Disclaimers

**Regulatory Notice:** XGT is a utility token whose value derives from platform access and ecosystem participation. This whitepaper does not constitute an offer to sell or solicitation to buy securities. XGT has not been registered with the SEC or any regulatory body. Cryptocurrency tokens are highly volatile. All participants should conduct independent research and consult qualified advisors before acquiring any digital asset.

**Environmental Impact Verification:** All environmental regeneration claims and tonnage estimates are based on projects in development and subject to independent third-party verification per Verra VCS methodologies (VM0007, VM0015, VM0033, VM0042) and Gold Standard protocols. Actual verified impact figures may differ from projections.

**Company Initiatives:** Environmental projects described here are Excalibur Global company activities only. These initiatives are not connected to XGT token rights or obligations. All figures are estimates.

**Risk Disclosure:** Cryptocurrency investments carry substantial risk of loss. Regulatory changes may impact token utility and value. Technology risks include smart contract vulnerabilities and blockchain network issues.

---

&copy; 2026 Excalibur Global Trading USA LLC. All rights reserved.
Version 2.0 | Last Updated: March 2026
