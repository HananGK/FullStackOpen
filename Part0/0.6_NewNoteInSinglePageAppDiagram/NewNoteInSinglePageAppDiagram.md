sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: Event handler creates a new note, adds it to notes array, rerenders notes and sends new note server
    browser->>server: {content: "holahola", date: "2024-08-28T14:05:38.997Z"}
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server