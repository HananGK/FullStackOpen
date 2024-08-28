sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    browser->>server: Form Data = note: Aserejé ja de je 
    activate server
    server -->> create new note objetct with content and new date. Add it to notes array
    server -->> browser reload page
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "zmjjkk", "date": "2024-08-28T03:03:12.221Z"}, ..., {"content": "Aserejé ja de je", "date": "2024-08-28T11:54:19.146Z"}]
    deactivate server