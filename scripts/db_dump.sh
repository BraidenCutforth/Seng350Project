docker exec db sh -c 'exec mongodump -d <database_name> --archive' > /some/path/on/your/host/all-collections.archive
