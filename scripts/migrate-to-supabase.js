/**
 * Migration script to upload cue data and images to Supabase
 *
 * Prerequisites:
 * 1. Run the SQL schema in Supabase SQL Editor first
 * 2. Create a storage bucket named 'cue-images' and make it public
 * 3. Set SUPABASE_SECRET_KEY environment variable
 *    (Use secret key for migration - format: sb_secret_...)
 *    Find it in: Supabase Dashboard > Project Settings > API Keys
 *
 * Usage:
 *   export SUPABASE_SECRET_KEY="sb_secret_..."
 *   npm run migrate
 */

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - use secret key for migration (new 2025 format: sb_secret_...)
const SUPABASE_URL = process.env.SUPABASE_URL || "https://gphhckptzkwryjjjcltk.supabase.co";
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_SECRET_KEY) {
  console.error("Error: SUPABASE_SECRET_KEY environment variable is required");
  console.error("Get your secret key from Supabase Dashboard > Project Settings > API Keys");
  console.error('Look for the "Secret key" (format: sb_secret_...)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

const STORAGE_BUCKET = "cue-images";
const PUBLIC_DIR = path.join(__dirname, "..", "public");

// Designs data
const designs = [
  {
    id: "anniversary",
    title: "20th Anniversary",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "florentine",
    title: "Florentine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "venetian",
    title: "Venetian",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "victorian-crown",
    title: "Victorian Crown",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "deco",
    title: "Deco",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "royal",
    title: "Royal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "silver-smoke",
    title: "Silver Smoke",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "engrave",
    title: "Engrave",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "regal",
    title: "Regal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "points-interrupted",
    title: "Point Interrupted",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "six-points",
    title: "Six Point",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "ivory-crown",
    title: "Ivory Crown",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "map",
    title: "Texas Road Map",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "aztec",
    title: "Aztec",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "pinnacle",
    title: "Pinnacle",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "feather",
    title: "Feather",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "razor",
    title: "Razor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "ten-point-crown",
    title: "10 Point Crown",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "details",
    title: "Details",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "squares",
    title: "Squares",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "ptolemy",
    title: "Ptolemy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "victorian",
    title: "Victorian",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "carnaval",
    title: "Carnaval",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "feather-crown",
    title: "Feather Crown",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "spaniard",
    title: "Spaniard",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "piano",
    title: "Piano",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "origami",
    title: "Origami",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "west-palm",
    title: "West Palm",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

// Regular cues (with multiple images)
const cues = [
  { id: 202, designId: "anniversary", highlight: true },
  { id: 2335, designId: "florentine" },
  { id: 2334, designId: "florentine" },
  { id: 2311, designId: "royal" },
  { id: 2333, designId: "royal" },
  { id: 2312, designId: "silver-smoke" },
  { id: 2337, designId: "venetian" },
  { id: 2323, designId: "venetian" },
  { id: 2290, designId: "venetian" },
  { id: 2332, designId: "deco" },
  { id: 2287, designId: "deco" },
  { id: 2336, designId: "regal" },
  { id: 2329, designId: "points-interrupted" },
  { id: 2302, designId: "points-interrupted" },
  { id: 2318, designId: "victorian-crown", highlight: true },
  { id: 2341, designId: "victorian-crown" },
  { id: 2291, designId: "silver-smoke" },
  { id: 2293, designId: "six-points" },
  { id: 2340, designId: "ivory-crown" },
  { id: 2300, designId: "engrave" },
  { id: 1710, designId: "map" },
  { id: 2047, designId: "deco", highlight: true },
  { id: 208, designId: "anniversary" },
  { id: 2051, designId: "aztec" },
  { id: 2326, designId: "pinnacle" },
  { id: 1790, designId: "feather" },
];

// Past cues (with single image)
const pastCues = [
  { id: 1163, designId: "ivory-crown", ext: "jpg" },
  { id: 1167, designId: "razor", ext: "jpg" },
  { id: 1169, designId: "ten-point-crown", ext: "jpg" },
  { id: 1174, designId: "ivory-crown", ext: "jpg" },
  { id: 1246, designId: "feather-crown", ext: "jpg" },
  { id: 1250, designId: "details", ext: "jpg" },
  { id: 1252, designId: "ivory-crown", ext: "jpg" },
  { id: 1281, designId: "squares", ext: "jpg" },
  { id: 1287, designId: "ptolemy", ext: "jpg" },
  { id: 1290, designId: "victorian", ext: "jpg" },
  { id: 1444, designId: "victorian", ext: "jpg" },
  { id: 1449, designId: "pinnacle", ext: "jpg" },
  { id: 1453, designId: "carnaval", ext: "jpg" },
  { id: 1463, designId: "feather-crown", ext: "jpg" },
  { id: 1481, designId: "ptolemy", ext: "jpg" },
  { id: 1485, designId: "ten-point-crown", ext: "jpg" },
  { id: 1516, designId: "spaniard", ext: "jpg" },
  { id: 1523, designId: "deco", ext: "jpg" },
  { id: 1541, designId: "deco", ext: "jpg" },
  { id: 1543, designId: "regal", ext: "jpg" },
  { id: 1605, designId: "venetian", ext: "jpg" },
  { id: 1608, designId: "points-interrupted", ext: "jpg" },
  { id: 1625, designId: "west-palm", ext: "jpg" },
  { id: 1716, designId: "origami", ext: "jpeg" },
  { id: 1772, designId: "six-points", ext: "jpg" },
];

// Helper to get public URL for a storage path
function getPublicUrl(storagePath) {
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${storagePath}`;
}

// Upload a file to Supabase Storage
async function uploadFile(localPath, storagePath) {
  const fullLocalPath = path.join(PUBLIC_DIR, localPath);

  if (!fs.existsSync(fullLocalPath)) {
    console.warn(`  Warning: File not found: ${fullLocalPath}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(fullLocalPath);
  const contentType = localPath.endsWith(".png") ? "image/png" : "image/jpeg";

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`  Error uploading ${storagePath}:`, error.message);
    return null;
  }

  return getPublicUrl(storagePath);
}

async function migrateDesigns() {
  console.log("\n📋 Migrating designs...");

  const { error } = await supabase.from("designs").upsert(designs, { onConflict: "id" });

  if (error) {
    console.error("Error inserting designs:", error.message);
    return false;
  }

  console.log(`  ✓ Inserted ${designs.length} designs`);
  return true;
}

async function migrateRegularCues() {
  console.log("\n📸 Migrating regular cues...");

  for (const cue of cues) {
    console.log(`  Processing cue ${cue.id}...`);

    // Upload images
    const images = {
      details: [],
      list: [],
    };

    // Upload details images
    for (let i = 1; i <= 2; i++) {
      const localPath = `images/${cue.id}/details/${i}.png`;
      const storagePath = `${cue.id}/details/${i}.png`;
      const url = await uploadFile(localPath, storagePath);
      if (url) images.details.push(url);
    }

    // Upload list images
    for (let i = 1; i <= 2; i++) {
      const localPath = `images/${cue.id}/list/${i}.png`;
      const storagePath = `${cue.id}/list/${i}.png`;
      const url = await uploadFile(localPath, storagePath);
      if (url) images.list.push(url);
    }

    // Insert cue record
    const { error } = await supabase.from("cues").upsert(
      {
        id: cue.id,
        design_id: cue.designId,
        highlight: cue.highlight || false,
        is_past_cue: false,
        images,
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error(`  Error inserting cue ${cue.id}:`, error.message);
    } else {
      console.log(`  ✓ Cue ${cue.id} migrated`);
    }
  }
}

async function migratePastCues() {
  console.log("\n🕰️  Migrating past cues...");

  for (const cue of pastCues) {
    console.log(`  Processing past cue ${cue.id}...`);

    // Upload single image
    const localPath = `images/past-cues/${cue.id}.${cue.ext}`;
    const storagePath = `past/${cue.id}.${cue.ext}`;
    const url = await uploadFile(localPath, storagePath);

    const images = url ? { main: url } : {};

    // Insert cue record
    const { error } = await supabase.from("cues").upsert(
      {
        id: cue.id,
        design_id: cue.designId,
        highlight: false,
        is_past_cue: true,
        images,
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error(`  Error inserting past cue ${cue.id}:`, error.message);
    } else {
      console.log(`  ✓ Past cue ${cue.id} migrated`);
    }
  }
}

async function createStorageBucket() {
  console.log("\n🪣 Creating storage bucket...");

  // Check if bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some((b) => b.name === STORAGE_BUCKET);

  if (!bucketExists) {
    const { error } = await supabase.storage.createBucket(STORAGE_BUCKET, {
      public: true,
      fileSizeLimit: 10485760, // 10MB
    });

    if (error) {
      console.error("Error creating bucket:", error.message);
      return false;
    }
    console.log(`  ✓ Created bucket: ${STORAGE_BUCKET}`);
  } else {
    console.log(`  ✓ Bucket already exists: ${STORAGE_BUCKET}`);
  }

  return true;
}

async function main() {
  console.log("🚀 Starting Supabase migration...");
  console.log(`   URL: ${SUPABASE_URL}`);

  // Create storage bucket
  await createStorageBucket();

  // Migrate designs
  await migrateDesigns();

  // Migrate cues with images
  await migrateRegularCues();

  // Migrate past cues with images
  await migratePastCues();

  console.log("\n✅ Migration complete!");
  console.log("\nNext steps:");
  console.log("1. Verify data in Supabase Dashboard");
  console.log("2. Update your app to use the new Supabase composable");
}

main().catch(console.error);
