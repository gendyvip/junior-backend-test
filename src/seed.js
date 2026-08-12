require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/User');

async function ensureUser({ username, password, role }) {
  const existing = await User.findOne({ username });

  if (existing) {
    console.log(`${role} already exists: ${username}`);
    return;
  }

  await User.create({ username, password, role });
  console.log(`${role} created: ${username} / ${password}`);
}

async function seed() {
  try {
    await connectDB();

    await ensureUser({
      username: 'admin',
      password: 'admin123',
      role: 'admin',
    });

    await ensureUser({
      username: 'user',
      password: 'user123',
      role: 'user',
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
