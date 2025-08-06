const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bogartfashion',
  port: 3310
};

async function createAdminUser() {
  let connection;
  
  try {
    // Connect to database
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully');

    // Admin user details
    const adminUser = {
      username: 'admin',
      email: 'dev.ocean159@gmail.com',
      password: '123456',
      role: 'admin'
    };

    // Hash the password
    const hashedPassword = bcrypt.hashSync(adminUser.password, 10);

    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT user_id FROM users WHERE email = ?',
      [adminUser.email]
    );

    if (existingUsers.length > 0) {
      console.log('Admin user already exists with email:', adminUser.email);
      
      // Update existing user to admin role
      await connection.execute(
        'UPDATE users SET role = ? WHERE email = ?',
        [adminUser.role, adminUser.email]
      );
      console.log('Updated existing user to admin role');
    } else {
      // Insert new admin user
      const [result] = await connection.execute(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [adminUser.username, adminUser.email, hashedPassword, adminUser.role]
      );
      console.log('Admin user created successfully with ID:', result.insertId);
    }

    console.log('\n✅ Admin user created/updated successfully!');
    console.log('Email:', adminUser.email);
    console.log('Password:', adminUser.password);
    console.log('Role: admin');
    console.log('\nYou can now login to the admin panel with these credentials.');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the script
createAdminUser(); 