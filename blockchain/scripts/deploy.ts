import hre from "hardhat";
import CharacterModule from "../ignition/modules/Character";
import fs from "fs";
async function main() {
  const { characterNFT } = await hre.ignition.deploy(CharacterModule);

  const abi = hre.artifacts.readArtifactSync("CharacterNFT").abi;
  const address = await characterNFT.getAddress();
  // Generate the TypeScript file content
  const content = `
    export const ContractABI = ${JSON.stringify(abi)} as const;
    export const ContractAddress = "${address}";
  `;
  // Write the content to the contract.ts file
  fs.writeFileSync("../frontend/src/config/contract.ts", content, "utf8");
}

main().catch(console.error);
