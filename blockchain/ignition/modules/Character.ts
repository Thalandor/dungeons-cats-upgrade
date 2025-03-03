import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import fs from "fs";

const CharacterNFTModule = buildModule("CharacterNFTModule", (m) => {
  const characterNFT = m.contract("CharacterNFT");

  return { characterNFT };
});

export default CharacterNFTModule;
