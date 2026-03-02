import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("portfolio.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    situation TEXT,
    task TEXT,
    action TEXT,
    result TEXT,
    tags TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    items TEXT
  );

  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    tagline TEXT,
    description TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Ensure image_url column exists in projects table
try {
  const columns = db.prepare("PRAGMA table_info(projects)").all() as any[];
  const hasImageUrl = columns.some(col => col.name === 'image_url');
  if (!hasImageUrl) {
    db.exec("ALTER TABLE projects ADD COLUMN image_url TEXT");
    console.log("Added image_url column to projects table");
  }
} catch (err) {
  console.error("Migration error:", err);
}

// Seed initial data if empty
try {
  const projectCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
  if (projectCount.count === 0) {
    const insertProject = db.prepare("INSERT INTO projects (title, situation, task, action, result, tags, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
    insertProject.run(
      "Digital Dental Literacy Accelerator",
      "Rendahnya tingkat literasi kesehatan gigi di Indonesia (hanya 5.7% masyarakat yang menyadari pentingnya sikat gigi tepat waktu).",
      "Membangun ekosistem edukasi digital yang mampu menjangkau audiens muda secara masif.",
      "Mengintegrasikan analisis data tren media sosial dengan konten medis berbasis bukti.",
      "Peningkatan engagement rate sebesar 45% dan jangkauan organik ke lebih dari 50.000+ individu.",
      "Health Tech,Education,Analysis",
      "https://images.unsplash.com/photo-1629909608135-ca29ed97499d?auto=format&fit=crop&q=80&w=800"
    );
    
    insertProject.run(
      "Clinical Data Analysis Framework",
      "Data pasien di lingkungan pendidikan seringkali tidak terstruktur.",
      "Mengembangkan sistem kategorisasi data untuk mempermudah analisis kasus kritis.",
      "Menerapkan kerangka berpikir analitik untuk memetakan variabel risiko kesehatan mulut.",
      "Reduksi waktu diagnosis awal sebesar 20% melalui pola identifikasi gejala.",
      "Analytical,Medical,Efficiency",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
    );
    console.log("Seeded projects");
  }

  const skillCount = db.prepare("SELECT COUNT(*) as count FROM skills").get() as { count: number };
  if (skillCount.count === 0) {
    const insertSkill = db.prepare("INSERT INTO skills (category, items) VALUES (?, ?)");
    insertSkill.run("Communicative", JSON.stringify(["Public Speaking", "Health Education", "Stakeholder Management", "UX Writing"]));
    insertSkill.run("Critical & Analytic", JSON.stringify(["Clinical Reasoning", "Data Interpretation", "Problem Solving", "Research Methodology"]));
    insertSkill.run("Professional Integrity", JSON.stringify(["Loyalty", "Medical Ethics", "Detail Oriented", "Strategic Planning"]));
    console.log("Seeded skills");
  }
  
  const statCount = db.prepare("SELECT COUNT(*) as count FROM stats").get() as { count: number };
  if (statCount.count === 0) {
    const insertStat = db.prepare("INSERT INTO stats (label, value) VALUES (?, ?)");
    insertStat.run("Reach", "50K+");
    insertStat.run("Efficiency", "20%");
    insertStat.run("Retention", "80%");
    insertStat.run("Projects", "12+");
    console.log("Seeded stats");
  }
} catch (err) {
  console.error("Seeding error:", err);
}

async function startServer() {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });
  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects").all();
    res.json(projects.map((p: any) => ({ ...p, tags: p.tags.split(",") })));
  });

  app.post("/api/projects", (req, res) => {
    const { title, situation, task, action, result, tags, image_url } = req.body;
    const info = db.prepare("INSERT INTO projects (title, situation, task, action, result, tags, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(title, situation, task, action, result, tags.join(","), image_url || "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800");
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/projects/:id", (req, res) => {
    try {
      const { title, situation, task, action, result, tags, image_url } = req.body;
      db.prepare("UPDATE projects SET title = ?, situation = ?, task = ?, action = ?, result = ?, tags = ?, image_url = ? WHERE id = ?")
        .run(title, situation, task, action, result, Array.isArray(tags) ? tags.join(",") : tags, image_url, req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Update project error:", error);
      res.status(500).json({ success: false, message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", (req, res) => {
    db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/skills", (req, res) => {
    const skills = db.prepare("SELECT * FROM skills").all();
    res.json(skills.map((s: any) => ({ ...s, items: JSON.parse(s.items) })));
  });

  app.get("/api/stats", (req, res) => {
    const stats = db.prepare("SELECT * FROM stats").all();
    res.json(stats);
  });

  app.post("/api/stats/:id", (req, res) => {
    const { value } = req.body;
    db.prepare("UPDATE stats SET value = ? WHERE id = ?").run(value, req.params.id);
    res.json({ success: true });
  });

  app.post("/api/login", (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Login attempt for:", username);
      
      if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
      }

      if (username === "admin" && password === "210608") {
        return res.json({ success: true, token: "admin-session-token" });
      } else {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Internal server error during login" });
    }
  });

  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Name, email and message are required" });
      }
      db.prepare("INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)")
        .run(name, email, subject || "No Subject", message);
      res.json({ success: true });
    } catch (error) {
      console.error("Contact error:", error);
      res.status(500).json({ success: false, message: "Failed to send message" });
    }
  });

  app.get("/api/messages", (req, res) => {
    try {
      const messages = db.prepare("SELECT * FROM messages ORDER BY created_at DESC").all();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  });

  app.delete("/api/messages/:id", (req, res) => {
    try {
      db.prepare("DELETE FROM messages WHERE id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  });

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, message: "An unexpected error occurred on the server" });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = process.env.PORT || 3000;
  if (process.env.NODE_ENV !== "vercel") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
  
  return app;
}

export const appPromise = startServer();
export default appPromise;
