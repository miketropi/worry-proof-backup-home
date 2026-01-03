---
title: WPB Upload CLI - Upload Large Backups via Command Line
date: 2026-01-06
excerpt: Introducing wpb-upload-cli, a command-line tool for uploading large WordPress backup files. Supports chunked uploads, parallel processing, and automatic restore—perfect for large sites and automated workflows.
---

# WPB Upload CLI - Upload Large Backups via Command Line

Uploading large WordPress backup files through a browser can be frustrating. Browser timeouts, server upload limits, and network interruptions often cause failures—especially with multi-gigabyte backups. **WPB Upload CLI** solves this problem by providing a robust command-line tool that handles large file uploads reliably.

## The Problem with Browser Uploads

Traditional browser-based uploads face several limitations:

- **File Size Limits**: Most servers restrict upload sizes (often 2-10MB via `upload_max_filesize`)
- **Timeout Issues**: Large files take too long, exceeding PHP's `max_execution_time`
- **Network Interruptions**: Browser uploads can't resume if the connection drops
- **No Progress Tracking**: Difficult to monitor upload progress for large files
- **Memory Constraints**: Loading entire files into memory causes PHP memory exhaustion

For large WordPress sites with extensive media libraries, these limitations make browser uploads impractical.

## Introducing WPB Upload CLI

**WPB Upload CLI** is a Node.js command-line tool designed specifically for uploading large backup files to WordPress sites running the Worry Proof Backup plugin (version 0.2.0 or higher). It uses chunked uploads, parallel processing, and automatic restore to handle files of any size.

### Key Features

- **📦 Chunked Uploads**: Automatically splits large files into manageable chunks
- **⚡ Parallel Processing**: Uploads multiple chunks concurrently for faster transfers
- **📊 Progress Tracking**: Real-time progress bar showing upload status
- **🔄 Auto-Restore**: Automatically triggers the unzip/restore process after upload
- **🔐 Secure Authentication**: Uses WordPress Application Passwords for secure access
- **🛡️ Error Handling**: Robust error handling with retry logic

## Installation

### Using npx (Recommended - No Installation Required)

The easiest way to use WPB Upload CLI is with `npx`, which runs the tool without installing it globally:

```bash
npx github:miketropi/wpb-upload-cli upload --file <path> --site <url> --token <token>
```

This approach:
- Requires no installation
- Always uses the latest version
- Keeps your system clean

### Global Installation (Optional)

If you use the tool frequently, you can install it globally:

```bash
npm install -g github:miketropi/wpb-upload-cli
```

Then use it directly:

```bash
wpb-upload-cli upload --file <path> --site <url> --token <token>
```

## Prerequisites

Before using WPB Upload CLI, ensure you have:

1. **Node.js installed** (ES modules support required)
2. **Worry Proof Backup plugin** version 0.2.0 or higher installed and activated on your WordPress site
3. **WordPress Application Password** created for authentication

> **Note**: The chunked upload feature is available starting from Worry Proof Backup version 0.2.0. If you're using an older version, please update the plugin first.

### Creating a WordPress Application Password

1. Go to your WordPress admin dashboard
2. Navigate to **Users → Your Profile**
3. Scroll down to **Application Passwords**
4. Enter a name (e.g., "CLI Upload Tool")
5. Click **Add New Application Password**
6. Copy the generated password (format: `xxxx xxxx xxxx xxxx xxxx xxxx`)

**Important**: Store this password securely—you won't be able to see it again.

## Usage

### Basic Command Structure

```bash
npx github:miketropi/wpb-upload-cli upload \
  --file <path-to-backup.zip> \
  --site <wordpress-site-url> \
  --token "username:application_password"
```

### Required Options

- `--file <path>`: Path to the backup ZIP file you want to upload
- `--site <url>`: Your WordPress site URL (e.g., `https://example.com`)
- `--token <token>`: Authentication token in format `"username:application_password"`

### Optional Options

- `--chunk-size <mb>`: Chunk size in megabytes (default: `10`)
- `--concurrency <n>`: Number of parallel uploads (default: `3`)

## Examples

### Example 1: Basic Upload

Upload a standard backup file:

```bash
npx github:miketropi/wpb-upload-cli upload \
  --file ./backup-2026-01-06.zip \
  --site https://mysite.com \
  --token "admin:abcd efgh ijkl mnop qrst uvwx"
```

### Example 2: Large File with Custom Chunk Size

For very large files (5GB+), increase chunk size for efficiency:

```bash
npx github:miketropi/wpb-upload-cli upload \
  --file ./large-backup-15gb.zip \
  --site https://mysite.com \
  --token "admin:abcd efgh ijkl mnop qrst uvwx" \
  --chunk-size 20 \
  --concurrency 5
```

### Example 3: Slow Connection Optimization

For slower connections, use smaller chunks and lower concurrency:

```bash
npx github:miketropi/wpb-upload-cli upload \
  --file ./backup.zip \
  --site https://mysite.com \
  --token "admin:abcd efgh ijkl mnop qrst uvwx" \
  --chunk-size 5 \
  --concurrency 2
```

### Example 4: Automated Backup Script

Integrate into shell scripts for automated workflows:

```bash
#!/bin/bash

BACKUP_FILE="/backups/site-backup-$(date +%Y%m%d).zip"
SITE_URL="https://mysite.com"
TOKEN="admin:abcd efgh ijkl mnop qrst uvwx"

npx github:miketropi/wpb-upload-cli upload \
  --file "$BACKUP_FILE" \
  --site "$SITE_URL" \
  --token "$TOKEN" \
  --chunk-size 15 \
  --concurrency 4

if [ $? -eq 0 ]; then
  echo "Upload successful!"
else
  echo "Upload failed!"
  exit 1
fi
```

## How It Works

### 1. File Chunking

The tool reads your backup file and splits it into chunks based on the specified chunk size:

```
backup.zip (2GB)
├── chunk-0 (10MB)
├── chunk-1 (10MB)
├── chunk-2 (10MB)
└── ... (200 chunks total)
```

### 2. Parallel Upload

Chunks are uploaded concurrently to the WordPress REST API endpoint:

```
POST /wp-json/worry-proof-backup/v1/upload-chunk
```

The tool manages a queue of uploads, maintaining the specified concurrency level.

### 3. Progress Tracking

A real-time progress bar shows:

```
Uploading: [████████████████████░░░░] 75% (150/200 chunks)
```

### 4. Automatic Restore

Once all chunks are uploaded, the tool automatically triggers the restore process:

```
POST /wp-json/worry-proof-backup/v1/restore-start
POST /wp-json/worry-proof-backup/v1/restore-run
```

The server reassembles the chunks, extracts the ZIP file, and restores your site.

## API Endpoints

WPB Upload CLI communicates with these WordPress REST API endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/wp-json/worry-proof-backup/v1/upload-chunk` | POST | Upload individual file chunks |
| `/wp-json/worry-proof-backup/v1/restore-start` | POST | Initialize restore process |
| `/wp-json/worry-proof-backup/v1/restore-run` | POST | Execute restore process |

All endpoints require WordPress authentication via Application Passwords.

## Error Handling

### Common Errors and Solutions

#### 413 Payload Too Large

**Error**: `Request Entity Too Large`

**Solution**: Reduce the `--chunk-size` option:

```bash
--chunk-size 5  # Use smaller chunks
```

#### Authentication Failed

**Error**: `401 Unauthorized`

**Solution**: Verify your Application Password format:

```bash
--token "username:application_password"  # Correct format
```

#### Network Timeout

**Error**: `ETIMEDOUT` or connection errors

**Solution**: 
- Check your internet connection
- Reduce `--concurrency` to lower parallel load
- Use smaller `--chunk-size` for slower connections

#### File Not Found

**Error**: `ENOENT: no such file or directory`

**Solution**: Verify the file path is correct and the file exists:

```bash
ls -lh ./backup.zip  # Verify file exists
```

## Best Practices

### 1. Choose Appropriate Chunk Sizes

- **Fast connections**: 15-20MB chunks
- **Standard connections**: 10MB chunks (default)
- **Slow connections**: 5MB chunks

### 2. Adjust Concurrency

- **High bandwidth**: 4-5 parallel uploads
- **Standard bandwidth**: 3 parallel uploads (default)
- **Low bandwidth**: 1-2 parallel uploads

### 3. Monitor Progress

Watch the progress bar for issues. If uploads stall:
- Check network connectivity
- Verify server is responding
- Review WordPress error logs

### 4. Test on Staging First

Always test large uploads on a staging site before production:

```bash
npx github:miketropi/wpb-upload-cli upload \
  --file ./backup.zip \
  --site https://staging.mysite.com \
  --token "admin:token"
```

### 5. Secure Your Tokens

Never commit Application Passwords to version control. Use environment variables:

```bash
export WP_TOKEN="admin:application_password"

npx github:miketropi/wpb-upload-cli upload \
  --file ./backup.zip \
  --site https://mysite.com \
  --token "$WP_TOKEN"
```

## Use Cases

### 1. Large Site Migrations

Move large WordPress sites between servers without browser limitations:

```bash
# Create backup on source server
# Transfer backup.zip to new server
# Upload via CLI
npx github:miketropi/wpb-upload-cli upload \
  --file ./migration-backup.zip \
  --site https://newsite.com \
  --token "admin:token"
```

### 2. Automated Backup Workflows

Integrate into CI/CD pipelines or scheduled backup scripts:

```bash
# Daily backup script
0 2 * * * /path/to/backup-script.sh
```

### 3. Server-to-Server Transfers

Upload backups directly from one server to another:

```bash
# On backup server
scp backup.zip user@wordpress-server:/tmp/
ssh user@wordpress-server "npx github:miketropi/wpb-upload-cli upload --file /tmp/backup.zip --site https://mysite.com --token 'admin:token'"
```

### 4. Development Environment Setup

Quickly restore production backups to development environments:

```bash
npx github:miketropi/wpb-upload-cli upload \
  --file ./production-backup.zip \
  --site https://dev.mysite.com \
  --token "dev-admin:token"
```

## Performance Comparison

### Browser Upload vs CLI Upload

| Aspect | Browser Upload | WPB Upload CLI |
|--------|----------------|----------------|
| Max file size | 2-10MB (server limit) | Unlimited (chunked) |
| Timeout handling | ❌ Fails on timeout | ✅ Resumable chunks |
| Progress tracking | ⚠️ Limited | ✅ Real-time progress |
| Network efficiency | ⚠️ Single connection | ✅ Parallel uploads |
| Automation | ❌ Manual only | ✅ Scriptable |
| Error recovery | ❌ Must restart | ✅ Retry failed chunks |

## Technical Details

### Dependencies

WPB Upload CLI uses:

- **axios**: HTTP client for API requests
- **commander**: CLI framework for argument parsing
- **form-data**: Multipart form data handling
- **p-queue**: Promise queue for managing concurrent uploads
- **cli-progress**: Progress bar display

### Architecture

```
┌─────────────────┐
│  backup.zip     │
│  (Large File)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  File Reader    │
│  (Chunking)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Upload Queue   │
│  (Parallel)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  WordPress API  │
│  (REST)         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Auto Restore   │
│  (Trigger)      │
└─────────────────┘
```

## Security Considerations

1. **Application Passwords**: Use WordPress Application Passwords, not your main admin password
2. **HTTPS Only**: Always use HTTPS for site URLs
3. **Token Storage**: Never commit tokens to version control
4. **Permissions**: Only users with `manage_options` capability can use the REST API endpoints
5. **Network**: Use secure networks when uploading sensitive backups

## Troubleshooting

### Upload Stalls

If uploads stop progressing:

1. Check network connectivity
2. Verify WordPress site is accessible
3. Review server error logs
4. Try reducing concurrency: `--concurrency 1`

### Chunk Upload Failures

If specific chunks fail:

1. The tool will report which chunk failed
2. Retry the upload (failed chunks will be re-uploaded)
3. Check server logs for specific errors
4. Verify PHP memory limits are sufficient

### Restore Not Triggering

If upload completes but restore doesn't start:

1. Verify Worry Proof Backup plugin version 0.2.0 or higher is installed
2. Check WordPress REST API is enabled
3. Verify Worry Proof Backup plugin is active
4. Review plugin logs in WordPress admin
5. Manually trigger restore from WordPress admin

## Conclusion

WPB Upload CLI solves the problem of uploading large WordPress backup files by leveraging chunked uploads, parallel processing, and automatic restore. Whether you're migrating sites, setting up development environments, or automating backup workflows, this tool provides a reliable, scriptable solution.

**Key Benefits:**

- ✅ Handle files of any size
- ✅ Faster uploads with parallel processing
- ✅ Reliable with error handling
- ✅ Automated restore process
- ✅ Perfect for CI/CD and automation

Get started today by installing WPB Upload CLI and experience worry-free large file uploads.

---

*Ready to upload large backups? [Install WPB Upload CLI](https://github.com/miketropi/wpb-upload-cli) or [download Worry Proof Backup v0.2.0+](https://wordpress.org/plugins/worry-proof-backup/) for your WordPress site.*

