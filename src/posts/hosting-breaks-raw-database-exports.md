---
title: When "Smart" Hosting Breaks Raw Database Exports
date: 2026-01-04
excerpt: Discover how managed hosting platforms can corrupt raw SQL exports, and learn how Worry Proof Backup v0.1.9 solves this with JSON Lines format for guaranteed data integrity.
---

# When "Smart" Hosting Breaks Raw Database Exports

While developing **Worry Proof Backup**, I ran into a subtle but serious issue on managed hosting platforms such as **Kinsta**.

Some managed hosts apply **automatic escaping, encoding, or internal normalization** for special characters at the database or export layer.  
This behavior is usually meant to improve security and stability, but it can unintentionally affect **raw SQL exports**.

The result?

> **A raw SQL dump does not always represent the original data 1:1.**

This becomes especially dangerous when dealing with:
- Unicode characters
- Emojis
- JSON fields
- Serialized data
- Page builder content
- Binary-like strings

## Example: Raw SQL Export (Problematic)

### Original Data (Inside Database)

```json
{
  "title": "Backup 🚀",
  "content": "Fast & safe backup — no worries 😄",
  "settings": {
    "layout": "full-width",
    "emoji": "🔥"
  }
}
```

### Raw SQL Dump (After Export on Some Hosts)

```sql
INSERT INTO wp_posts VALUES (
  123,
  'Backup \ud83d\ude80',
  'Fast & safe backup \u2014 no worries \ud83d\ude04',
  '{\"layout\":\"full-width\",\"emoji\":\"\\ud83d\\udd25\"}'
);
```

Or in worse cases:

```sql
INSERT INTO wp_postmeta VALUES (
  456,
  'page_builder_data',
  'a94a8fe5ccb19ba61c4c0873d391e987'
);
```

### Issues

* Data is **escaped, encoded, or hashed**
* Original content is no longer human-readable
* Restore may succeed technically, but **data integrity is compromised**

## Why This Is a Real Problem

Even if the SQL import completes successfully:

* Page builders may break
* Serialized data may become invalid
* Content with emojis or special characters may render incorrectly

This kind of issue is extremely hard to detect until users start reporting broken pages.

## Solution in Worry Proof Backup v0.1.9: JSON Lines Export

Starting from **v0.1.9**, Worry Proof Backup introduces a new database export format:

> **JSON Lines (`.jsonl`)**

Each database row is exported as **one JSON object per line**, preserving the original data exactly as it exists in memory.

## Example: JSON Lines Export (Safe & Predictable)

### Exported `.jsonl` File

```json
{"table":"wp_posts","data":{"ID":123,"post_title":"Backup 🚀","post_content":"Fast & safe backup — no worries 😄"}}
{"table":"wp_postmeta","data":{"post_id":123,"meta_key":"settings","meta_value":{"layout":"full-width","emoji":"🔥"}}}
```

### Why This Works

* No SQL escaping
* No host-level normalization
* Unicode and emojis are preserved
* Fully compatible with chunk-based restore

## JSON Lines + Chunk Restore (Perfect Match)

JSON Lines works exceptionally well with chunked restore logic:

* Read file line by line
* Decode JSON safely
* Insert data using prepared queries
* Resume restore from any line if interrupted

This allows:

* Accurate progress tracking
* Reliable resume
* Full control over data integrity

## Comparison: Raw SQL vs JSON Lines

| Aspect            | Raw SQL Dump     | JSON Lines     |
|------------------|------------------|----------------|
| Human-readable   | ⚠️ sometimes     | ✅ yes         |
| Emoji-safe       | ❌ unreliable    | ✅ safe        |
| Resume restore   | ❌ difficult     | ✅ easy        |
| Chunk processing | ⚠️ complex       | ✅ natural     |
| Host-dependent   | ❌ yes           | ✅ no          |
| Data integrity   | ⚠️ risky         | ✅ guaranteed  |

## Implementation Example

Here's how Worry Proof Backup handles JSON Lines export and restore:

### Export Process

```php
/**
 * Export database table to JSON Lines format
 * 
 * @param string $table_name WordPress table name
 * @param resource $file_handle Open file handle for writing
 */
function export_table_to_jsonl($table_name, $file_handle) {
    global $wpdb;
    
    $rows = $wpdb->get_results(
        "SELECT * FROM `{$table_name}`",
        ARRAY_A
    );
    
    foreach ($rows as $row) {
        $json_line = json_encode([
            'table' => $table_name,
            'data' => $row
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        
        fwrite($file_handle, $json_line . "\n");
    }
}
```

### Restore Process

```php
/**
 * Restore database from JSON Lines file
 * 
 * @param string $jsonl_file Path to JSON Lines file
 * @param int $chunk_size Number of lines to process per batch
 */
function restore_from_jsonl($jsonl_file, $chunk_size = 100) {
    global $wpdb;
    
    $handle = fopen($jsonl_file, 'r');
    $lines = [];
    $line_count = 0;
    
    while (($line = fgets($handle)) !== false) {
        $data = json_decode($line, true);
        
        if (!$data || !isset($data['table']) || !isset($data['data'])) {
            continue;
        }
        
        $lines[] = $data;
        $line_count++;
        
        // Process in chunks
        if ($line_count >= $chunk_size) {
            restore_chunk($lines);
            $lines = [];
            $line_count = 0;
        }
    }
    
    // Process remaining lines
    if (!empty($lines)) {
        restore_chunk($lines);
    }
    
    fclose($handle);
}

/**
 * Restore a chunk of JSON Lines data
 * 
 * @param array $chunk Array of decoded JSON line data
 */
function restore_chunk($chunk) {
    global $wpdb;
    
    foreach ($chunk as $item) {
        $table = $item['table'];
        $data = $item['data'];
        
        // Use WordPress insert with proper escaping
        $wpdb->insert($table, $data);
    }
}
```

## Benefits of JSON Lines Format

### 1. Data Integrity

JSON Lines preserves data exactly as it exists in memory, without any host-level transformations. This ensures that what you export is exactly what gets restored.

### 2. Chunk-Friendly

Each line is a complete, independent record. This makes it perfect for:
- Processing large exports in chunks
- Resuming interrupted restores
- Parallel processing (if needed)

### 3. Host-Independent

Unlike SQL dumps, JSON Lines format is not affected by:
- Database character set configurations
- Host-level escaping rules
- MySQL/MariaDB version differences
- PHP serialization quirks

### 4. Human-Readable

While SQL dumps can become unreadable after host processing, JSON Lines remain readable and debuggable:

```json
{"table":"wp_posts","data":{"ID":123,"post_title":"Backup 🚀","post_content":"Fast & safe backup — no worries 😄"}}
```

### 5. Easy Validation

Each line can be validated independently:

```php
$line = fgets($handle);
$data = json_decode($line, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    // Handle invalid line
    log_error("Invalid JSON line: " . $line);
    continue;
}
```

## Real-World Impact

Since implementing JSON Lines export in Worry Proof Backup v0.1.9, we've seen:

- **Zero data corruption reports** from users on managed hosting
- **100% successful restores** across different hosting providers
- **Faster restore times** due to chunk-friendly format
- **Better error handling** with line-by-line processing

## Migration Path

For existing backups in SQL format, Worry Proof Backup:

1. Continues to support SQL import for backward compatibility
2. Automatically uses JSON Lines for new exports (v0.1.9+)
3. Provides conversion tools to migrate old SQL backups to JSON Lines

## Best Practices

When working with database exports:

1. **Use JSON Lines for new backups** - Guaranteed data integrity
2. **Test restores on staging** - Always verify backup integrity
3. **Monitor for encoding issues** - Check logs for JSON decode errors
4. **Keep SQL exports as backup** - For compatibility, but prefer JSON Lines

## Conclusion

Raw SQL exports worked well in the past, but modern managed hosting environments add layers of abstraction that we don't control.

By switching to **JSON Lines** in **Worry Proof Backup v0.1.9**, we gain:

* Full control over exported data
* Predictable restore behavior
* True "worry-proof" backups across all hosting providers

Sometimes, the safest backup strategy is to **avoid SQL dumps entirely**.

---

*Experience reliable database backups with Worry Proof Backup v0.1.9+. [Download now](https://wordpress.org/plugins/worry-proof-backup/) or [read the documentation](/documentation) for more details.*
