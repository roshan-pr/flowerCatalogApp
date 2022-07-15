# DOING

  - [ ] Refactor the guestbook class
    - [ ] Read write dependencies should not be in class


# TODO

  - [ ] Refactor signUp page 
      - [ ] show message user exist or sign up successful
  - [ ] Test the app with supertest
  - [ ] Provide users as dependency to create the app
    - [ ] Implement users class, with behaviors persist
  - [ ] Persist the credential with hashed password

# MAYBE

  - [ ] Test for guestbook class
  - [ ] Put the login and sign up page in public and redirect to the page
  
# Done

  - [x] Migrate to express
  - [x] Test the app with supertest
    - [x] noFileHandler
    - [x] staticFileHandler
    - [x] loginHandler
    - [x] signUpHandler
    - [x] guestbookHandler
    - [x] signUp
    - [x] logout
    - [x] add-comment
  - [x] Provide session as dependency to create the app
  - [x] Provide the logger to the app 
    - [x] Through test provide the no operation logger to call next handler
  - [x] Read files asynchronously
  - [x] Persist the credential of user
  - [x] Refactor the guestbook 
    - [x] Use xhr request for updating the page
  - [x] Pull out the sign up handler
  - [x] Fix the login for wrong user
  - [x] Pull out the logoutHandler
  - [x] Add password for the login
  - [x] Response only to the GET method
  - [x] Remove input textbox in guestbook, indicate from credentials
  - [x] Logout the user
  - [x] Style the table in guestbook.html
  - [x] Handle cookies
    - [x] Introduce login page, authenticate before accessing guestbook
  - [x] Pull app.js outside app directory
  - [x] Handle request of post method
  - [x] Implement post for submission of form
    - [x] Handle async process
    - [x] Introduce parse body params handler
    - [x] Reconsider handlers contract takes next()
  - [x] Handle api request form the client
  - [x] Delegate the functionality of loading and saving from file to Guestbook
  - [x] Rename serveFileContent.js staticFileHandler.js functionality of serveStaticFrom(dir)
    - [x] Add npm package path, mime-types
  - [x] Rename startServer.js to index.js
  - [x] Give a closure to save the comment to a file
  - [x] Give responsibility of generating page to guestbook class
    - [x] Save the comments in file
  - [x] Implement http module
  - [x] Remove comment handler
    - [x] Delegate handling adding comment to the guestbook handler
  - [x] Restructure the files
  - [x] Display comments from the user
    - [x] Display in same page
  - [x] Rename userProfile to guestbook.js
  - [x] Instead of User entity introduce the guest entity
  - [x] Style html files
  - [x] Add back to home page link in pages
  - [x] ~~~Serve file in the server~~~
  - [x] add gif in homepage
  - [x] Separate handler
  - [x] Add response class for handling socket
  - [x] Add a server
    - [x] Launches a home page
- [x] Add README.md
