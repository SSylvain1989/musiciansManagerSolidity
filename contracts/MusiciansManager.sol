// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MusiciansManager {

  event musicianCreated(string _artistName);
  event trackAdded(string _artistName, string _title);
  event getTheTracks(Track[] _tracks);

  struct Track {
    string _title;
    uint _duration;
  }
  struct Musician {
    string _artistName;
    Track[] _tracks;
  }

  mapping(address => Musician) Musicians;

  address owner;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner,"Not the owner");
    _;
  }

  // on check qu'on est bien le manager du contract avec onlyOwner
  // une fonction peut soit être external soit public 
  // public peut aussi être appellé depuis l'intérieur du contrat intelligent, external pas
  // Est-ce nécessaire de l'appeller depuis l'intérieur ? ici non ...
  function addMusician(address _musicianAddress, string memory _artistName) external onlyOwner {
    // on stock la nouvelle adresse du nouveau musician dans une variable bytes 
    // bytes memory addressOfMusician = bytes(Musicians[_musicianAddress]._artistName);
    // ** ou en plus court ** 
    // on check directement si le musician existe pas déjà
    require(bytes(Musicians[_musicianAddress]._artistName).length == 0,"ce musician existe deja");
    // on ajoute le nom du musician en suivant la structure 
    Musicians[_musicianAddress]._artistName = _artistName;
    // on emet l'event comme quoi on a créé le musician
    emit musicianCreated(_artistName);
    }

  function addTrack(address _musicianAddress, string memory _title, uint _duration) external onlyOwner {
        // on check directement si le musician existe ( à la différence de plus haut où on check s'il existe pas déjà)
        require(bytes(Musicians[_musicianAddress]._artistName).length > 0,"ce musician n'existe pas");
        // on créé la structure track pour rajouter notre nouveau titre et temps de chanson 
        // on stock les informations rentré par le manager du contrat dans une variable 
        Track memory thisTrack = Track(_title, _duration);
        // on ajoute 
        Musicians[_musicianAddress]._tracks.push(thisTrack);
        // on emet l'event comme quoi on a ajouté une musique à un musician 
        emit trackAdded(Musicians[_musicianAddress]._artistName, _title);
  }

    // ici on emet just un event qui va lire selon l'address du musician les tracks qu'il possede
  function getTracks (address _musicianAddress) external {
    emit getTheTracks(Musicians[_musicianAddress]._tracks);
  }
}
