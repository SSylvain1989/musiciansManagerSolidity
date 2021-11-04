const MusiciansManager = artifacts.require("./MusiciansManager");

contract('MusiciansManager', accounts => {
 it('should add a musician', async () => {
  const Contract = await MusiciansManager.deployed();
  // la fonction doit s'écrire exactement de la même façon que sur le contrat " addMusician" va fonctionner "addmusician" NON
  const result = await Contract.addMusician
  // on met les mêmes parametres que dans notre fonction de notre smart contract
  ("0x2a74497791663234553e45922812631c1eef3017",
   "John",
   // account zero represente le proprietaire du contract
   { from: accounts[0] });
  assert.equal(result.logs[0].args._artistName, "John", "not equal to john");
 })

 it('should not add a musician who already exist', async () => {
  const Contract = await MusiciansManager.deployed();
  let err = null;
  try {
   await Contract.addMusician
   // on met les mêmes parametres que dans notre fonction de notre smart contract
   ("0x2a74497791663234553e45922812631c1eef3017",
    "John2",
    // account zero represente le proprietaire du contract
    { from: accounts[0] });
  }
  catch (error) {
    err = error;
  }
  assert.ok(err instanceof Error);
 })

 it('should add a track', async () => {
  const Contract = await MusiciansManager.deployed();
  const result = await Contract.addTrack
  // on met les mêmes parametres que dans notre fonction de notre smart contract
  ("0x2a74497791663234553e45922812631c1eef3017",
   "titleTrack",
   345,
   // account zero represente le proprietaire du contract
   { from: accounts[0] });
  assert.equal(result.logs[0].args._title, "titleTrack", "not equal to titleTrack");
 })

 it('should not add a track to an unknow musician', async () => {
  const Contract = await MusiciansManager.deployed();
  let err = null;
  try {
   await Contract.addTrack
   // on met les mêmes parametres que dans notre fonction de notre smart contract
   // ce compte ci-dessous n'a jamais était assigné à un artiste
   ("0x18468b53fb6620c16700d6af8645617287bdd0f9",
    "titleTrack2",
    345,
    // account zero represente le proprietaire du contract
    { from: accounts[0] });
  }
  catch (error) {
    err = error;
  }
  assert.ok(err instanceof Error);
 })

 it('should get the tracks of an artist', async () => {
  const Contract = await MusiciansManager.deployed();
  const result = await Contract.getTracks
  // on met les mêmes parametres que dans notre fonction de notre smart contract
  ("0x2a74497791663234553e45922812631c1eef3017",
   // account zero represente le proprietaire du contract
   // mais ici c'est pas obligatoire puisque la fonction dans le smart contract n'est pas defini avec ce require
   { from: accounts[0] });
   // ici on est censé recuperer un tableau
   // Array.isArray permet de tester qu'on recupere bien un array
  assert.ok(Array.isArray(result.logs[0].args._tracks))
 })

})