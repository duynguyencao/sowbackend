import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

function formatToParagraphs(source) {
  if (!source) return '';
  const text = String(source).trim();
  if (!text) return '';
  // Prefer explicit blank lines as paragraph separators
  if (/\n/.test(text)) {
    return text
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(p => p)
      .map(p => `<p>${p}</p>`)
      .join('');
  }
  // Otherwise, split on sentence boundaries: punctuation followed by a capital letter
  const normalized = text.replace(/\s+/g, ' ');
  const parts = normalized.split(/(?<=[.!?])\s+(?=[A-ZÅÄÖÉ])/);
  return parts
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${p}</p>`)
    .join('');
}

const TermsContent = sequelize.define('TermsContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  content_html_en: {
    type: DataTypes.VIRTUAL,
    get() {
      const raw = this.getDataValue('content_en');
      return formatToParagraphs(raw);
    }
  },
  content_html_sv: {
    type: DataTypes.VIRTUAL,
    get() {
      const raw = this.getDataValue('content_sv');
      return formatToParagraphs(raw);
    }
  }
}, {
  tableName: 'terms_content',
  timestamps: true
});

export default TermsContent;

