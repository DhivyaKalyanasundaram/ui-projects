# ui-projects
There are two assignments completed at this point.
## Assignment-1 - The sign-up
  ### Directory structure:
```
    common
      |- filters |- date-filter.js
      |          |- date-filter.test.js
      | - js-includes |- third-party-js.js
                      |- third-party-test-js.js
    login
      |- sign-in-response.json
      |- sign-up-app.js
      |- sign-up-controller.js
      |- sign-up-controller.test.js
      |- sign-up-factory-service.js
      |- sign-up-new.css
      |- sign-up-value.js
      |- sign-up.css
      |- sign-up.html
    test-html
      |- test-date-filter.html
      |- test-sign-up-controller.html
```
      
 ## Assignment-2 - The buddy list
  ### Directory structure:
```
    buddy-page
      |- buddies.json
      |- buddy-list-app.js
      |- buddy-list-controller.js
      |- buddy-list.css
      |- buddy-list.html
    common
      |- directive-| modal-dialog.js
      |            | toggle-class.js
      |            | warning.js
      |- fragments - ontroller.test.js
      |- sign-up-factory-service.js
      |- sign-up-new.css
      |- sign-up-value.js
      |- sign-up.css
      |- sign-up.html
    test-html
      |- test-date-filter.html
      |- test-sign-up-controller.html
 ```
  Some of the file specified in above modularization structure can be refined for better usage. 
  UI layout screenshot are updated in screen-shots.docx
  
  ## Assumptions :
  ### Assignment 1 :
  #### Design assumption
  - Bootrap styles are used for decorating the layout
  - Challenge 1 and challenge 2 assignments are considered seperate projects. It can be combined to use common directives / functions. Currently they are maintained as separate projects.
  - Server is required to test
  - War can be generated using maven and deployed in web/application server
 
  
  #### Usability / Implementation 
  - first name and last name - only alphabets are allowed eg. spaces are not allowed.
  - while entering data in text fields, validation is done immediately and warning messages are displayed in grey
  - only if the basic form validations (required, max length etc) are through, the submit button is enabled
  - look and feel can be enhanced when UI mock is available
  - As UI will always subject to change, the importance is given much to functionality.
  - Extra validation are not implemented as challenge does not specify those. eg. email field validation for valid email.
  
  
  ### Assignment 2:
  #### Design assumption
  - Bootrap styles are used for decorating the layout
  
  #### Usability / Implementation 
  * Search functionality works after the user clicks the search icon or enters
  
  ##### Known bugs / refinements:
  * The list item replacing the deleted list item is in expanding mode
  * unit test cases can be refined in both of the assignments for better TDD practise
