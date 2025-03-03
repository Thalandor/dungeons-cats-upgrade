// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "hardhat/console.sol";

contract CharacterNFT is ERC721Enumerable {
    struct Stats {
        uint16 strength;
        uint16 dexterity;
        uint16 constitution;
        uint16 intelligence;
        uint16 wisdom;
        uint16 charisma;
    }

    struct Character {
        string name;
        string portrait;
        string skin;
        Stats stats;
        uint price;
        uint tokenId;
    }

    mapping(uint => Character) tokenCharacter;

    Character[] public characters;

    event CharacterCreated(
        string name,
        address indexed creator,
        uint256 price,
        uint tokenId
    );
    event CharacterBought(address indexed buyer, string name);
    event CharacterAbandoned(string name);

    constructor() ERC721("CharacterNFT", "CNFT") {
        createCharacter(
            "Barbarian",
            "./barbarian_portrait.png",
            "./barbarian_skin.jpg",
            5,
            3,
            4,
            2,
            2,
            2
        );
        createCharacter(
            "Bard",
            "./bard_portrait.jpg",
            "./bard_skin.gif",
            3,
            4,
            3,
            4,
            2,
            5
        );
        createCharacter(
            "Cleric",
            "./cleric_portrait.png",
            "./cleric_skin.gif",
            4,
            2,
            4,
            3,
            5,
            2
        );
        createCharacter(
            "Rogue",
            "./rogue_portrait.png",
            "./rogue_skin.jpg",
            3,
            5,
            2,
            3,
            3,
            3
        );
        createCharacter(
            "Wizard",
            "./wizard_portrait.png",
            "./wizard_skin.png",
            2,
            2,
            2,
            5,
            4,
            3
        );
    }

    function createCharacter(
        string memory name,
        string memory portrait,
        string memory skin,
        uint16 strength,
        uint16 dexterity,
        uint16 constitution,
        uint16 intelligence,
        uint16 wisdom,
        uint16 charisma
    ) public {
        uint supply = totalSupply();
        super._mint(address(this), supply);
        Stats memory stats;
        stats.strength = strength;
        stats.dexterity = dexterity;
        stats.constitution = constitution;
        stats.intelligence = intelligence;
        stats.wisdom = wisdom;
        stats.charisma = charisma;
        tokenCharacter[supply] = Character(
            name,
            portrait,
            skin,
            stats,
            1 gwei,
            supply
        );
        characters.push(tokenCharacter[supply]);
        emit CharacterCreated(name, msg.sender, 1 gwei, supply);
    }

    function buyCharacter(uint tokenId) public payable {
        require(tokenCharacter[tokenId].price != 0, "Token does not exist");
        require(
            tokenCharacter[tokenId].price == msg.value,
            "Value sent and price are not the same"
        );
        address owner = ownerOf(tokenId);
        super._transfer(owner, msg.sender, tokenId);
        bool sent = payable(owner).send(msg.value);
        require(sent, "Failed to send Ether");
        emit CharacterBought(msg.sender, tokenCharacter[tokenId].name);
    }

    function abandonCharacter(uint tokenId) public {
        address owner = ownerOf(tokenId);
        require(
            owner == msg.sender,
            "You can only abandon your own characters"
        );
        super._transfer(owner, address(this), tokenId);
        emit CharacterAbandoned(tokenCharacter[tokenId].name);
    }

    function getOwnedCharacters() public view returns (Character[] memory) {
        uint tokens = balanceOf(msg.sender);
        Character[] memory ownedCharacters = new Character[](tokens);
        for (uint i = 0; i < tokens; ++i) {
            uint tokenId = tokenOfOwnerByIndex(msg.sender, i);
            Character memory character = tokenCharacter[tokenId];
            ownedCharacters[i] = character;
        }
        return ownedCharacters;
    }

    function getAllCharacters() public view returns (Character[] memory) {
        return characters;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
