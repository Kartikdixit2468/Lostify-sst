const { getUser, createUser } = require('./db');
const { hashPassword } = require('./auth');

async function seedAdminUser() {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminUsername || !adminPassword || !adminEmail) {
    console.error('❌ FATAL: Admin credentials not configured!');
    console.error('Please set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_EMAIL environment variables.');
    process.exit(1);
  }

  try {
    const existingAdmin = await getUser(adminUsername);
    
    if (!existingAdmin) {
      console.log('🔐 Seeding admin user...');
      const passwordHash = await hashPassword(adminPassword);
      const adminData = {
        username: adminUsername,
        email: adminEmail,
        passwordHash,
        isAdmin: true,
        createdAt: new Date().toISOString()
      };
      
      await createUser(adminData);
      console.log(`✅ Admin user created: ${adminUsername}`);
      console.log('⚠️  Please change the admin password after first login!');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}

module.exports = { seedAdminUser };
