<h1>E-commerce</h1>

<p>A full-stack E-commerce application built with Node.js, Express, MongoDB, and React. This project provides a robust platform for online shopping, featuring user authentication, product management, and a seamless shopping experience.</p>

<h2>🌐 Live Demo</h2>
<p>👉 <a href="https://e-commerce-frontend-delta-umber.vercel.app/" target="_blank">E-Commerce Website Live</a></p>
<p>👉 <a href="https://e-commerce-frontend-delta-umber.vercel.app/login" target="_blank">AdminPanel</a></p>


<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React, HTML, CSS, JavaScript</li>
  <li><strong>Backend:</strong> Node.js, Express.js</li>
  <li><strong>Database:</strong> MongoDB</li>
  <li><strong>Authentication:</strong> JSON Web Tokens (JWT)</li>
  <li><strong>Email Service:</strong> Nodemailer</li>
  <li><strong>Deployment:</strong> Vercel (Frontend), Render/Heroku (Backend)</li>
</ul>

<h3>🖼️ Project Structure Screenshots</h3>
<p align="center">
   <img src="https://github.com/Gulshan36/E-commerce/blob/main/screenshot/frontend.png" alt="Frontend Folder" width="30%"/>
   <img src="https://github.com/Gulshan36/E-commerce/blob/main/screenshot/backend.png" alt="Backend Folder" width="30%" style="margin-right: 10px;"/>
  <img src="https://github.com/Gulshan36/E-commerce/blob/main/screenshot/admin.png" alt="Admin Folder" width="30%" style="margin-right: 10px;"/>
</p>


<h2>🚀 Features</h2>
<ul>
  <li>User registration and login with JWT authentication</li>
  <li>Product listing and detailed product pages</li>
  <li>Shopping cart functionality</li>
  <li>Order placement and order history</li>
  <li>Admin panel for managing products and orders</li>
  <li>Responsive design for various devices</li>
</ul>

<h2>🧑‍💻 Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js and npm installed</li>
  <li>MongoDB instance (local or cloud-based)</li>
</ul>

<h3>Installation</h3>
<ol>
  <li><strong>Clone the repository:</strong>
    <pre><code>git clone https://github.com/Gulshan36/E-commerce.git
cd E-commerce</code></pre>
  </li>

  <li><strong>Backend Setup:</strong>
    <pre><code>cd backend
npm install</code></pre>
  </li>

  <li><strong>Frontend Setup:</strong>
    <pre><code>cd frontend
npm install</code></pre>
  </li>

  <li><strong>Admin Panel Setup:</strong>
    <pre><code>cd admin
npm install</code></pre>
  </li>

  <h3>🔐 Environment Variables (.env)</h3>
<p>Create a <code>.env</code> file inside the <code>backend</code> folder and add the following variables:</p>

<pre><code>MONGODB_URI=              # MongoDB connection string
CLOUDINARY_CLOUD_NAME=    # Cloudinary cloud name for image storage
CLOUDINARY_API_KEY=       # Cloudinary API key
CLOUDINARY_SECRET_KEY=    # Cloudinary API secret key
JWT_SECRET=               # Secret key for JWT authentication
ADMIN_EMAIL=              # Admin login email
ADMIN_PASSWORD=           # Admin login password
STRIPE_SECRET_KEY=        # Stripe API secret key for payments
RAZORPAY_KEY_ID=          # Razorpay public key for payments
RAZORPAY_KEY_SECRET=      # Razorpay secret key
EMAIL_USER=               # Email address for sending emails
EMAIL_PASS=               # App password or email password
</code></pre>


  <li><strong>Run the Application:</strong>
    <p><strong>Backend:</strong></p>
    <pre><code>cd backend
npm run server</code></pre>

  <p><strong>Frontend:</strong></p>
    <pre><code>cd frontend
npm run dev</code></pre>

  <p><strong>Admin Panel:</strong></p>
    <pre><code>cd admin
npm run dev</code></pre>

  <p>The frontend will be available at <code>http://localhost:5173</code>, backend at <code>http://localhost:4000</code>, and admin panel on its own dev port (usually <code>http://localhost:5174</code> or similar).</p>
  </li>
</ol>

<h2>📝 License</h2>
<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>
