## ADDED Requirements

### Requirement: Contact form collects required fields
The system SHALL provide a contact form on the contact page that collects the visitor's name, email, and message.

#### Scenario: Visitor views contact form
- **WHEN** a visitor opens `/contact.html`
- **THEN** the page contains input fields for name, email, and message, and a submit button

### Requirement: Name field is required
The system SHALL require the visitor to provide a non-empty name before submission.

#### Scenario: Visitor submits without a name
- **WHEN** a visitor leaves the name field empty and submits the form
- **THEN** the browser prevents submission and prompts the visitor to fill in the name

### Requirement: Email field is required and valid
The system SHALL require the visitor to provide an email that matches a valid email format.

#### Scenario: Visitor submits an invalid email
- **WHEN** a visitor enters an incorrectly formatted email and submits the form
- **THEN** the browser prevents submission and prompts the visitor to enter a valid email

### Requirement: Message field is required
The system SHALL require the visitor to provide a non-empty message before submission.

#### Scenario: Visitor submits without a message
- **WHEN** a visitor leaves the message field empty and submits the form
- **THEN** the browser prevents submission and prompts the visitor to fill in the message

### Requirement: Form data is sent to the server
The system SHALL send the submitted form data to a server endpoint.

#### Scenario: Visitor submits valid data
- **WHEN** a visitor fills in valid name, email, and message and submits the form
- **THEN** the browser sends a POST request to `/api/contact` with the form data as JSON

### Requirement: Server stores submission in JSON file
The system SHALL store each valid submission as a new entry in a JSON file.

#### Scenario: Server receives valid submission
- **WHEN** the server receives a POST request to `/api/contact` with valid data
- **THEN** the server appends a record containing `name`, `email`, `message`, and `submittedAt` to `data/messages.json`

### Requirement: Server rejects invalid submissions
The system SHALL reject submissions that are missing required fields or contain invalid data.

#### Scenario: Server receives incomplete data
- **WHEN** the server receives a POST request to `/api/contact` with missing fields
- **THEN** the server responds with HTTP 400 and an error message

### Requirement: Visitor receives submission feedback
The system SHALL display a success or error message after the visitor submits the form.

#### Scenario: Submission succeeds
- **WHEN** the server responds with HTTP 200 to a valid submission
- **THEN** the page displays a success message and clears the form fields

#### Scenario: Submission fails
- **WHEN** the server responds with an error to a submission
- **THEN** the page displays an error message and keeps the form fields filled
