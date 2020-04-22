module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'minu',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
