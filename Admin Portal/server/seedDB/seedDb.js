const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Issue = require('../models/issue'); // Adjust path if needed

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

const seedIssues = async () => {
  await connectDB();

  try {
    // Step 1: Clear all existing issues
    await Issue.deleteMany();
    console.log('Previous issues destroyed...');

    // Step 2: Define the new issues (openedBy is now null)
    const issuesToSeed = [
      {
        issueName: 'Large Pothole on Main Street',
        issueClassification: 'potholes',
        assignedTo: 'PWD',
        description: 'A very large and dangerous pothole has formed near the main intersection.',
        imageUrl: 'https://www.shutterstock.com/shutterstock/photos/1488058778/display_1500/stock-photo-large-potholes-in-a-broken-tarmac-road-filled-with-muddy-rainwater-copy-space-area-for-1488058778.jpg',
        status: 'open',
        openedBy: null,
      },
      // --- NEW PWD ISSUE ---
      {
        issueName: 'Cracked Road Surface on 2nd Ave',
        issueClassification: 'broken_roads',
        assignedTo: 'PWD',
        description: 'The entire surface of the road on 2nd Avenue is cracked and uneven, making it difficult for vehicles.',
        imageUrl: 'https://images.unsplash.com/photo-1515224524259-a48cb360b355?w=800',
        status: 'open',
        openedBy: null,
      },
      // --- NEW PWD ISSUE ---
      {
        issueName: 'Faded Zebra Crossing at School',
        issueClassification: 'road_markings',
        assignedTo: 'PWD',
        description: 'The zebra crossing lines in front of the public school are almost completely faded and need repainting urgently.',
        imageUrl: 'https://images.unsplash.com/photo-1582035909495-12a02b48a230?w=800',
        status: 'open',
        openedBy: null,
      },
      {
        issueName: 'Garbage Bin Overflowing at Park Entrance',
        issueClassification: 'overflowing_garbage_bins',
        assignedTo: 'Sanitation Dept',
        description: 'The main garbage bin at the entrance of City Park has been overflowing for three days.',
        imageUrl: 'https://images.unsplash.com/photo-1611289333887-87a6c075a3a2?w=800',
        status: 'open',
        openedBy: null,
      },
      {
        issueName: 'Traffic Light Stuck on Red',
        issueClassification: 'broken_traffic_signals',
        assignedTo: 'Traffic Police',
        description: 'The traffic light at the corner of 5th and Elm is stuck on red, causing major traffic jams.',
        imageUrl: 'https://images.unsplash.com/photo-1579543944353-8d2a4f63d5a4?w=800',
        status: 'open',
        openedBy: null,
      },
      // --- NEW PWD ISSUE ---
      {
        issueName: 'Multiple Potholes on Industrial Road',
        issueClassification: 'potholes',
        assignedTo: 'PWD',
        description: 'The road leading to the industrial park is filled with potholes, slowing down heavy vehicle traffic.',
        imageUrl: 'https://images.unsplash.com/photo-1618063994509-687a383d4e41?w=800',
        status: 'closed',
        openedBy: null,
      },
      {
        issueName: 'Street Light Out on Residential Block',
        issueClassification: 'street_light_not_working',
        assignedTo: 'Municipal Lighting Division',
        description: 'The streetlight in front of 123 Oak Lane is out, making the area very dark.',
        imageUrl: 'https://images.unsplash.com/photo-1618512212628-b997177a61dc?w=800',
        status: 'closed',
        openedBy: null,
      },
      {
        issueName: 'Illegal Waste Dumping behind Supermarket',
        issueClassification: 'illegal_dumping',
        assignedTo: 'Health/Sanitation Wing',
        description: 'Construction debris and other waste have been illegally dumped in the alley.',
        imageUrl: 'https://images.unsplash.com/photo-1582542542426-8692488e7b39?w=800',
        status: 'open',
        openedBy: null,
      },
    ];

    // Step 3: Insert the new issues into the database
    await Issue.insertMany(issuesToSeed);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during seeding: ${error}`);
    process.exit(1);
  }
};

const destroyIssues = async () => {
    await connectDB();
    try {
        await Issue.deleteMany();
        console.log('All issues destroyed.');
        process.exit();
    } catch (error) {
        console.error(`Error during data destruction: ${error}`);
        process.exit(1);
    }
}

// Script Execution Logic remains the same
if (process.argv[2] === '-d') {
  destroyIssues();
} else {
  seedIssues();
}