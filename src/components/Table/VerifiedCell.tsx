import GeneralTableCell from "./GeneralTableCell";
import {Stack} from "@mui/material";
import StyledTooltip from "../StyledTooltip";
import {
  Dangerous,
  DangerousOutlined,
  Verified,
  VerifiedUser,
  Warning,
  WarningAmberOutlined,
} from "@mui/icons-material";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import * as React from "react";

type VerifiedCellProps = {
  id: string; // FA address or Coin Type
  known: boolean;
  isBanned?: boolean;
  isInPanoraTokenList?: boolean;
};

export enum VerifiedType {
  NATIVE_TOKEN, // Native token e.g. APT
  LABS_VERIFIED, // Specifically verified by labs
  COMMUNITY_VERIFIED, // Verified by Panora
  UNVERIFIED, // In panora list but not verified
  COMMUNITY_BANNED, // Banned by Panora
  LABS_BANNED, // Banned by labs
  UNKNOWN, // Not in panora list, could be anything
}

export function isBannedType(level: VerifiedType): boolean {
  return (
    level === VerifiedType.COMMUNITY_BANNED ||
    level === VerifiedType.LABS_BANNED
  );
}

const nativeTokens: Record<string, string> = {
  "0x1::aptos_coin::AptosCoin": "nxBTC",
  "0xa": "nxBTC",
  "0xA": "nxBTC",
};
const labsVerifiedTokens: Record<string, string> = {
  "0xd39fcd33aedfd436a1bbb576a48d5c7c0ac317c9a9bb7d53ae9ffb41e8cb9fd9":
    "Find Out Points",
};
const MARKED_AS_SCAM = "Marked as scam";
const labsBannedTokens: Record<string, string> = {
  "0x397071c01929cc6672a17f130bd62b1bce224309029837ce4f18214cc83ce2a7::USDC::USDC":
    MARKED_AS_SCAM,
  "0x50788befc1107c0cc4473848a92e5c783c635866ce3c98de71d2eeb7d2a34f85::apt_rewards::APTRewards":
    MARKED_AS_SCAM,
  "0xbbc4a9af0e7fa8885bda5db08028e7b882f2c2bba1e0fedbad1d8316f73f8b2f::ograffio::Ograffio":
    MARKED_AS_SCAM,
  "0xf658475dc67a4d48295dbcea6de1dc3c9af64c1c80d4161284df369be941dafb::moon_coin::MoonCoin":
    MARKED_AS_SCAM,
  "0x48327a479bf5c5d2e36d5e9846362cff2d99e0e27ff92859fc247893fded3fbd::APTOS::APTOS":
    MARKED_AS_SCAM,
  "0xbc106d0fef7e5ce159423a1a9312e011bca7fb57f961146a2f88003a779b25c2::QUEST::QUEST":
    MARKED_AS_SCAM,
  "0xbe5e8fa9dd45e010cadba1992409a0fc488ca81f386d636ba38d12641ef91136::maincoin::Aptmeme":
    MARKED_AS_SCAM,
};

export type VerifiedLevelInfo = {
  level: VerifiedType;
  reason?: string;
};

export function verifiedLevel(input: VerifiedCellProps): VerifiedLevelInfo {
  if (nativeTokens[input.id]) {
    return {
      level: VerifiedType.NATIVE_TOKEN,
    };
  } else if (labsVerifiedTokens[input.id]) {
    return {
      level: VerifiedType.LABS_VERIFIED,
    };
  } else if (labsBannedTokens[input.id]) {
    return {
      level: VerifiedType.LABS_BANNED,
      reason: labsBannedTokens[input.id],
    };
  } else if (input?.isBanned) {
    return {
      level: VerifiedType.COMMUNITY_BANNED,
      // TODO: Add a reason?
    };
  } else if (input?.isInPanoraTokenList) {
    return {
      level: VerifiedType.COMMUNITY_VERIFIED,
    };
  } else if (input?.known) {
    return {
      level: VerifiedType.UNVERIFIED,
    };
  } else {
    return {
      level: VerifiedType.UNKNOWN,
    };
  }
}

export function VerifiedAsset({data}: {data: VerifiedCellProps}) {
  const {level, reason} = verifiedLevel(data);

  let tooltipMessage = "";
  let icon = null;
  switch (level) {
    case VerifiedType.NATIVE_TOKEN:
      tooltipMessage = `This asset is verified as a native token of Aptos. (${reason})`;
      icon = <VerifiedUser fontSize="small" />;
      break;
    case VerifiedType.LABS_VERIFIED:
      tooltipMessage = `This asset is verified. (${reason})`;
      icon = <Verified fontSize="small" />;
      break;
    case VerifiedType.COMMUNITY_VERIFIED:
      tooltipMessage =
        "This asset is verified by the community on the Panora token list.";
      icon = <VerifiedOutlined fontSize="small" />;
      break;
    case VerifiedType.UNVERIFIED:
      tooltipMessage =
        "This asset is recognized, but not been verified by the community.";
      icon = <Warning fontSize="small" />;
      break;
    case VerifiedType.UNKNOWN:
      tooltipMessage =
        "This asset is not verified, it may or may not be recognized by the community.";
      icon = <WarningAmberOutlined fontSize="small" />;
      break;
    case VerifiedType.COMMUNITY_BANNED:
      tooltipMessage =
        "This asset has been banned on the Panora token list, please use with caution.";
      icon = <DangerousOutlined fontSize="small" />;
      break;
    case VerifiedType.LABS_BANNED:
      tooltipMessage = `This asset has been marked as a scam or dangerous, please proceed with caution. (${reason})`;
      icon = <Dangerous fontSize="small" />;
      break;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <StyledTooltip title={tooltipMessage}>{icon}</StyledTooltip>
    </Stack>
  );
}

export function VerifiedCoinCell({data}: {data: VerifiedCellProps}) {
  return (
    <GeneralTableCell
      sx={{
        textAlign: "left",
      }}
    >
      <VerifiedAsset data={data} />
    </GeneralTableCell>
  );
}
