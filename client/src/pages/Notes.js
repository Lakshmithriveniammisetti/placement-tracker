import Sidebar from "../components/Sidebar";
import { useState, useEffect, useRef } from "react";

function Notes() {

  const fileRef = useRef();

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [selectedNote, setSelectedNote] = useState(null);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  // SAVE
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // OPEN FILE PICKER
  const addNote = () => {
    fileRef.current.click();
  };

  // HANDLE MULTIPLE FILES
  const handleFile = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const newNote = {
          id: Date.now() + Math.random(),
          title: file.name,
          type: file.type,
          content: event.target.result
        };

        setNotes((prev) => [newNote, ...prev]);
      };

      reader.readAsDataURL(file); // 🔥 supports images/pdf
    });
  };

  // SELECT
  const selectNote = (note) => {
    setSelectedNote(note);

    if (note.type.includes("text")) {
      setText(note.content);
    }
  };

  // SAVE TEXT
  const saveNote = () => {
    const updated = notes.map((n) =>
      n.id === selectedNote.id ? { ...n, content: text } : n
    );
    setNotes(updated);
    alert("Saved ✅");
  };

  // DELETE
  const deleteNote = (id) => {
    if (!window.confirm("Delete this note?")) return;

    setNotes(notes.filter((n) => n.id !== id));
    setSelectedNote(null);
  };

  // RENAME
  const renameNote = (note) => {
    const newName = prompt("Enter new name", note.title);
    if (!newName) return;

    const updated = notes.map((n) =>
      n.id === note.id ? { ...n, title: newName } : n
    );

    setNotes(updated);
  };

  // SEARCH FILTER
  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Sidebar />

      <div className="main" style={{ display: "flex", gap: "20px" }}>

        {/* LEFT PANEL */}
        <div style={{ width: "30%" }}>
          <h2>Notes</h2>

          <input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          />

          <button className="btn" onClick={addNote}>
            + Upload Files
          </button>

          <input
            type="file"
            multiple
            ref={fileRef}
            onChange={handleFile}
            style={{ display: "none" }}
          />

          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="progress-box"
              onClick={() => selectNote(note)}
              style={{
                marginTop: "10px",
                cursor: "pointer",
                background:
                  selectedNote?.id === note.id ? "#d1fae5" : "white"
              }}
            >
              {note.title}

              <div style={{ float: "right" }}>
                <button onClick={(e) => {
                  e.stopPropagation();
                  renameNote(note);
                }}>✏</button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  style={{ color: "red" }}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: "70%" }}>
          {selectedNote ? (
            <>
              <h2>{selectedNote.title}</h2>

              {/* TEXT FILE */}
              {selectedNote.type.includes("text") && (
                <>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                      width: "100%",
                      height: "300px",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "2px solid #2e7d6d"
                    }}
                  />

                  <br /><br />
                  <button className="btn" onClick={saveNote}>
                    Save
                  </button>
                </>
              )}

              {/* IMAGE */}
              {selectedNote.type.startsWith("image") && (
                <img
                  src={selectedNote.content}
                  alt=""
                  style={{ maxWidth: "100%", borderRadius: "10px" }}
                />
              )}

              {/* PDF */}
              {selectedNote.type === "application/pdf" && (
                <iframe
                  src={selectedNote.content}
                  title="pdf"
                  width="100%"
                  height="400px"
                />
              )}

            </>
          ) : (
            <h3>Select a note to preview</h3>
          )}
        </div>

      </div>
    </div>
  );
}

export default Notes;