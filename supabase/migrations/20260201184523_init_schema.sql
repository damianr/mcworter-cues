-- Create designs table
CREATE TABLE IF NOT EXISTS designs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cues table (unified - includes both regular and past cues)
CREATE TABLE IF NOT EXISTS cues (
  id INTEGER PRIMARY KEY,
  design_id TEXT REFERENCES designs(id) ON DELETE SET NULL,
  highlight BOOLEAN DEFAULT FALSE,
  is_past_cue BOOLEAN DEFAULT FALSE,
  images JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_cues_design_id ON cues(design_id);
CREATE INDEX IF NOT EXISTS idx_cues_is_past_cue ON cues(is_past_cue);
CREATE INDEX IF NOT EXISTS idx_cues_highlight ON cues(highlight);

-- Enable Row Level Security (RLS)
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cues ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for designs" ON designs
  FOR SELECT USING (true);

CREATE POLICY "Public read access for cues" ON cues
  FOR SELECT USING (true);
