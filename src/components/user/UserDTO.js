module.exports.UserDTO = class UserDTO {

  id;
  email;
  password;
  family;
  name;
  father;
  birthDate;
  city;
  img;
  isPlayer;
  playerId;

  constructor(props) {
    this.id = props?.id;
    this.email = props?.email;
    this.password = '';
    this.family = props?.family;
    this.name = props?.name;
    this.father = props?.father;
    this.birthDate = props?.birth_date;
    this.city = props?.city;
    this.img = props?.img;
    this.isPlayer = props?.is_player;
    this.playerId = props?.player_id;
  }
};