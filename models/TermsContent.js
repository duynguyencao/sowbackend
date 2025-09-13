import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TermsContent = sequelize.define('TermsContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Section identifier (e.g., "introduction", "privacy", "cookies")'
  },
  title_en: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  title_sv: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content_en: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content_sv: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  order: {
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
  tableName: 'terms_content',
  timestamps: true,
  indexes: [
    {
      fields: ['section', 'is_active']
    },
    {
      fields: ['order']
    }
  ]
});

export default TermsContent;

