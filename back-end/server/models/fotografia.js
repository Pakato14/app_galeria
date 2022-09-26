'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fotografia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fotografia.init({
    fotografia: DataTypes.STRING,
    description: DataTypes.STRING,
    imagem: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    autor: DataTypes.STRING,
    activo: DataTypes.BOOLEAN,
    usuario_creaction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fotografia',
  });
  return fotografia;
};