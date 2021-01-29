# Province Schema
### Import the schema below to generate the province table in your database. -Nabil

CREATE TABLE `provinces` (
 `registered_at` datetime NOT NULL DEFAULT current_timestamp(),
 `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
 `id` int(32) NOT NULL AUTO_INCREMENT,
 `name` varchar(64) NOT NULL,
 `recovered` bigint(20) NOT NULL DEFAULT 0,
 `death` bigint(20) NOT NULL DEFAULT 0,
 `positive` bigint(20) NOT NULL DEFAULT 0,
 `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
 PRIMARY KEY (`id`)
)
