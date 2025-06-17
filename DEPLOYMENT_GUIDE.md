# KESA Website Deployment Guide for Hostinger

## Prerequisites
- Hostinger Cloud Hosting account
- Domain: kesalearn.com
- Node.js hosting support
- MySQL database access

## Step 1: Prepare Your Local Environment

1. **Clone/Download the project files**
2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Update the database credentials for your Hostinger MySQL database

## Step 2: Database Setup on Hostinger

1. **Access Hostinger Control Panel**
   - Go to your Hostinger dashboard
   - Navigate to "Databases" → "MySQL Databases"

2. **Create Database:**
   - Database name: `kesa_db` (or your preferred name)
   - Create a database user with full privileges
   - Note down: hostname, username, password, database name

3. **Update Environment Variables:**
   \`\`\`env
   DB_HOST=your_hostinger_mysql_host
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=kesa_db
   DB_PORT=3306
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   NEXT_PUBLIC_SITE_URL=https://kesalearn.com
   \`\`\`

## Step 3: Build the Application

1. **Build for production:**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Test locally:**
   \`\`\`bash
   npm start
   \`\`\`

## Step 4: Upload to Hostinger

### Option A: Using File Manager (Recommended for beginners)

1. **Compress your project:**
   - Create a ZIP file of your entire project folder
   - Exclude `node_modules`, `.git`, `.env.local`

2. **Upload via Hostinger File Manager:**
   - Access File Manager in Hostinger control panel
   - Navigate to `public_html` folder
   - Upload and extract your ZIP file
   - Ensure all files are in the root of `public_html`

3. **Install dependencies on server:**
   - Use Hostinger's terminal or SSH access
   - Navigate to your website directory
   - Run: `npm install --production`

### Option B: Using Git (Advanced)

1. **Push to GitHub:**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   \`\`\`

2. **Clone on Hostinger:**
   - SSH into your Hostinger server
   - Navigate to `public_html`
   - Clone: `git clone your-github-repo-url .`
   - Install: `npm install --production`

## Step 5: Configure Hostinger for Next.js

1. **Create/Update .htaccess file in public_html:**
   ```apache
   RewriteEngine On
   RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   \`\`\`

2. **Set up Node.js application:**
   - In Hostinger control panel, go to "Advanced" → "Node.js"
   - Set Node.js version to 18 or higher
   - Set startup file to: `server.js` or `next start`
   - Set application root to your domain folder

## Step 6: Initialize Database

1. **SSH into your server or use terminal:**
   \`\`\`bash
   cd /path/to/your/website
   node scripts/init-db.js
   \`\`\`

2. **Verify database setup:**
   - Check if tables are created in your MySQL database
   - Verify default admin user is created

## Step 7: Configure Domain and SSL

1. **Point domain to Hostinger:**
   - Update nameservers if needed
   - Ensure kesalearn.com points to your hosting

2. **Enable SSL:**
   - In Hostinger control panel, go to "Security" → "SSL"
   - Enable SSL for kesalearn.com
   - Force HTTPS redirect

## Step 8: Final Configuration

1. **Update environment variables on server:**
   - Create `.env.production` file with production values
   - Ensure JWT_SECRET is secure and different from development

2. **Set up file upload directory:**
   \`\`\`bash
   mkdir -p public/uploads
   chmod 755 public/uploads
   \`\`\`

3. **Start the application:**
   \`\`\`bash
   npm start
   \`\`\`

## Step 9: Testing

1. **Test main website:**
   - Visit https://kesalearn.com
   - Check all sections load properly
   - Test responsive design

2. **Test user registration:**
   - Register a new user account
   - Verify email functionality (if configured)

3. **Test admin panel:**
   - Visit https://kesalearn.com/admin/login
   - Login with: admin@kesalearn.com / admin123
   - Test content management features

## Step 10: Post-Deployment Setup

1. **Change default admin password:**
   - Login to admin panel
   - Go to admin settings
   - Update password immediately

2. **Add real content:**
   - Upload actual session banners
   - Update course information
   - Add real contact details

3. **Configure backups:**
   - Set up regular database backups
   - Configure file backups

## Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Verify database credentials in .env
   - Check if database server is accessible
   - Ensure database user has proper privileges

2. **File Upload Issues:**
   - Check directory permissions: `chmod 755 public/uploads`
   - Verify file size limits in hosting

3. **Node.js Application Not Starting:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check application logs

4. **SSL/HTTPS Issues:**
   - Ensure SSL certificate is properly installed
   - Check for mixed content warnings
   - Update all internal links to use HTTPS

### Performance Optimization:

1. **Enable compression:**
   - Configure gzip compression in .htaccess
   - Optimize images before upload

2. **Caching:**
   - Set up browser caching headers
   - Consider using Hostinger's CDN

3. **Database optimization:**
   - Add indexes for frequently queried columns
   - Regular database maintenance

## Security Checklist:

- [ ] Change default admin credentials
- [ ] Use strong JWT secret
- [ ] Enable HTTPS/SSL
- [ ] Regular security updates
- [ ] Backup strategy in place
- [ ] File upload restrictions configured
- [ ] Database access secured

## Support:

- **Hostinger Support:** Available 24/7 via chat
- **Technical Issues:** Check server logs and error messages
- **Application Issues:** Review Next.js and database logs

## Maintenance:

1. **Regular Updates:**
   - Update Node.js dependencies monthly
   - Monitor security advisories
   - Update content regularly

2. **Monitoring:**
   - Set up uptime monitoring
   - Monitor database performance
   - Check error logs regularly

3. **Backups:**
   - Daily database backups
   - Weekly full site backups
   - Test backup restoration process

---

**Note:** This deployment guide assumes you have basic familiarity with web hosting and command line operations. If you encounter issues, Hostinger's support team can assist with server-specific configurations.
\`\`\`

Finally, let me create the favicon and logo placeholder:

```png file="public/favicon.ico" url="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD
