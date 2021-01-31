# Province Schema
**__Import the schema below to generate the exact same province table as what used in this project.__**

```sql
CREATE TABLE `provinces` (
 `id` int(32) NOT NULL PRIMARY KEY AUTO_INCREMENT,

 `registered_at` datetime NOT NULL DEFAULT current_timestamp(),
 
 `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  
 `name` varchar(64) NOT NULL,
 
 `recovered` bigint(20) NOT NULL DEFAULT 0,
 
 `death` bigint(20) NOT NULL DEFAULT 0,
 
 `positive` bigint(20) NOT NULL DEFAULT 0,
 
 `deleted_at` datetime DEFAULT NULL
)
```
