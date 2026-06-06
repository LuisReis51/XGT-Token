<<<<<<< HEAD
# XG Token (XGT) - Dual-Mining Protocol on BSC

## Overview
XG Token (XGT) is a minable BEP-20 token on BNB Smart Chain that combines utility token features with public proof-of-work mining. XGT serves as the utility token for Excalibur Global Trading USA LLC's ecosystem.

## Token Information
- **Name:** XG Token (XGT)
- **Network:** BNB Smart Chain (BSC)
- **Standard:** BEP-20
- **Contract:** `0x654E38A4516F5476D723D770382A5EaF8Bae0e0D`
- **Contract Hard Cap:** 100,000,000,000 XGT (enforced in code)
- **Circulating Supply:** 40,000,000,000 XGT
- **Burned (never minted):** 40,000,000,000 XGT
- **Reserved for Mining:** 20,000,000,000 XGT (public PoW only)
- **Effective Max Supply:** 60,000,000,000 XGT
- **Ownership:** Fully Renounced (owner set to 0x0 address)
- **Trading:** PancakeSwap (BSC), Camelot DEX (Arbitrum)
- **Mining:** Browser-based proof-of-work
- **Contact:** contact@excaliburglobal.farm

## Supply Breakdown

| Category | Amount | Notes |
|----------|--------|-------|
| Contract Hard Cap | 100B | Immutable constant in code |
| Minted at Launch | 80B | Initial deployment |
| Burned (unmintable) | 40B | Ownership renounced before minting |
| Circulating | 40B | Active supply |
| Mining Reserve | 20B | Released via public PoW only |
| Effective Max Supply | 60B | 40B circulating + 20B mineable |

## Ownership Renounced

Contract ownership is set to the zero address (`0x0000000000000000000000000000000000000000`). No wallet, including the original deployer, can call owner-restricted functions. The remaining 40B of mintable supply can never be created, making the effective cap 60B permanent and irreversible.

Verifiable on BSCScan: Read Contract > `owner()` returns `0x0000000000000000000000000000000000000000`

## Token Features

### Mining
- Browser-based proof-of-work mining interface
- No special hardware required
- Fair distribution - anyone can mine
- `mine()` function callable by any address
- Block rewards distributed directly to miner wallet

### Trading
- Listed on PancakeSwap (BSC)
- Listed on Camelot DEX (Arbitrum)
- Low transaction fees

### Security
- Contract verified on BSCScan
- Ownership fully renounced
- No owner mint function exists
- Immutable hard cap enforced in code
- All privileged functions permanently inaccessible

## How to Get XGT

### Buy on PancakeSwap
- Visit: https://pancakeswap.finance/swap?outputCurrency=0x654E38A4516F5476D723D770382A5EaF8Bae0e0D
- Connect your wallet
- Swap BNB for XGT

### Mining
- Visit the mining interface at https://xgt.token.excaliburglobal.farm/en/mining
- Connect your BSC wallet
- Start mining XGT

## Resources
- **Website:** [xgt.token.excaliburglobal.farm](https://xgt.token.excaliburglobal.farm/en/)
- **Whitepaper:** [XGT Whitepapers](https://xgt.token.excaliburglobal.farm/en/xgt-whitepapers/)
- **BSCScan:** [Token Page](https://bscscan.com/token/0x654E38A4516F5476D723D770382A5EaF8Bae0e0D)
- **PancakeSwap:** [Trade XGT](https://pancakeswap.finance/swap?outputCurrency=0x654E38A4516F5476D723D770382A5EaF8Bae0e0D)

## Contact
- **Founder:** Luis Reis
- **Company:** Excalibur Global Trading USA LLC
- **Email:** contact@excaliburglobal.farm
- **Website:** [excaliburglobal.farm](https://excaliburglobal.farm)
- **Twitter:** [@XGTToken](https://x.com/XGTToken)

## Legal
XGT is a utility token. This document is not a prospectus and does not constitute an offer of financial instruments. Token holders have no equity, revenue share, or governance rights in Excalibur Global Trading USA LLC. Always do your own research (DYOR).

>>>>>>> 44ed4c13d77dfcfadf369431e84de58e0965b3ce
