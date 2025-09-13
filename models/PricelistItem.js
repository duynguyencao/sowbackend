import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const PricelistItem = sequelize.define('PricelistItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  article_no: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  product_service: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  in_price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  vat: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 25.00
  },
  unit: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  in_stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  sort_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'pricelist_items',
  timestamps: true,
  indexes: [
    { fields: ['category'] },
    { fields: ['sort_order'] },
    { fields: ['is_active'] }
  ]
});

export default PricelistItem;

