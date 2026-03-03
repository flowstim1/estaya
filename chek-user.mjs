import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '.env.local') });

async function checkUser() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const users = await db.collection('users').find({}).toArray();
    
    console.log(`\n📊 Total users: ${users.length}`);
    console.log('\n👤 Users in database:');
    users.forEach((user, i) => {
      console.log(`${i + 1}. ${user.email} - ${user.name || 'No name'}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkUser();