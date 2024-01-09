/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     AdminAuth:
 *       type: http
 *       scheme: bearer
 *       in: header
 *       name: Authorization
 *       description: Admin authentication token
 *       bearerFormat: JWT
 *     SecurityAuth:
 *       type: http
 *       scheme: bearer
 *       in: header
 *       name: Authorization
 *       description: Security authentication token
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * paths:
 *   /login:
 *     post:
 *       summary: User login
 *       description: Allows a user to login with a username and password.
 *       tags:
 *         - 'Authentication'
 *       consumes:
 *         - application/json
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           description: Login credentials
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *               - Username
 *               - Password
 *             properties:
 *               Username:
 *                 type: string
 *               Password:
 *                 type: string
 *       responses:
 *         '200':
 *           description: Login successful
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *         '400':
 *           description: Bad request, when the user credentials are not provided or are incorrect
 *         '500':
 *           description: Internal server error
 *
 *   /visitorsRegistration/{id}:
 *     delete:
 *       tags:
 *         - Admin
 *         - Visitor
 *         - User
 *       summary: "Delete visitor registration and related documents"
 *       description: "Delete a visitor registration and its related documents. Requires a valid admin JWT token."
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: "ID of the visitor registration to delete"
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: "Visitor registration and related documents deleted successfully"
 *         404:
 *           description: "Visitor registration not found"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 *         500:
 *           description: "Internal Server Error"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: Allows an administrator to login with a username and password.
 *     tags:
 *       - Authentication
 *       - Admin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Admin login credentials
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - AdminUsername
 *             - AdminPassword
 *           properties:
 *             AdminUsername:
 *               type: string
 *             AdminPassword:
 *               type: string
 *     responses:
 *       '200':
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 adminToken:
 *                   type: string
 *       '400':
 *         description: Bad request, when the admin credentials are not provided or are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Admin registration
 *     description: Allows an admin to register with username, password, name, and email.
 *     tags:
 *       - Admin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Admin registration data
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - AdminUsername
 *             - AdminPassword
 *             - AdminName
 *             - AdminEmail
 *           properties:
 *             AdminUsername:
 *               type: string
 *             AdminPassword:
 *               type: string
 *             AdminName:
 *               type: string
 *             AdminEmail:
 *               type: string
 *     responses:
 *       '200':
 *         description: Admin registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Registration Complete!!
 *       '400':
 *         description: Bad request, when the registration data is incomplete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     description: Allows a new user to register.
 *     tags:
 *       - 'User'
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Registration data
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - Username
 *             - Password
 *             - name
 *             - email
 *           properties:
 *             Username:
 *               type: string
 *             Password:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *     responses:
 *       '200':
 *         description: Registration successful
 *       '400':
 *         description: Bad request, when the registration data is incomplete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /create-visit:
 *   post:
 *     summary: Create a new visit
 *     description: Allows the creation of a new visit with visitor and host details.
 *     tags:
 *       - 'Visitor'
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: visit
 *         description: Object containing visit details
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - userid
 *             - gender
 *             - age
 *             - phoneno
 *             - bookdate
 *             - time
 *             - hours
 *             - parkingslot
 *           properties:
 *             username:
 *               type: string
 *             userid:
 *               type: string
 *             gender:
 *               type: string
 *               enum: [male, female, other]
 *             age:
 *               type: string
 *             phoneno:
 *               type: string
 *             bookdate:
 *               type: string
 *             time:
 *               type: string
 *             hours:
 *               type: string
 *               format: date-time
 *             parkingslot:
 *               type: string
 *     responses:
 *       '200':
 *         description: Visit created successfully
 *       '400':
 *         description: Bad request, when required fields are missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /admin/visits:
 *   post:
 *     summary: Create a new visit
 *     description: Allows an admin to create a new visit record.
 *     tags:
 *       - 'Admin'
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: visit
 *         description: Object containing visit details
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - userid
 *             - gender
 *             - age
 *             - phoneno
 *             - bookdate
 *             - time
 *             - hours
 *             - parkingslot
 *           properties:
 *             username:
 *               type: string
 *             userid:
 *               type: string
 *             gender:
 *               type: string
 *               enum: [male, female, other]
 *             age:
 *               type: string
 *             phoneno:
 *               type: string
 *             bookdate:
 *               type: string
 *             time:
 *               type: string
 *             hours:
 *               type: string
 *             parkingslot:
 *               type: string
 *               format: string
 *     responses:
 *       '200':
 *         description: Visit created successfully
 *       '400':
 *         description: Bad request, when required fields are missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /admin/visits/{visitId}:
 *   get:
 *     summary: Get a specific visit
 *     description: Allows the admin to retrieve a specific visit by ID.
 *     tags:
 *       - 'Admin'
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: visitId
 *         type: string
 *         required: true
 *         description: The ID of the visit to retrieve
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Token needed to retrieve the ID of the visit
 *     responses:
 *       '200':
 *         description: Visit details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Visit'
 *       '404':
 *         description: Visit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *   patch:
 *     summary: Update a specific visit
 *     description: Allows the admin to update a specific visit record.
 *     tags:
 *       - 'Admin'
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: visitId
 *         type: string
 *         required: true
 *         description: The ID of the visit to update
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Token needed to update the ID of the visit
 *       - in: body
 *         name: visit
 *         description: Object containing updated visit details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             userid:
 *               type: string
 *             gender:
 *               type: string
 *               enum: [male, female, other]
 *             age:
 *               type: string
 *             phoneno:
 *               type: string
 *             bookdate:
 *               type: string
 *             time:
 *               type: string
 *             hours:
 *               type: string
 *             parkingslot:
 *               type: string
 *               format: string
 *     responses:
 *       '200':
 *         description: Visit updated successfully
 *       '400':
 *         description: Bad request, when required fields are missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '404':
 *         description: Visit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /admin/visits/{visitId}:
 *   delete:
 *     summary: Delete a specific visit
 *     description: Allows the admin to delete a specific visit by ID.
 *     tags:
 *       - 'Admin'
 *     parameters:
 *       - in: path
 *         name: visitId
 *         type: string
 *         required: true
 *         description: The ID of the visit to delete
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Authorization token obtained through login
 *     responses:
 *       '200':
 *         description: Visit deleted successfully
 *       '404':
 *         description: Visit not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Error message
 *   Visit:
 *     type: object
 *     required:
 *       - visitorId
 *       - visitorName
 *     properties:
 *       visitorId:
 *         type: string
 *       visitorName:
 *         type: string
 *       gender:
 *         type: string
 *         enum: [male, female, other]
 *       citizenship:
 *         type: string
 *       visitorAddress:
 *         type: string
 *       phoneNo:
 *         type: string
 *       vehicleNo:
 *         type: string
 *       hostId:
 *         type: string
 *       visitDate:
 *         type: string
 *         format: date-time
 *       place:
 *         type: string
 *       purpose:
 *         type: string
 */